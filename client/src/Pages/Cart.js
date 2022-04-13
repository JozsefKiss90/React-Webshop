import React from "react";
import { useState, useEffect } from "react";
import NavComponent from "../Components/Navbar"
import Footer from "../Components/Footer"
import Container from "react-bootstrap/Container"
import {Row, Col} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from "../actions/cartActions";
import {useNavigate, useLocation, useSearchParams  } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';
import ScrollToTop from "./pageComponents/ScrollToTop";

const Cart = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    ScrollToTop()

    let navigate = useNavigate();
    let location = useLocation()

    const [searchParams] = useSearchParams();

    let searchParam = location.search

    let urlId = searchParam.substring(1,25)
    
    let qty = searchParams.get(urlId) ? Number(searchParams.get(urlId).split("=")[1]) : 0
    
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const [subTotal,setSubTotal] = useState([0])

    React.useEffect(() => {
        setSubTotal(
            cartItems.map(prices => (
                Number(prices.price)*Number(prices.qty)
            ) )
            )
       }, [cartItems]);
     
    if(subTotal.length !== 0) {
        var totalArr = subTotal.reduce((total, num) => total+num )
     }

    useEffect(()=>{
        if(urlId) { 
            dispatch(addToCart(urlId,qty))
        }
    },[dispatch,urlId,qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
      }

    const handleCheckout=()=>{
        navigate({
            pathname: '/information', 
            search: '',
            },
            {state:{id:1,name:'sabaoon'}}
            );
    }  
  
    const [mouseEffect, setMouseEffect] = useState (false)
    const [fading, setFading] = useState (false)

    React.useEffect((fading) => {
        setFading(!fading)
       }, []);


    function handleOut() {
        setMouseEffect(!mouseEffect)
      }

    function handleIn() {
        setMouseEffect(!mouseEffect)
      } 

    const classes = fading ? 'btn-rounded-5' : 'btn-rounded-5 hide'

    return(
        <div> 
        <NavComponent/>
            <Container fluid style={{height:"auto"}}>
                {isDesktopOrLaptop && <>
                    {cartItems.length === 0 ? (
                    <h4 style={{marginBottom:"6rem"}} className="text-center py-4">
                        Your cart is empty 
                    </h4>
                    ) : (
                    <>
                    <Row>
                    <Col>
                    
                    </Col>
                    <Col className="shop-title">
                        <h2 >
                            Cart
                        </h2>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                    <Row className="cart-row item-border-2">
                        <Col  lg={8} className="cart-col">
                        
                        </Col>
                        <Col lg={1} className="cart-col">
                            Price
                        </Col>
                        <Col lg={1} className="cart-col d-flex justify-content-center">
                            Quantity
                        </Col>
                        <Col lg={2} className="cart-col-4">
                            <p>
                                Total 
                            </p>
                        </Col> 
                    </Row>
                {cartItems.map((items, index) => (
                    <Row key={index} className="cart-row-2 item-border-2">
                        <Col lg={8} className="cart-col cart-image-col">
                            <Fade>
                                <img src={items.image} alt="" />
                            </Fade>
                            <div className="mt-3">
                                <p>
                                <strong>{items.category}</strong> <br/> {items.name}
                                </p>
                            </div>
                        </Col>
                        <Col lg={1} className="cart-col">
                            <div className="cart-col-box">
                                {items.price}
                            </div>
                        </Col>
                        <Col lg={1} className="cart-col d-flex justify-content-center align-items-center">
                            <div className="box-container d-flex justify-content-center">
                                <div className="cart-middle-box">
                                    {items.qty}
                                </div>
                                    <div className="d-flex flex-column justify-content-center cart-middle-box-2">
                                        <div style={{maxHeight:"1.2rem", paddingRight:"20px"}} onClick={() =>
                                            dispatch(
                                            addToCart(items.product, items.qty+1)
                                            )
                                        } className="d-flex align-items-end">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                            </svg>
                                        </div>
                                        <div style={{maxHeight:"1.2rem", paddingRight:"20px"}} onClick={() =>
                                            dispatch(
                                            addToCart(items.product, items.qty-1)
                                            )
                                        } className="d-flex align-items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div style={{padding:"10px"}} onClick={() => removeFromCartHandler(items.product)}>
                                        <div className="d-flex justify-content-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={2} className="cart-col d-flex justify-content-end">
                                <div className="cart-col-box">
                                {items.price*items.qty}
                                </div>
                            </Col>
                        </Row>     
                        )
                    )}    
                    <Row className="cart-row d-flex align-items-center">
                        <Col  lg={8} className="cart-col">
                        
                        </Col>
                        <Col lg={1} className="cart-col-4 py-3">
                            <p>
                                Subtotal
                            </p>
                        </Col>
                        <Col lg={1} className="cart-col d-flex justify-content-center">
                            
                        </Col>
                        <Col lg={2} className="cart-col-4 py-3">
                            <p>
                            {totalArr}
                            </p>
                        </Col>
                    </Row>
                    <Row className="cart-row item-border-3 mt-3">
                        <Col  lg={8} className="cart-col">
                        
                        </Col>
                        <Col lg={1} className="cart-col  mt-3">
                            Shipping
                        </Col>
                        <Col lg={1} className="cart-col d-flex justify-content-center">
                            
                        </Col>
                        <Col lg={2} className="cart-col-4 text-end  mt-3">
                            <p>
                            <strong> Calculated in checkout</strong>
                            </p>
                        </Col> 
                    </Row>
                    <Row className="cart-row py-2">
                        <Col  lg={6} className="cart-col">
                        
                        </Col>
                        <Col lg={1} className="cart-col">
                        
                        </Col>
                        <Col lg={1} className="cart-col d-flex justify-content-center">
                            
                        </Col>
                        <Col lg={4} className="cart-col-4 d-flex justify-content-end mt-3">
                            <button style={{fading, marginRight:"30px"}} type="button" className="btn-rounded-in-5">
                            Shop
                            </button> 
                            <button style={{fading, marginRight:"30px"}} type="button" className={mouseEffect ? "btn-rounded-in-5" : classes}
                            onMouseOver={handleIn} onMouseOut={handleOut}
                            onClick={handleCheckout}>
                                Checkout
                            </button> 
                        </Col>
                    </Row> 
                    </>
                    )}
                </>}
        {isMobile && <>
            {cartItems.length === 0 ? (
            <Row style={{height:'17rem'}} className="d-flex align-items-center" >
                <h4 className="text-center py-4">
                Your cart is empty 
                </h4>
            </Row>
            ) : ( 
            <>
            <Row className="shop-title">
                <Col>
                
                </Col>
                <Col className="mt-3">
                    <h2 className="text-center" >
                        Cart
                    </h2>
                </Col>
                <Col>
                
                </Col>
            </Row>
            {cartItems.map((items, index) => (
                <Row key={index} className="cart-row-2 item-border-2">
                    <Col lg={12} className="cart-col cart-image-col">
                        <Fade>
                            <img src={items.image} alt=""/>
                        </Fade>
                        <Row className="mx-1">
                        <div className="mt-3">
                            <p>
                            <strong>{items.category}</strong> <br/> {items.name}
                            </p>
                        </div>
                        <div style={{position:'relative', bottom:'10px'}} className="box-container d-flex justify-content-start">
                            <div className="cart-middle-box">
                                {items.qty}
                            </div>
                            <div className="d-flex flex-column justify-content-center cart-middle-box-2">
                                <div style={{maxHeight:"1.2rem", paddingRight:"20px"}} onClick={() =>
                                    dispatch(
                                    addToCart(items.product, items.qty+1)
                                    )
                                } className="d-flex align-items-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                    </svg>
                                </div>
                                <div style={{maxHeight:"1.2rem", paddingRight:"20px"}} onClick={() =>
                                    dispatch(
                                    addToCart(items.product, items.qty-1)
                                    )
                                } className="d-flex align-items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg>
                                </div>
                            </div>
                            <div style={{padding:"10px 20px 0 0", marginLeft:'auto', marginRight:'0'}} onClick={() => removeFromCartHandler(items.product)}>
                                <div className="d-flex">
                                    <p style={{borderBottom:'grey 2px solid', fontSize:'0.9rem', lineHeight:'18px'}}>
                                        Remove
                                    </p>
                                </div>
                            </div>
                        </div>
                        </Row>
                    </Col>
                </Row>     
                )
            )}    
            <Row style={{ padding:'13px'}} className="cart-row-2">
                <Col className="cart-col">
                    <p>
                        Shipping: <strong> Calculated in checkout</strong> <br/>
                        Total: {totalArr}
                    </p>
                </Col>
            </Row>
            <Row className="cart-row mb-4">
                <Col  lg={6} className="cart-col">
                
                </Col>
                <Col lg={1} className="cart-col">
                
                </Col>
                <Col lg={1} className="cart-col d-flex justify-content-center">
                    
                </Col>
                <Col lg={4} className="cart-col-4 d-flex justify-content-end">
                    <button style={{fading, marginRight:"30px"}} type="button" className="btn-rounded-in-5">
                           Shop
                    </button> 
                    <button style={{fading, marginRight:"30px"}} type="button" className={mouseEffect ? "btn-rounded-in-5" : classes}
                    onMouseOver={handleIn} onMouseOut={handleOut}
                    onClick={handleCheckout}>
                    Checkout
                    </button> 
                </Col>
            </Row> 
            </>
                )}
            </>}
            </Container>
        <Footer/>
        </div>    
    )
}

export default Cart