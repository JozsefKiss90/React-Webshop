import {React, useEffect} from "react";
import NavComponent from "./Components/Navbar"
import IntroSection from "./Components/IntroSection"
import Examples from "./Components/Examples"
import About from "./Components/About"
import Showcase from "./Components/Showcase"
import Showcase_2 from "./Components/Showcase_2"
import Reviews from "./Components/Reviews"
import Footer from "./Components/Footer"
import ScrollToTop from "./Pages/pageComponents/ScrollToTop";

const App = () => {

ScrollToTop()

  return (
    <div style={{overflowY:'hidden', overflowX:'hidden'}}>
       <NavComponent/>
        <IntroSection/>
        <Showcase_2/>
        <Examples/>
        <About/>
        <Showcase/>
        <Reviews/>
        <Footer/>
        <ScrollToTop/>
  </div>
    )
  };
  
export default App;