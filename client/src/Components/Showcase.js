import React from "react";
import { useState } from "react";
import Fade from 'react-reveal/Fade';
import Container from "react-bootstrap/Container"
import {Row, Col} from 'react-bootstrap';
import Image_1_1 from "../images/pollockbag1.1.png";
import Image_2 from "../images/pollockbag2.1.png";
import Image_3 from "../images/pollockbag3.1.png";
import Image_4 from "../images/pollockbag4.1.png";
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom";

const Showcase = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const [fading, setFading] = useState (false)
    const [mouseEffect, setMouseEffect] = useState (false)

    React.useEffect(() => {
        setFading(!fading)
       }, [0]);

    const classes = fading ? 'btn-rounded' : 'btn-rounded hide'   

    function handleIn() {
        setMouseEffect(!mouseEffect)
      }
    
      function handleOut() {
        setMouseEffect(!mouseEffect)
      }

    return (
            <Container fluid>
            {isDesktopOrLaptop && <>
             <Row className="images-row">
                <Col lg={4} className="item-desc mt-5 mb-2">
                    <Fade>
                        <Col> 
                            <Row>
                                <Col className="image-container">
                                <img src={Image_1_1}/>
                                </Col>
                                <Col className="image-container-1">
                                <img src={Image_2}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="image-container mt-3">
                                <img src={Image_3}/>
                                </Col>
                                <Col className="image-container-1 mt-3">
                                <img src={Image_4}/>
                                </Col>
                            </Row>
                        </Col>
                    </Fade>
                    </Col>
                        <Col lg={5} className="item-desc images-text">
                            <Row className="py-1">
                                <h3>
                                Original artworks
                                </h3>
                            </Row>
                            <Row className="py-1">
                                <p style={{maxWidth:"40rem"}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dolores illum cum odit debitis quae saepe, sequi similique quod repellendus expedita voluptatum harum, possimus quasi tenetur reiciendis quisquam iste nisi!        </p>
                            </Row>
                            <Link className="py-1" to="/shop">
                                <button style={{fading,}} type="button" className={mouseEffect ? "btn-rounded-in" : classes} onMouseOver={handleIn} onMouseOut={handleOut}>
                                        Shop Now
                                </button> 
                            </Link>
                        </Col>
                    </Row>
                    </>
                    }
                    <Container fluid>
                    {isMobile && <>
                    <Row className="images-row d-flex justify-content-center ">
                            <Fade>
                                <Col> 
                                    <Row className="mb-1 mt-4">
                                        <h3 className="text-center">
                                            Original artworks
                                        </h3>
                                    </Row>
                                    <Row>
                                        <Col className="image-container">
                                            <img src={Image_1_1}/>
                                        </Col>
                                        <Col className="image-container-1">
                                            <img src={Image_2}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="image-container mt-3">
                                            <img src={Image_3}/>
                                        </Col>
                                        <Col className="image-container-1 mt-3">
                                            <img src={Image_4}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Fade>
                        <Row className="mt-3 d-flex justify-content-center mb-3">
                            <p style={{maxWidth:"40rem"}} className="text-center">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dolores illum cum odit debitis quae saepe, sequi similique quod repellendus expedita voluptatum harum, possimus quasi tenetur reiciendis quisquam iste nisi!        </p>
                            <button style={{fading,width:"8rem"}} type="button" className={mouseEffect ? "btn-rounded-in" : classes} onMouseOver={handleIn} onMouseOut={handleOut}>
                                    Shop Now
                            </button> 
                        </Row>
                    </Row>
                    </>}
                </Container>
                </Container>
                
    )
}

export default Showcase
