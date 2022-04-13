import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container"
import {Row, Col, Form, Button, FormGroup} from 'react-bootstrap';
import Image_1 from "../images/pollockbag1.1.png";
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps'
import CheckoutNav from '../Components/CheckoutNav'
import { useMediaQuery } from 'react-responsive'

const Checkout = () => {

const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

const cart = useSelector(state => state.cart)
const {cartItems} = cart

const location = useLocation();

const shippingData = location.state

if(shippingData) {
    localStorage.setItem("email", shippingData[0])
    localStorage.setItem("country", shippingData[1])
    localStorage.setItem("city", shippingData[2])
    localStorage.setItem("zip", shippingData[3])
    localStorage.setItem("address", shippingData[4])
    localStorage.setItem("housenumber", shippingData[5])
    localStorage.setItem("firstname", shippingData[6])
    localStorage.setItem("lastname", shippingData[7])
}

let email
let country
let city
let zip
let address
let housenumber

if(localStorage.getItem("email")) {
    email = localStorage.getItem("email")
    country = localStorage.getItem("country")
    city = localStorage.getItem("city")
    zip = localStorage.getItem("zip")
    address = localStorage.getItem("address")
    housenumber = localStorage.getItem("housenumber")
}

let navigate = useNavigate();

const handleCheckout=()=>{
    navigate({
        pathname: '/checkout',
        search: '',
        },
        {state:[email, country, city, address, zip, housenumber]}
        );
} 

const mapped = cartItems.map(items => items)

var subtotal = 0

for(let i = 0; i < mapped.length; i++) {
    subtotal+= mapped[i].price * mapped[i].qty
}
const [boxHeight, setBoxHeight] = useState(false)
    function arrowToggle() { 
        setBoxHeight(!boxHeight)
    }
    const expand = boxHeight ? 'summary-row-2 expand' : 'summary-row-2'

return(
    <div>
    <CheckoutNav/>
    <Container fluid>
    {isDesktopOrLaptop && <>
        <Row>
            <Col lg={1}>
            </Col>
            <Col  className="d-flex flex-column">
                <Row className="d-flex flex-column align-self-center mt-1 same-row">
                <Row className="d-flex flex-column"> 
                    <CheckoutSteps style={{position:"absolute", left:"-2px", top:"30px"}} step1 step2 step3/>
                </Row>
                <Row style={{position:"relative", height:"2rem"}}>
                    <p style={{position:"absolute", left:"-2px"}}>
                        Contact information
                    </p>
                </Row>
                <Form.Group className="checkout-contact ">
                        <Row  className="shipping-details d-flex">
                            <Col lg={2} className="d-flex align-items-center justify-content-start">
                                <input className="custom-form" defaultValue="Contact"/>
                            </Col>
                            <Col lg={8} className="d-flex align-items-center justify-content-start">
                                <input className="custom-form" defaultValue={email}/>
                            </Col>
                            <Col lg={2} className="d-flex align-items-end">
                                <div style={{fontSize:"0.8rem"}}>
                                    Change
                                </div>
                            </Col>
                            </Row>
                            <svg height="1" width="460" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                                <path d="M 2 0 l 455 0" stroke="#adb5bd" strokeWidth="2"fill="none" />
                            </svg> 
                            <Row className="shipping-details d-flex">
                            <Col lg={2} className="d-flex align-items-center">
                                <input className="custom-form" defaultValue="Ship to"/>
                            </Col>
                            <Col lg={8} className="d-flex align-items-center justify-content-start">
                                <input style={{width:"100%"}} className="custom-form" defaultValue={
                                `${ zip}, ${ city}, ${ address} ${housenumber}., ${ country}`
                                }/>
                            </Col>
                            <Col lg={2} className="d-flex align-items-center">
                                <div style={{fontSize:"0.8rem"}}>
                                    Change
                                </div>
                            </Col>
                        </Row>
                            <svg height="1" width="460" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                                <path d="M 2 0 l 455 0" stroke="#adb5bd" strokeWidth="2"fill="none" />
                            </svg> 
                    </Form.Group>
            </Row>
            <Row className="d-flex flex-column align-self-center mt-3 same-row">
                <Row style={{position:"relative", height:"2rem"}}>
                    <p style={{position:"absolute", left:"-2px", fontSize:"1.1rem"}}>
                        Shipping
                    </p>
                </Row>
                <Form.Group className="checkout-contact">
                    <Row className="shipping-details d-flex">
                    <Col lg={1} className="d-flex align-items-center justify-content-start">
                        <Form.Check type={"radio"} defaultChecked={true}/>
                    </Col>
                    <Col lg={9} className="d-flex align-items-center justify-content-start">
                        <input className="custom-form" defaultValue="Express"/>
                    </Col>
                    <Col lg={2} className="d-flex align-items-end">
                        <div style={{fontSize:"0.9rem", fontWeight:"600"}}>
                            $5.99
                        </div>
                    </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
                    <div>
                        <button type="button" className="btn-rounded-7" onClick={handleCheckout}>
                            Continue to payment
                        </button> 
                    </div>
                    <div>
                        <button type="button" className="btn-rounded-in-7">
                            Return to information
                        </button> 
                    </div>
                    </Col>
                </Row>
            </Row>
            
        </Col>
            <Col className="checkout-products ">
                <Row style={{width:"40rem"}} className="d-flex flex-column  px-4">
                    <div style={{marginTop:"1.5rem"}}>

                    </div>
                {cartItems.map((items, index) => (
                    <Row key={index} className="item-border-4">
                        <Col lg={6} className="checkout-summary">
                            <div style={{marginTop:"1rem"}} className="checkout-img">
                                <img src={items.image} />
                                <div className="checkout-qnty">
                                    <p >
                                    {items.qty}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 px-3">
                                <p>
                                    <strong>{items.category}</strong> <br/> {items.name}
                                </p>
                            </div>
                        </Col>
                        <Col lg={6} className="d-flex justify-content-end align-items-center">
                            <div className="mt-3">
                                <p>
                                    <strong>{items.qty*items.price}</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>)
                    )}    
                    <Row className="item-border-5">
                        <Col lg={6} className="d-flex flex-column justify-content-center align-items-start">
                            <div  className="checkout-div mt-2">
                                <p>
                                    Subtotal
                                </p>
                            </div>
                            <div className="checkout-div mb-2">
                                <p>
                                    Shipping
                                </p>
                            </div>
                        </Col>
                        <Col lg={6} className="d-flex flex-column justify-content-center align-items-end">
                            <div className="checkout-div  mt-2">
                                <p>
                                    <strong>{subtotal}</strong>
                                </p>
                            </div>
                             <div className="checkout-div mb-2">
                                <p>
                                    <strong>2.500</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="d-flex flex-column justify-content-center align-items-start">
                            <div className="checkout-div mt-2">
                                <p>
                                    Total
                                </p>
                            </div>
                        </Col>
                        <Col lg={6} className="d-flex flex-column justify-content-center align-items-end">
                            <div className="checkout-div mt-2">
                                <p style={{fontSize:"1.2rem"}}>
                                    <strong>{subtotal + 2500}</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Col> 
        </Row>
        </>}
        {isMobile && <>
        <Row  className={`${expand}`}>
            <Col className="d-flex ">
                <div style={{lineHeight:'2rem', paddingRight: '10px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>    
                </div>
                <p style={{lineHeight:'2.5rem', whiteSpace: 'nowrap'} }>
                    <strong>Order summary</strong> 
                </p>
                <div style={{lineHeight:'2.5rem', paddingLeft: '10px'}} onClick={arrowToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                </div>
                <div style={{marginLeft:'auto', marginRight:'0'}}>
                <p style={{lineHeight:'2.5rem', paddingRight:'20px', fontSize:'1.3rem',}}>
                <strong>{subtotal + 2500}</strong>
                </p>
                </div>
            </Col>
            {cartItems.map((items, index) => (
                <Row key={index} className="item-border-4">
                    <Col lg={12} className="checkout-summary">
                        <div style={{marginTop:"1rem"}} className="checkout-img">
                            <img src={items.image} />
                            <div className="checkout-qnty">
                                <p >
                                {items.qty}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 px-3">
                            <p>
                                <strong>{items.category}</strong> <br/> {items.name}
                            </p>
                        </div>
                        <div style={{marginLeft:'auto', marginRight:'0'}} className="mt-3">
                            <p>
                                <strong>{items.qty*items.price}</strong>
                            </p>
                        </div>
                    </Col>
                    
                </Row>)
                )}    
                <Row className="d-flex flex-column justify-content-center align-items-end">
                    <div className="checkout-div  mt-2">
                        <p>
                            Subtotal: &nbsp;
                            <strong>{subtotal}</strong>
                        </p>
                    </div>
                        <div className="checkout-div">
                        <p>
                            Shipping:  &nbsp;
                            <strong>2.500</strong>
                        </p>
                    </div>
                    <div className="checkout-div mb-2">
                        <p>
                            Total: &nbsp;
                            <strong>{subtotal+2500}</strong>
                        </p>
                    </div>
                </Row>
            </Row>
        <Row className="px-3">
            <Row className="d-flex flex-column align-items-center"> 
                <CheckoutSteps  step1 step2 step3/>
            </Row>
            <Row style={{position:"relative", height:"2rem"}}>
                <p style={{position:"absolute", left:"-2px",}}>
                    Contact information
                </p> 
            </Row>
            <Form.Group  className="checkout-contact">
                <Row className="d-flex flex-row ">
                    <div style={{borderBottom:'1px solid #c3c3c3'}} className=" d-flex flex-row align-items-center shipping-mobile">
                        <p>
                        Contact
                        </p>
                        <p className="px-2">
                        {email}
                        </p>
                        <p style={{marginLeft:'auto', marginRight:'0'}} className="px-2">
                        Change
                        </p>
                    </div>
                </Row>
                <Row className="shipping-details d-flex">
                    <div className=" d-flex flex-row align-items-center shipping-mobile">
                        <p style={{whiteSpace: 'nowrap'}} className="">
                            Ship to 
                        </p>
                        <p className="">
                        {`${ zip}, ${ city}, ${ address} ${housenumber}., ${ country}`}
                        </p>
                        <p style={{marginLeft:'auto', marginRight:'0'}} className="px-2">
                        Change
                        </p>
                    </div>
                </Row>
            </Form.Group>
        </Row>
        <Row className="px-3">
            <Row className="py-2">
                Shipping
            </Row>
            <Form.Group  className="checkout-contact">
                <Row className="d-flex flex-row ">
                    <div className=" d-flex flex-row align-items-center shipping-mobile">
                        <Form.Check type={"radio"} defaultChecked={true}/>
                        <p className="px-2">
                        Express
                        </p>
                        <p style={{marginLeft:'auto', marginRight:'0'}} className="px-2">
                        $5.99
                        </p>
                    </div>
                </Row>
            </Form.Group>
            <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
                <div className="d-flex flex-row">
                    <button style={{border:'1px solid white'}} type="button" className="btn-rounded-7" onClick={handleCheckout}>
                        Continue to payment
                    </button> 
                    <button style={{position:'relative', right:'18px'}} type="button" className="btn-rounded-in-7">
                        Return to information
                    </button> 
                </div>
                
            </Col>
        </Row>
        
        </>}
    </Container>
    </div>
    )
}

export default Checkout