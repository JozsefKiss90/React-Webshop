import React from "react";
import Container from "react-bootstrap/Container"
import {Row, Col} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'

const About = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return(
    <Container fluid className="about">
        {isDesktopOrLaptop && <>
            <Row>
            <Col className="about-section">
                
            </Col>
            <Col className="about-section">
                <h2>
                    About Us
                </h2>
            </Col>
            <Col className="about-section">
                
            </Col>
            </Row>
            <Row >
            <Col lg={3} className="about-section">
                
            </Col>
            <Col lg={6} className="about-section">
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
            </Col>
            <Col lg={3} className="about-section">
                
            </Col>
            </Row>
            <Row >
            <Col lg={3} className="about-section">
                
            </Col>
            <Col lg={6} className="about-section-2">
                    <h5 className="story">
                        THE WHOLE STORY
                    </h5>
                    <div style={{border:"0.5px solid lightgrey", maxHeight:"0.5px", width:"151px", position:"relative", bottom:"8px",zIndex:"0"}}>
                    
                    </div>
            </Col>
            <Col lg={3} className="about-section">
                
            </Col>
        </Row>
        </>
        }
        {isMobile && <>
            <Row  >
                <Col style={{height:'2.5rem'}}  className="about-section text-center py-1 mt-3">
                    <h2>
                        About Us
                    </h2>
                </Col>
            </Row>
            <Row >
                <Col lg={6} className="about-section">
                    <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    </p>
                </Col>
            </Row>
            <Row >
                <Col lg={6} className="about-section-2 mt-2">
                        <h5 className="story">
                            THE WHOLE STORY
                        </h5>
                        <div style={{border:"0.5px solid lightgrey", maxHeight:"0.5px", width:"151px", position:"relative", bottom:"8px",zIndex:"0"}}>
                        
                        </div>
                </Col>
            </Row>
        </>
        }
    </Container>
    )
}

export default About