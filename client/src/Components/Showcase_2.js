import React from "react";
import Container from "react-bootstrap/Container"
import {Row, Col} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'

const Showcase_2 = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
            <Container fluid>
                {isDesktopOrLaptop && <>
                <Row className="sticky-row mt-5">
                    <Col className="sticky-col" lg={6}>
                        <div className="sticky-box">
                            <h3>
                            Action Painting Style
                            </h3>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Eiusmod tempor incididunt ut labore et dolore magna.
                            </p>
                        </div>
                    </Col>
                    <Col className="module">
                        <div className="module-inside">
                            <div className="sticky-img">

                            </div>
                        </div>
                    </Col>
                </Row>
                </>}
                {isMobile && <>
                <Row className="d-flex justify-content-center flex-row text-center mt-5">
                    <h3>
                        Action Painting Style
                    </h3>
                    <p>
                        Eiusmod tempor incididunt ut labore et dolore magna.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
                    </p>
                </Row>
                <Row className="sticky-row">
                   
                    <Col className="module">
                    <div className="module-inside">
                    <div className="sticky-img">

                    </div>
                    </div>
                    </Col>
                </Row>
                </>}
            </Container>
    )
}

export default Showcase_2
