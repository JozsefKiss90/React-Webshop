import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container"
import {Row, Col, Form} from 'react-bootstrap';
import {useSelector} from 'react-redux'
import CheckoutSteps from '../Components/CheckoutSteps'
import CheckoutNav from '../Components/CheckoutNav'
import {useNavigate} from 'react-router-dom';
import Countries from './pageComponents/Countries'
import { useMediaQuery } from 'react-responsive'

const Information = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    let navigate = useNavigate();
 
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const [email, setEmail] = useState('');
    const [names, setNames] = useState({firstName:'', lastName:''});
    const [localName, setLocalName] = useState({firstName:'', lastName:''});
    const [localFirstName, setLocalFirstName] = useState('');
    const [localLastName, setLocalLastName] = useState('');
    const [localAddress, setLocalAddress] = useState('');
    const [localCity, setLocalCity] = useState('');
    const [localZip, setLocalZip] = useState('');
    const [localHousenumber, setLocalHousenumber] = useState('');
    const [country, setCountry] = useState("")
    const [localCountry, setLocalCountry] = useState("")
    const [localEmail, setLocalEmail] = useState("")

    const [theObject, setTheObject] = useState({
        county: "",
        zip: "",
        city: "",
        address: "",
        housenumber: "",
        code: "",
      });
  
    const handleShipping=()=>{
        navigate({
            pathname: '/shipping',
            search: '',
            },
            {state:[email || localEmail, country || localCountry, theObject.city || localCity, theObject.zip || localZip,
                theObject.address || localAddress, theObject.housenumber || localHousenumber,
                names.firstName || localFirstName, names.lastName || localLastName,]}
            );
    } 

    const sendDataToParent = (index) => { 
        setCountry(index);
    };

    const handleChangeUpdateAddObject = event => {
        const name = event.target.name;
        const value = event.target.value;
        setTheObject(prev => ({
          ...prev,
          [name]: value
        }));
      };

    const setSingleName= (key, value) => setNames({...names, [key]: value});
    const setSingleLocalName= (key, value) => setLocalName({...names, [key]: value});

    React.useEffect(() => { 
    setLocalEmail(localStorage.getItem("email"))
    setLocalCountry(localStorage.getItem("country"))
    setLocalCity(localStorage.getItem("city"))
    setLocalZip(localStorage.getItem("zip"))
    setLocalAddress(localStorage.getItem("address"))
    setLocalHousenumber(localStorage.getItem("housenumber"))
    setLocalLastName(localStorage.getItem("lastname"))
    setLocalFirstName(localStorage.getItem("firstname"))
    }, []);

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
        <Container  fluid>
        {isDesktopOrLaptop && <>
            <Row>
            <Col lg={1}>
            </Col>
            <Col  className="d-flex flex-column">
                <Row className="d-flex flex-column align-self-center mt-1 same-row">
                <Row className="d-flex flex-column"> 
                    <CheckoutSteps style={{position:"absolute", left:"-2px", top:"30px"}} step1 step2/>
                </Row>
                <Row style={{position:"relative", height:"2rem"}}>
                    <p style={{position:"absolute", left:"-2px"}}>
                        Contact information
                    </p>
                </Row>
                        <Form style={{width:"auto"}} className="checkout-contact">
                            <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                                <Form.Control style={{color: "black", fontSize:"0.9rem"}} type="email" placeholder="Enter email" 
                                onChange={e => setEmail(e.target.value)} value={localEmail ? localEmail : email}/>
                            </Form.Group>

                            <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                                <Form.Control type="firstname" placeholder="First Name" onChange={e => (setSingleName('firstName', e.target.value))} value={localFirstName ? localFirstName : names.firstName}/>
                                <Form.Control type="lastname" placeholder="Last Name" onChange={e => (setSingleName('lastName', e.target.value))} value={localLastName ? localLastName : names.lastName}/>
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
                        <Countries country={localCountry ? localCountry : ""} sendDataToParent={sendDataToParent}/>
                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Control type="city" name="city" placeholder="City" value={localCity ? localCity : theObject.code} onChange={e => (setLocalCity(e.target.value))}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="county" name="county" placeholder="State or county"  value={theObject.code} onChange={(handleChangeUpdateAddObject)}/>
                            <Form.Control type="zip" name="zip" placeholder="ZIP code"  value={localZip ? localZip : theObject.code} onChange={e => (setLocalZip(e.target.value))}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="address" name="address" placeholder="Street adress" value={localAddress ? localAddress :theObject.code} onChange={handleChangeUpdateAddObject}/>
                            <Form.Control type="housenumber" name="housenumber" placeholder="Apartment or house number" value={localHousenumber ? localHousenumber : theObject.code} onChange={handleChangeUpdateAddObject}/>
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
            <Row className="px-3">
                    <Row className="d-flex flex-column"> 
                        <CheckoutSteps  step1 step2/>
                    </Row>
                    <Row style={{position:"relative", height:"2rem"}}>
                        <p style={{position:"absolute", left:"-2px",}}>
                            Contact information
                        </p>
                    </Row>
                    <Form  className="checkout-contact">
                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Control style={{color: "black", fontSize:"0.9rem"}} type="email" placeholder="Enter email" 
                            onChange={e => (setEmail(e.target.value))} value={localEmail ? localEmail : email}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="firstname" placeholder="First Name" onChange={e => (
                             setLocalFirstName(e.target.value))} value={localFirstName ? localFirstName : names.firstName}/>
                            <Form.Control type="lastname" placeholder="Last Name" onChange={e => (
                             setLocalLastName(e.target.value))} value={localLastName ? localLastName : names.lastName}/>
                        </Form.Group>
                    </Form>
                </Row>
                <Row className="px-3 mt-3">
                    <Row style={{position:"relative", height:"2rem"}}>
                      <p style={{position:"absolute", left:"-2px", fontSize:"1rem"}}>
                            Shipping Adress
                        </p>
                    </Row>
                    <Form style={{width:"auto"}} className="checkout-contact">
                        <Countries country={localCountry ? localCountry : ""} sendDataToParent={sendDataToParent}/>
                        <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
                            <Form.Control type="city" name="city" placeholder="City" value={localCity ? localCity : theObject.code} onChange={e => (setLocalCity(e.target.value))}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="county" name="county" placeholder="State or county"  value={theObject.code} onChange={(handleChangeUpdateAddObject)}/>
                            <Form.Control type="zip" name="zip" placeholder="ZIP code"  value={localZip ? localZip : theObject.code} onChange={e => (setLocalZip(e.target.value))}/>
                        </Form.Group>

                        <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
                            <Form.Control type="address" name="address" placeholder="Street adress" value={localAddress ? localAddress :theObject.code} onChange={handleChangeUpdateAddObject}/>
                            <Form.Control type="housenumber" name="housenumber" placeholder="Apartment or house number" value={localHousenumber ? localHousenumber : theObject.code} onChange={handleChangeUpdateAddObject}/>
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
        </>}
        </Container>
        </div>
    )
}

export default Information