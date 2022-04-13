import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container"
import {Row, Col, Form} from 'react-bootstrap';
import Visa from "../images/visa-logo.png";
import Amex from "../images/amex.png";
import Master from "../images/mastercard.png";
import Paypal from "../images/paypal.png";
import {useSelector} from 'react-redux'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe, 
    useElements
  } from '@stripe/react-stripe-js';
import { fetchFromAPI } from '../helpers';
import CheckoutSteps from '../Components/CheckoutSteps'
import {useLocation, useNavigate} from 'react-router-dom';
import CheckoutNav from '../Components/CheckoutNav'
import { useMediaQuery } from 'react-responsive'

const Checkout = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const [billingEmail, setBillingEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const location = useLocation();
    const [clientSecret, setClienSecret] = useState(null);
    const shippingData = location.state
    let navigate = useNavigate();

    const mapped = cartItems.map(items => items)

    var subtotal = 0

    for(let i = 0; i < mapped.length; i++) {
        subtotal+= mapped[i].price * mapped[i].qty
    }
 
    const shipping = {
        email:shippingData[0],
        name:"sanyi",
        country:shippingData[1],
        city:shippingData[2],
        street: shippingData[3], 
        zip:shippingData[4], 
        number:shippingData[5]
    }

    const shippingAddress = shipping.street + ' ' + shipping.number + ' ' + shipping.city
    
    useEffect(() => {
        const items = cartItems.map(item => ({price: item.price, quantity: item.qty}));
    
        if (shipping) {
          const body = {
            cartItems: items,
            shipping: {
              name: shipping.name,
              address: {
                line1: shippingAddress
              }
            },
            description: 'payment intent for nomad shop',
            receipt_email: shipping.email,
          }
    
          const customCheckout = async () => {
            const { clientSecret} = await fetchFromAPI('create-payment-intent', {
              body
            });
    
            setClienSecret(clientSecret)
          }
    
          customCheckout();
        }
      }, []);

    const handleCheckout = async () => {
   
    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
        card: elements.getElement(CardNumberElement)
        }
    }); 

    if (payload.error) {
        setError(`Payment Failed: ${payload.error.message}`);
    } else {
        navigate({
            pathname: '/success',
            search: '',
          });
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

    const cardHandleChange = event => {
        const { error } = event;
        setError(error ? error.message: '');
      }

    const cardStyle = {
        style: {
          base: {
            color: "#000",
            fontWeight: '100',
            fontFamily: 'Raleway, sans-serif',
           
            fontSize: "0.9",
            "::placeholder": {
              color: "#606060",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }
      };

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
            <Col className="d-flex flex-column">
                <Row className="d-flex flex-column align-self-center mt-1 same-row">
                    <Row className="d-flex flex-column"> 
                        <CheckoutSteps style={{position:"absolute", left:"-2px", top:"30px"}} step1 step2 step3 step4/>
                    </Row>
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px",}}>
                            Contact information
                        </p>
                    </Row>
                        <Form.Group   className="checkout-contact ">
                            <Row  className="shipping-details d-flex">
                                <Col lg={2} className="d-flex align-items-center justify-content-start">
                                    <input className="custom-form" defaultValue="Contact"/>
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                                    <input className="custom-form" defaultValue={shippingData[0]}/>
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
                                    <path d="M 0 1 l 455 0" stroke="#adb5bd" strokeWidth="2"fill="none" />
                                </svg> 
                                <Row className="shipping-details d-flex">
                                <Col lg={2} className="d-flex align-items-center justify-content-start">
                                    <input className="custom-form" defaultValue="Method"/>
                                </Col>
                                <Col lg={8} className="d-flex align-items-center justify-content-start">
                                    <input className="custom-form" defaultValue="Express"/>
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
                                        <h6>
                                        <strong> Cards</strong>
                                        </h6>
                                    </div> 
                                    <div className="checkout-cards-pos">
                                        <img src={Visa} alt=""/>
                                        <img src={Amex} alt=""/>
                                        <img src={Master} alt=""/>
                                        <img src={Paypal} alt=""/>
                                    </div> 
                                </Col> 
                            </Row>
                            <Row>
                                <Form.Group className="pt-2 pb-1 card-details" controlId="formBasicEmail">
                                    <Form.Label>Name on card</Form.Label>
                                    <Form.Control style={{fontWeight:"400", fontSize:"0.9rem"}} type="cardname" />
                                </Form.Group>

                                <Form.Group className="pt-2 pb-1" controlId="formBasicEmail">
                                    <Form.Label>Card number</Form.Label>
                                    <CardNumberElement options={cardStyle} className="card-number" onChange={cardHandleChange}/>  
                                </Form.Group>
                                <Form.Group className=" d-flex pt-1 pb-3 gap-2" controlId="formBasicPassword">
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>Expiry</Form.Label>
                                            <CardExpiryElement options={cardStyle} className="card-number" onChange={cardHandleChange}/>  
                                        </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label>CVV/CVC</Form.Label>
                                            <CardCvcElement options={cardStyle} className="card-number" onChange={cardHandleChange}/>  
                                        </Form.Group>
                                    </Col>   
                                </Form.Group>
                            </Row>
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
                            <Col style={{padding:"1rem 0",height:'auto'}} className="d-flex justify-content-start">
                            <div>
                                <button  onClick={handleCheckout} type="button" className="btn-rounded-6">
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
            <Col className="checkout-products ">
                <Row style={{width:"40rem"}} className="d-flex flex-column  px-4">
                    <div style={{marginTop:"1.5rem"}}>

                    </div>
                {cartItems.map((items, index) => (
                    <Row key={index} className="item-border-4">
                        <Col lg={6} className="checkout-summary">
                            <div style={{marginTop:"1rem"}} className="checkout-img">
                                <img src={items.image} alt=""/>
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
            <Row  className={expand}>
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
                                <img src={items.image} alt=""/>
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
            <Row>
            <Col  className="d-flex flex-column">
            <Row className="px-3">
                <Row className="d-flex flex-column"> 
                    <CheckoutSteps  step1 step2 step3 step4/>
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
                <Row className="d-flex flex-column px-3 mt-3">
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px", fontSize:"1rem"}}>
                            Payment
                        </p>
                    </Row>
                    <Form className="checkout-contact-card">
                        
                        <Row className="checkout-card-row">
                            <Col className="checkout-cards">  
                                <div>
                                    <h6>
                                       <strong> Cards</strong>
                                    </h6>
                                </div> 
                                <div className="checkout-cards-pos">
                                    <img src={Visa} alt=""/>
                                    <img src={Amex} alt=""/>
                                    <img src={Master} alt=""/>
                                    <img src={Paypal} alt=""/>
                                </div> 
                            </Col> 
                        </Row>

                        <Form.Group className="pt-2 pb-1 card-details" controlId="formBasicEmail">
                            <Form.Label>Name on card</Form.Label>
                            <Form.Control style={{fontWeight:"400", fontSize:"0.9rem"}} type="cardname" />
                        </Form.Group>

                        <Form.Group className="pt-2 pb-1" controlId="formBasicEmail">
                            <Form.Label>Card number</Form.Label>
                            <CardNumberElement options={cardStyle} className="card-number" onChange={cardHandleChange}/>  
                        </Form.Group>

                        <Form.Group className=" d-flex pt-1 pb-3 gap-2" controlId="formBasicPassword">
                        <Col >
                            <Form.Group>
                                <Form.Label>Expiry</Form.Label>
                                <CardExpiryElement options={cardStyle} className="card-number" onChange={cardHandleChange}/>  
                            </Form.Group>
                            </Col>
                            <Col >
                            <Form.Group>
                                <Form.Label>CVV/CVC</Form.Label>
                                <CardCvcElement options={cardStyle} className="card-number" onChange={cardHandleChange}/>  
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
                            <Row className="shipping-details d-flex flex-row flex-nowrap billing-row">
                                <Col style={{marginTop:'3px'}} className="d-flex align-items-center justify-content-start">
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option1"
                                    checked={selected}
                                    onChange={HandleOptionChange}
                                />
                                </Col >
                                    <p style={{whiteSpace: 'nowrap', lineHeight:'36px'}}>  
                                    <strong style={{fontSize:"0.9rem"}}>Same as shipping address</strong>
                                    </p>
                                <Col className="d-flex align-items-end">
                                   
                                </Col>
                            </Row>
                            <Row className="shipping-details d-flex flex-nowrap billing-row">
                                <Col style={{marginTop:'3px'}} className="d-flex align-items-center justify-content-start">
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option2"
                                    checked={!selected}
                                    onChange={HandleOptionChange}
                                />
                                </Col>
                                <p style={{whiteSpace: 'nowrap', lineHeight:'36px'}}>  
                                <strong style={{fontSize:"0.9rem"}}>Use a different billing address</strong>
                                </p>
                                <Col className="d-flex align-items-end">
                                
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
                                    <Form.Control style={{color: "black"}}type="phone" placeholder="Phone number"  onChange={e => setBillingEmail(e.target.value)} defaultValue={email}/>
                                </Form.Group>
                            </Form>
                            </Row>
                        </Form.Group>
                        <Row>
                            <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
                            <div>
                                <button  onClick={handleCheckout} type="button" className="btn-rounded-6">
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
            </Row>
        </>}
        </Container>
        </div>
    )
}

export default Checkout