package cmd

import (
	"fmt"
	"net"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"sync"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"

	"github.com/stripe/stripe-cli/pkg/playback"
	"github.com/stripe/stripe-cli/pkg/proxy"
	"github.com/stripe/stripe-cli/pkg/validators"
	"github.com/stripe/stripe-cli/pkg/version"
	"github.com/stripe/stripe-cli/pkg/websocket"
)

const defaultPort = 13111
const defaultWebhookPort = 13112
const endpointsDocString = `
--- Controlling the server ---
You can configure the running server instance via HTTP GET endpoints (prefixed with "/playback/").

--- List of server control endpoints ---
POST /playback/mode/[mode]
Sets the server mode to one of ["auto", "record", "replay"]

POST /playback/cassette/setroot?dir=[path_to_directory]
Set the root directory for reading/writing cassettes. All cassette paths are relative to this directory.

POST /playback/cassette/load?filepath=[filepath]
Load the cassette file at the given filepath, relative to the cassette root directory.

POST /playback/cassette/eject
Eject (unload) the current cassette and do any teardown. In record mode, this writes the recorded interactions to the cassette file.
`

type playbackCmd struct {
	cmd *cobra.Command

	mode string

	apiBaseURL  string
	filepath    string
	cassetteDir string
	address     string
	webhookURL  string
	noListen    bool
}

func newPlaybackCmd() *playbackCmd {
	pc := &playbackCmd{}

	pc.cmd = &cobra.Command{
		Hidden: true,
		Use:    "playback",
		Args:   validators.NoArgs,
		Short:  "Start a `playback` server",
		Long: `
--- Overview ---
The playback command starts a local proxy server that intercepts outgoing requests to the Stripe API.

It can also intercept incoming webhooks on /playback/webhooks.

There are three modes of operation:

"record": Any requests received are forwarded to the api.stripe.com, and the response is returned. All interactions
are written to the loaded 'cassette' file for later playback in replay mode.

"replay": All received requests are terminated at the playback server, and responses are played back[1] from a cassette file. A existing cassette most be loaded.

"auto" (default): The server determines whether to run in "record" or "replay" mode on a per-cassette basis. If the cassette exists, operates in "replay" mode. If not, operates in "record" mode.

Currently, stripe playback only supports serving over HTTP.

[1]: requests are currently replayed sequentially in the same order they were recorded.
` + endpointsDocString,
		Example: `stripe playback
  stripe playback --mode replay
  stripe playback --cassette "my_cassette.yaml"`,
		RunE: pc.runPlaybackCmd,
	}

	pc.cmd.Flags().StringVar(&pc.mode, "mode", "auto", "Auto: record if cassette doesn't exist, replay if exists. Record: always record/re-record. Replay: always replay.")
	pc.cmd.Flags().StringVar(&pc.address, "address", fmt.Sprintf("localhost:%d", defaultPort), "Address to serve on")
	pc.cmd.Flags().StringVar(&pc.webhookURL, "forward-to", fmt.Sprintf("http://localhost:%d", defaultWebhookPort), "URL to forward webhooks to")
	pc.cmd.Flags().StringVar(&pc.filepath, "cassette", "default_cassette.yaml", "The cassette file to use")
	pc.cmd.Flags().StringVar(&pc.cassetteDir, "cassette-root-dir", "./", "Directory to store all cassettes in. Relative cassette paths are considered relative to this directory.")
	pc.cmd.Flags().BoolVar(&pc.noListen, "no-listen", false, "Do not automatically proxy and record webhook events to the cassette.")

	// // Hidden configuration flags, useful for dev/debugging
	pc.cmd.Flags().StringVar(&pc.apiBaseURL, "api-base", "https://api.stripe.com", "The API base URL")
	pc.cmd.Flags().MarkHidden("api-base") // #nosec G104

	return pc
}

// Local version of net/http's ListenAndServe(), modified to allow us to signal
// a waitgroup. Doesn't handle the case where this is called when the server
// is shutting down, due to those helper fxns not being exported.
func notifyServer(srv *http.Server, wg *sync.WaitGroup) error {
	addr := srv.Addr
	if addr == "" {
		addr = ":http"
	}
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		return err
	}
	wg.Done()
	return srv.Serve(ln)
}

func (pc *playbackCmd) runPlaybackCmd(cmd *cobra.Command, args []string) error {
	fmt.Println()
	fmt.Println("Setting up playback server...")
	fmt.Println()

	// --- Validate command-line args
	// Check that mode is valid
	if pc.mode != playback.Auto && pc.mode != playback.Record && pc.mode != playback.Replay {
		return fmt.Errorf(
			"\"%v\" is not a valid mode. It must be either \"%v\", \"%v\", or \"%v\"",
			pc.mode, playback.Auto, playback.Record, playback.Replay)
	}

	// Check that cassette root directory is valid
	absoluteCassetteDir, err := filepath.Abs(pc.cassetteDir)
	if err != nil {
		return fmt.Errorf("Error with --cassette-root-dir: %w", err)
	}

	cassetteDirInfo, err := os.Stat(absoluteCassetteDir)
	if err != nil {
		if os.IsNotExist(err) {
			return fmt.Errorf("the directory \"%v\" does not exist. Please create it, then re-run the command", absoluteCassetteDir)
		}
		return fmt.Errorf("Unexpected error when checking --cassette-root-dir: %w", err)
	}

	if !cassetteDirInfo.Mode().IsDir() {
		return fmt.Errorf("The provided `--cassette-root-dir` option is not a valid directory: %v", absoluteCassetteDir)
	}

	// Check webhook URL specifies a protocol
	parsedWhURL, err := url.Parse(pc.webhookURL)
	if err != nil {
		return fmt.Errorf("unable to parse \"%v\" as a URL. it should be a valid URL of the form [scheme]://[host]:[port]", pc.webhookURL)
	}

	if parsedWhURL.Scheme != "http" && parsedWhURL.Scheme != "https" {
		return fmt.Errorf("unsupported protocol scheme \"%v\". must be \"http\" or \"https\"", parsedWhURL.Scheme)
	}

	// --- Start up the playback HTTP server
	addressString := pc.address
	remoteURL := pc.apiBaseURL
	wg := &sync.WaitGroup{}

	httpWrapper, err := playback.NewServer(remoteURL, pc.webhookURL, absoluteCassetteDir, pc.mode, pc.filepath)
	if err != nil {
		return err
	}

	// --- Setup `stripe listen` and run it now if not in replay-only mode, else listen for httpWrapper.ChangeModeChan.
	if !pc.noListen {
		wg.Add(1)
		startListenLoop(cmd, pc.mode, addressString, httpWrapper, wg)
	}

	server := httpWrapper.InitializeServer(addressString)
	wg.Add(1)

	go func() {
		err = notifyServer(server, wg)
		fmt.Fprint(os.Stderr, err.Error())
		os.Exit(1)
	}()

	// --- Print out post-startup summary on CLI
	fmt.Println()
	fmt.Println("------ Server Running ------")

	switch pc.mode {
	case playback.Record:
		fmt.Printf("In \"record\" mode.\n")
		fmt.Println("Will always record interactions, and write (or overwrite) to the given cassette filepath.")
		fmt.Println()
	case playback.Replay:
		fmt.Printf("In \"replay\" mode.\n")
		fmt.Println("Will always replay from the given cassette. Will error if loaded cassette path doesn't exist.")
		fmt.Println()
	case playback.Auto:
		fmt.Printf("In \"auto\" mode.\n")
		fmt.Println("Can both record or replay, depending on the file passed in. If exists, replays. If not, records.")
		fmt.Println()
	}

	fmt.Printf("Cassettes directory: \"%v\".\n", absoluteCassetteDir)
	fmt.Printf("Using cassette: \"%v\".\n", pc.filepath)
	fmt.Println()

	fmt.Printf("Listening via HTTP on %v\n", addressString)
	fmt.Println()

	fmt.Printf("Accepting webhooks on %v/%v\n", addressString, "playback/webhooks")
	fmt.Printf("Forwarding webhooks to %v\n", pc.webhookURL)

	fmt.Println("-----------------------------")
	fmt.Println()

	wg.Wait()
	fmt.Println("Playback setup completed!")
	select {}
}

func waitUntilConnected(p *proxy.Proxy, wg *sync.WaitGroup) {
	<-p.IsConnected()
	wg.Done()
}

func runListen(cmd *cobra.Command, address string, wg *sync.WaitGroup) error {
	version.CheckLatestVersion()

	deviceName, err := Config.Profile.GetDeviceName()
	if err != nil {
		return err
	}
	deviceName += "-playback"

	key, err := Config.Profile.GetAPIKey(false)
	if err != nil {
		return err
	}

	ctx := withSIGTERMCancel(cmd.Context(), func() {
		log.WithFields(log.Fields{
			"prefix": "playback.proxy.Run",
		}).Debug("Ctrl+C received, cleaning up...")
	})

	logger := log.StandardLogger()
	proxyVisitor := createVisitor(logger, "", false)
	proxyOutCh := make(chan websocket.IElement)

	p, err := proxy.Init(ctx, &proxy.Config{
		DeviceName:            deviceName,
		Key:                   key,
		ForwardURL:            address + "/playback/webhooks",
		ForwardHeaders:        []string{},
		ForwardConnectURL:     "",
		ForwardConnectHeaders: []string{},
		UseConfiguredWebhooks: false,
		APIBaseURL:            "",
		WebSocketFeature:      webhooksWebSocketFeature,
		PrintJSON:             false,
		UseLatestAPIVersion:   false,
		SkipVerify:            false,
		Log:                   logger,
		NoWSS:                 false,
		Events:                []string{"*"},
		OutCh:                 proxyOutCh,
	})
	if err != nil {
		return err
	}

	go p.Run(ctx)
	go waitUntilConnected(p, wg)

	for el := range proxyOutCh {
		err := el.Accept(proxyVisitor)
		if err != nil {
			return err
		}
	}

	return nil
}

func startListenLoop(cmd *cobra.Command, mode string, address string, httpWrapper *playback.Server, wg *sync.WaitGroup) {
	startListen := func() {
		fmt.Println("Starting `stripe listen` to proxy webhooks to playback server...")
		runListen(cmd, address, wg)
		os.Exit(1)
	}

	if mode != playback.Replay {
		go startListen()
	} else {
		var listenToModeSwitch func()
		listenToModeSwitch = func() {
			httpWrapper.OnSwitchMode(func(mode string) {
				switch strings.ToLower(mode) {
				case playback.Record, playback.Auto:
					go startListen()
				default:
					listenToModeSwitch()
				}
			})
		}
		listenToModeSwitch()
	}
}
