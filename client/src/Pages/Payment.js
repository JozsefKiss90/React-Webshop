import React from "react";
import { useState } from "react";
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

const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const [email, setEmail] = useState('');
    const stripe = useStripe();

    const location = useLocation();

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

    return(
        <Container fluid>
        <CheckoutSteps step1 step2/>
        <Row>
        <Col lg={6} className="d-flex flex-column">
                <Row className="d-flex flex-column align-self-center mt-3">
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px", fontSize:"1.1rem"}}>
                       Contact information
                        </p>
                    </Row>
                    <Form style={{width:"auto"}} className="checkout-contact">
                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Control style={{color: "black"}}type="email" placeholder="Enter email"  onChange={e => setEmail(e.target.value)} value={email}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="firstname" placeholder="First Name"/>
                            <Form.Control type="lastname" placeholder="Last Name"/>
                        </Form.Group>
                    </Form>
                </Row>
                <Row className="d-flex flex-column align-self-center  mt-3">
                    <Row style={{position:"relative", height:"2rem"}}>
                      <p style={{position:"absolute", left:"-2px", fontSize:"1.1rem"}}>
                            Shipping Adress
                        </p>
                    </Row>
                    <Form  className="checkout-contact">
                        <Form.Select style={{color:"black"}} className="mt-3">
                            <option>Country</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Control type="city" placeholder="City" />
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="county" placeholder="State or county"/>
                            <Form.Control type="zip" placeholder="ZIP code"/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="adress" placeholder="Street adress"/>
                            <Form.Control type="housenumber" placeholder="Apartment or house number"/>
                        </Form.Group>
                    </Form>
                </Row>
                <Row className="d-flex flex-column align-self-center mt-3">
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px", fontSize:"1.1rem"}}>
                            Payment
                        </p>
                    </Row>
                    <Form style={{width:"auto"}} className="checkout-contact-card">
                        <Row className="checkout-card-row">
                            <Col className="checkout-cards">  
                                <div>
                                    <h8>
                                        Cards
                                    </h8>
                                </div> 
                                <div className="checkout-cards-pos">
                                    <img src={Visa}/>
                                    <img src={Amex}/>
                                    <img src={Master}/>
                                    <img src={Paypal}/>
                                </div> 
                            </Col> 
                        </Row>

                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Label>Name on card</Form.Label>
                            <Form.Control type="cardname" placeholder="John Doe" />
                        </Form.Group>

                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Label>Card number</Form.Label>
                            <Form.Control type="cardnumber" placeholder="1111 2222 3333" />
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Group>
                                <Form.Label>Expiry</Form.Label>
                                <Form.Control type="expiry" placeholder="MM/YY"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>CVV/CVC</Form.Label>
                                <Form.Control type="cvc" placeholder="123"/>
                            </Form.Group>
                        </Form.Group>

                    </Form>
                    <Row>
                       <Col style={{padding:"1rem 0.5rem"}} className="d-flex">
                       <div>
                            <button  onClick={handleGuestCheckout} type="button" className="btn-rounded-6">
                                Pay now
                            </button> 
                        </div>
                        <div>
                            <button type="button" className="btn-rounded-in-6">
                                Return to cart
                            </button> 
                        </div>
                       </Col>
                    </Row>
                </Row>
            </Col>
            <Col lg={5} style={{borderLeft:"1px solid grey", backgroundColor:"rgb(242, 242, 242)"}}>
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
    )
}

export default Checkout