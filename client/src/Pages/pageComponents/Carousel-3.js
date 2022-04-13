import "./Carousel-3.css";
import {React, useState } from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {Row, Col} from 'react-bootstrap';

function Carousel_3() {

  const settings = {
    infinite: true,
    lazyLoad: true,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
  }; 

  return (
    <div> 
     <Slider {...settings}>
        <div>
            <Row className="customer">
                <Col>
                </Col>
                <Col className="customer-row mt-1">
                    <h3 style={{lineHeight:'2.5rem', whiteSpace: 'nowrap'}}>
                    Satisfied Customers
                    </h3>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row className="customer-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-quote" viewBox="0 0 16 16">
                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                </svg>
                <Row className="mt-1">
                    <p className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                    </p>
                </Row>
                <Row>
                    <p className="text-center">
                    -Gizi
                    </p>
                </Row>
            </Row>
        </div>
        <div>
            <Row className="customer">
                <Col>
                </Col>
                <Col className="customer-row mt-1">
                    <h3 style={{lineHeight:'2.5rem', whiteSpace: 'nowrap'}}>
                    Satisfied Customers
                    </h3>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row className="customer-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-quote" viewBox="0 0 16 16">
                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                </svg>
                <Row>
                <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
                </Row>
                <Row>
                    <p className="text-center">
                    -Sanya
                    </p>
                </Row>
            </Row>
        </div>
        <div>
            <Row className="customer">
                <Col>
                </Col>
                <Col className="customer-row mt-1">
                    <h3 style={{lineHeight:'2.5rem', whiteSpace: 'nowrap'}}>
                    Satisfied Customers
                    </h3>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row className="customer-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-quote" viewBox="0 0 16 16">
                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                </svg>
                <Row>
                <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
                </Row>
                <Row>
                    <p className="text-center">
                    -Feri
                    </p>
                </Row>
            </Row>
        </div>
        </Slider>
    </div>
  );
}

export default Carousel_3;