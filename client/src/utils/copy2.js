import React, { useEffect } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container"
import {Row, Col, Form, Button, FormGroup} from 'react-bootstrap';
import Visa from "../images/visa-logo.png";
import Amex from "../images/amex.png";
import Master from "../images/mastercard.png";
import Paypal from "../images/paypal.png";
import Image_1 from "../images/pollockbag1.1.png";
import {useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../Components/CheckoutSteps'
import CheckoutNav from '../Components/CheckoutNav'
import {useLocation, useNavigate} from 'react-router-dom';
import Countries from './pageComponents/Countries'
const Checkout = () => {

    let navigate = useNavigate();

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState("")
    const location = useLocation();
    const [localCountry, setLocalCountry] = useState("")
    const [local, setLocal] = useState("")

    const handleShipping=()=>{
        navigate({
            pathname: '/shipping',
            search: '',
            },
            {state:[email || local, country, city, address]}
            );
    }  
    
    React.useEffect(() => { 
        setLocal(localStorage.getItem("email"))
        setLocalCountry(localStorage.getItem("country"))
       }, [0]);
    

    const sendDataToParent = (index) => { 
        console.log(index);
        setCountry(index);
    };

    console.log(country);

    return(
        <div>
        <CheckoutNav/>
        <Container  fluid>
        <Row style={{height:"40rem", overflow:"visible"}}>
            <Col lg={6} className="d-flex flex-column">
                <Row className="d-flex flex-column align-self-center same-row">
                    <Row className="d-flex flex-column"> 
                        <CheckoutSteps style={{position:"absolute", left:"-2px", top:"30px"}} step1 step2/>
                    </Row>
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px",}}>
                            Contact information
                        </p>
                    </Row>
                    <Form style={{width:"auto"}} className="checkout-contact">
                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Control style={{color: "black", fontSize:"0.9rem"}}type="email" placeholder="Enter email"  onChange={e => (setEmail(e.target.value), setLocal(e.target.value))} value={local ? local : email}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="firstname" placeholder="First Name"/>
                            <Form.Control type="lastname" placeholder="Last Name"/>
                        </Form.Group>
                    </Form>
                </Row>
                <Row className="d-flex flex-column align-self-center  mt-3 same-row">
                    <Row style={{position:"relative", height:"2rem"}}>
                      <p style={{position:"absolute", left:"-2px", fontSize:"1rem"}}>
                            Shipping Adress
                        </p>
                    </Row>
                    <Form style={{width:"auto"}} className="checkout-contact">
                        <Countries country={localCountry ? localCountry : country} sendDataToParent={sendDataToParent}/>
                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Control type="city" placeholder="City" onChange={e => setCity(e.target.value)} value={city}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="county" placeholder="State or county"/>
                            <Form.Control type="zip" placeholder="ZIP code"/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="adress" placeholder="Street adress" onChange={e => setAddress(e.target.value)} value={address}/>
                            <Form.Control type="housenumber" placeholder="Apartment or house number"/>
                        </Form.Group>
                    </Form>
                    <Row>
                        <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
                            <div>
                                <button type="button" className="btn-rounded-6" onClick={handleShipping}>
                                   Shipping
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