import React from "react";
import { useState, useRef,useEffect } from "react";
import Container from "react-bootstrap/Container"
import {Row, Col, Form, Button, FormGroup} from 'react-bootstrap';
import Visa from "../images/visa-logo.png";
import Amex from "../images/amex.png";
import Master from "../images/mastercard.png";
import Paypal from "../images/paypal.png";
import Image_1 from "../images/pollockbag1.1.png";
import {useDispatch, useSelector} from 'react-redux'
import { useStripe } from '@stripe/react-stripe-js';
import { fetchFromAPI } from '../helpers';
import CheckoutSteps from '../Components/CheckoutSteps'
import {useLocation} from 'react-router-dom';
import CheckoutNav from '../Components/CheckoutNav'

const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const [billingEmail, setBillingEmail] = useState('');
    const stripe = useStripe();

    const location = useLocation();

    const shippingData = location.state

    const handleGuestCheckout = async (e) => {
        e.preventDefault();
        const line_items = cartItems.map(item => {
          return {
            quantity: item.qty,
            price_data: {
              currency: 'usd',
              unit_amount: item.price * 100, // amount is in cents
              product_data: {
                name: item.name,
                description: "description",
                images: [item.image], 
              }
            }
          }
        });
        
        const response = await fetchFromAPI('create-checkout-session', {
          body: { line_items, customer_email: email },
        });
    
        const { sessionId } = response;
        const { error } = await stripe.redirectToCheckout({
          sessionId
        });
        
        if (error) {
          console.log(error);
        }
      }

    const [selected, setSelected] = useState(true)

    const HandleOptionChange = changeEvent => {
        setSelected(!selected);
      };

    let email  
    let country
    let city
    let zip
    let address
    let housenumber

    if(shippingData) {
        email = localStorage.getItem("email")
        country = localStorage.getItem("country")
        city = localStorage.getItem("city")
        zip = localStorage.getItem("zip")
        address = localStorage.getItem("address")
        housenumber = localStorage.getItem("housenumber")
    }

    return(
        <div>
        <CheckoutNav/>
        <Container fluid>
        <Row>
            <Col lg={6} className="d-flex flex-column">
                <Row className="d-flex flex-column align-self-center mt-1 same-row">
                    <Row className="d-flex flex-column"> 
                        <CheckoutSteps style={{position:"absolute", left:"-2px", top:"30px"}} step1 step2 step3 step4/>
                    </Row>
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px",}}>
                            Contact information
                        </p>
                    </Row>
                    <Form.Group style={{width:"500px"}}  className="checkout-contact ">
                            <Row  className="shipping-details d-flex">
                            <Col lg={2} className="d-flex align-items-center justify-content-start">
                                <input className="custom-form" value="Contact"/>
                            </Col>
                            <Col lg={8} className="d-flex align-items-center justify-content-start">
                                <input className="custom-form" value={shippingData[0]}/>
                            </Col>
                            <Col lg={2} className="d-flex align-items-end">
                                <div style={{fontSize:"0.8rem"}}>
                                    Change
                                </div>
                            </Col>
                            </Row>
                            <svg height="1" width="450" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                                <path d="M 0 1 l 445 0" stroke="#adb5bd" stroke-width="2"fill="none" />
                            </svg> 
                            <Row className="shipping-details d-flex">
                            <Col lg={2} className="d-flex align-items-center">
                                <input className="custom-form" value="Ship to"/>
                            </Col>
                            <Col lg={8} className="d-flex align-items-center justify-content-start">
                                <input style={{width:"100%"}} className="custom-form" value={
                                `${ zip}, ${ city}, ${ address} ${housenumber}., ${ country}`
                                }/>
                            </Col>
                            <Col lg={2} className="d-flex align-items-center">
                                <div style={{fontSize:"0.8rem"}}>
                                    Change
                                </div>
                            </Col>
                            </Row>
                            <svg height="1" width="450" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                                <path d="M 0 1 l 445 0" stroke="#adb5bd" stroke-width="2"fill="none" />
                            </svg> 
                            <Row className="shipping-details d-flex">
                            <Col lg={2} className="d-flex align-items-center justify-content-start">
                                <input className="custom-form" value="Method"/>
                            </Col>
                            <Col lg={8} className="d-flex align-items-center justify-content-start">
                                <input className="custom-form" value="Express"/>
                            </Col>
                            <Col lg={2} className="d-flex align-items-end">
                                <div style={{fontSize:"0.9rem", fontWeight:"600"}}>
                                    $5.99
                                </div>
                            </Col>
                            </Row>
                        </Form.Group>
                </Row>
                <Row className="d-flex flex-column align-self-center mt-3 same-row">
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px", fontSize:"1rem"}}>
                            Payment
                        </p>
                    </Row>
                    <Form className="checkout-contact-card">
                        
                        <Row className="checkout-card-row">
                            <Col className="checkout-cards">  
                                <div>
                                    <h7>
                                       <strong> Cards</strong>
                                    </h7>
                                </div> 
                                <div className="checkout-cards-pos">
                                    <img src={Visa}/>
                                    <img src={Amex}/>
                                    <img src={Master}/>
                                    <img src={Paypal}/>
                                </div> 
                            </Col> 
                        </Row>

                        <Form.Group className="pt-2 pb-1 card-details" controlId="formBasicEmail">
                            <Form.Label>Name on card</Form.Label>
                            <Form.Control type="cardname" placeholder="John Doe" />
                        </Form.Group>

                        <Form.Group className="pt-2 pb-1" controlId="formBasicEmail">
                            <Form.Label>Card number</Form.Label>
                            <Form.Control type="cardnumber" placeholder="1111 2222 3333" />
                        </Form.Group>

                        <Form.Group className=" d-flex pt-1 pb-3 gap-2" controlId="formBasicPassword">
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label>Expiry</Form.Label>
                                <Form.Control type="expiry" placeholder="MM/YY"/>
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group>
                                <Form.Label>CVV/CVC</Form.Label>
                                <Form.Control type="cvc" placeholder="123"/>
                            </Form.Group>
                            </Col>   
                        </Form.Group>
                    </Form>
                </Row>
                <Row className="d-flex flex-column align-self-center mt-3 same-row">
                        <Row style={{position:"relative", height:"2rem"}}>
                            <p style={{position:"absolute", left:"-2px",}}>
                                Billing
                            </p>
                        </Row>
                        <Form.Group className="checkout-contact ">
                            <Row className="shipping-details d-flex billing-row">
                                <Col lg={1} className="d-flex align-items-center justify-content-start">
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option1"
                                    checked={selected}
                                    onChange={HandleOptionChange}
                                />
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                               <strong style={{fontSize:"0.9rem"}}>  Same as shipping address</strong>
                                </Col>
                                <Col lg={2} className="d-flex align-items-end">
                                   
                                </Col>
                            </Row>
                            <Row  className="shipping-details d-flex">
                                <Col lg={1} className="d-flex align-items-center justify-content-start">
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option2"
                                    checked={!selected}
                                    onChange={HandleOptionChange}
                                />
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                                <strong style={{fontSize:"0.9rem"}}>Use a different billing address</strong>
                                </Col>
                                <Col lg={2} className="d-flex align-items-end">
                                
                                </Col>
                            </Row>
                            <Row>
                            <Form style={{display: selected ? 'none' : 'block'}} className="checkout-contact checkout-billing">
                                <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                                    <Form.Control type="firstname" placeholder="First Name"/>
                                    <Form.Control type="lastname" placeholder="Last Name"/>
                                </Form.Group>
                                <Form.Select style={{color:"black", fontSize:"0.9rem"}} className="mt-3">
                                    <option>Country</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                                    <Form.Control type="city" placeholder="City"/>
                                </Form.Group>

                                <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                                    <Form.Control type="county" placeholder="State or county"/>
                                    <Form.Control type="zip" placeholder="ZIP code"/>
                                </Form.Group>

                                <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                                    <Form.Control type="adress" placeholder="Street adress"/>
                                    <Form.Control type="housenumber" placeholder="Apartment or house number"/>
                                </Form.Group>
                                <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicEmail">
                                    <Form.Control style={{color: "black"}}type="phone" placeholder="Phone number"  onChange={e => setBillingEmail(e.target.value)} value={email}/>
                                </Form.Group>
                            </Form>
                            </Row>
                        </Form.Group>
                        <Row>
                            <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
                            <div>
                                <button  onClick={handleGuestCheckout} type="button" className="btn-rounded-6">
                                    Pay now
                                </button> 
                            </div>
                            <div>
                                <button type="button" className="btn-rounded-in-8">
                                    Return to shipping
                                </button> 
                            </div>
                            </Col>
                        </Row>
                    </Row>
            </Col>
            <Col lg={5} className="checkout-products">
                <Row className="d-flex flex-column align-self-start px-4">
                    <Row style={{marginTop:"2.5rem"}} className="item-border-4">
                        <Col lg={6} className="checkout-summary">
                            <div className="checkout-img">
                                <img src={Image_1} />
                                <div className="checkout-qnty">
                                    <p>
                                        1
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 px-3">
                                <p>
                                    <strong>Shopping Bag</strong> <br/> Mural
                                </p>
                            </div>
                        </Col>
                        <Col lg={6} className="d-flex justify-content-end align-items-center">
                            <div className="mt-3">
                                <p>
                                    <strong>8.500 Ft</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>
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
                                    <strong>8.500 Ft</strong>
                                </p>
                            </div>
                             <div className="checkout-div mb-2">
                                <p>
                                    <strong>2.500 Ft</strong>
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
                                <p>
                                    <strong>10.000 Ft</strong>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Col>
            <Col lg={1} style={{backgroundColor:"rgb(242, 242, 242)"}}>
            </Col>
        </Row>
        </Container>
        </div>
    )
}

export default Checkout