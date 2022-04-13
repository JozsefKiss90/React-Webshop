import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import NavComponent from "../Components/Navbar"
import Footer from "../Components/Footer"
import Fade from 'react-reveal/Fade';
import Container from "react-bootstrap/Container"
import {Row, Col} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import Image_1 from "../images/pollockbag1.1.png"
import Mask from "../images/pollockmask1.1.png"
import Mask_2 from "../images/pollockmask2.png"
import Hat from "../images/pollockhat.png"
import Mobile from "../images/mobile.png" 
import Mobile_2 from "../images/mobile2.png"
import ArrowToggler from "./pageComponents/ArrowToggler";
import ShopItem from "./pageComponents/ShopItems";
import { listPoductDetails } from "../actions/productActions";
import { useParams, useNavigate, createSearchParams, Link} from "react-router-dom"
import ScrollToTop from "./pageComponents/ScrollToTop";
import { listPoduct } from "../actions/productActions";
import imageArr from "../constants/imageArr";
import { useMediaQuery } from 'react-responsive'

const Item = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    ScrollToTop()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [0]);

    const params = useParams();
    
    const dispatch = useDispatch() 
 
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
 
    useEffect(()=>{
        dispatch(listPoductDetails(params.id))
    },[dispatch,params])
    
    const productList = useSelector(state => state.productList)
    const {loading_2, error_2, products} = productList
  
    useEffect(()=>{
        dispatch(listPoduct())
    },[dispatch]) 

    const imageArray = []

    if(product.category=='mask') {
        imageArray.push(...products.filter(product => product.category == 'mask'))
    }
    else if (product.category=='Shopping Bag') {
        imageArray.push(...products.filter(product => product.category == 'Shopping Bag'))
    }
    else if (product.category=='mobile') {
        imageArray.push(...products.filter(product => product.category == 'mobile'))
    }

    let navigate = useNavigate();

    function handleCart(){
        navigate({
            pathname: '/cart/',
            search: `${createSearchParams(productId)}?qty=${quantity}`,
          });
    }

    const [quantity, setQuantity] = useState(1)
    const [item, setItem] = useState("")
    const [fading, setFading] = useState (false)
    const [inProp, setInProp] = useState(false);
    const [mouseEffect, setMouseEffect] = useState (false)
    const [productId, setProductId] = useState({id : null})
    const [name, setName] = useState("")

    function setProduct() {
        setItem(product.img)
        setName(product.name)
    }
    
    React.useEffect(() => { 
        setProductId(params.id)
       }, [0]);

    React.useEffect(() => { 
        setProduct()
       }, [product]);
    
    function handleOut() {
        setMouseEffect(!mouseEffect)
      }

    function handleIn() {
        setMouseEffect(!mouseEffect)
      } 
    
    function handleOut() {
        setMouseEffect(!mouseEffect)
      }

    function handlePlusCount(){
        setQuantity(quantity+1)
    }

    function handleMinusCount(){
        setQuantity(quantity-1)
    }

    React.useEffect(() => {
        setFading(!fading)
       }, [0]);

    React.useEffect(() => {
        setInProp(!inProp)
       }, [0]);


    const classes = fading ? 'btn-rounded-4' : 'btn-rounded-4 hide'

    function findBags(bags) {
        return bags.category == 'Shopping Bag';
      }

    function filterBags(bags) {
        return bags.name != 'No.1'
    }
 
    const bags = products.filter(findBags)
    const filteredBags = bags.filter(filterBags)
   
    return (
        <div> 
        <NavComponent/>
            <Container fluid>
                {isDesktopOrLaptop && <>
                <Row>
                    <Col lg={1} className="item-side-container">
                    {loading ? (
                        <h2>Loading...</h2>
                        ) : error ? (
                            <h2>{error}</h2>
                        ) : ( 
                        <>
                            { imageArray.map((image) => ( 
                                <Row key={image._id} className="item-side">
                                    <Fade>
                                        <img src={image.img} onClick={()=>(setItem(image.img),setName(image.name), setInProp(!inProp), setProductId(image._id))} className={(item==product.img && product.img == image.img ) || item==image.img ? "red-border" : " "}/>
                                    </Fade>
                                </Row>
                            ))}  
                        </>
                    )}
                    </Col>
                    <Col lg={6} className="item-side-container">
                    <CSSTransition in={inProp} timeout={300} classnames="my-node">
                        <div className="my-node-div">
                            <img src={item} classnames="my-node-enter my-node-enter-active my-node-exit my-node-exit-active"/>
                        </div>
                    </CSSTransition> 
                    <Row>
                        <div style={{width:"15rem"}} className="d-flex justify-content-center mt-4">
                        {loading ? (
                        <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : ( 
                            <>
                                { imageArray.map((image) => (
                                    <div key={image._id} className="px-2">
                                        <div className={(item==product.img && product.img == image.img ) || item==image.img ? "item-circle select" : "item-circle"} onClick={()=>(setItem(image.img), setName(image.name),  setInProp(!inProp))}/>
                                    </div>
                                ))}  
                            </>
                        )}
                        </div>
                    </Row>
                    </Col>
                    <Col lg={5} className="item-side-container-2 mt-5">
                        <Row>
                           <h3 className="item-title ">
                             {product.category}
                           </h3>
                        </Row>
                        <Row>
                           <h5>
                             {name}
                           </h5>
                        </Row>
                         <Row className="item-border">
                       
                        <div className="stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <p> 654 Ratings</p>
                        </div>
                        <div>
                            <p> 8.500</p>
                        </div>
                    
                        </Row>
                        <Row>
                           <div>
                           <div className="box-container mt-3">
                                <button className="left-box" onClick={handleMinusCount}>
                                    -
                                </button>
                                <div className="middle-box">
                                    {quantity}
                                </div>
                                <button className="right-box" onClick={handlePlusCount}>
                                    +
                                </button>
                            </div>
                            </div>
                        </Row>
                        <Row style={{ width:"30%", marginLeft:"0px"}} className="mt-3">
                            <button style={{fading}}
                                    type="button"
                                    className={mouseEffect ? "btn-rounded-in" : classes}
                                    onMouseOver={handleIn} onMouseOut={handleOut}
                                    onClick={handleCart}>
                                Add To Cart
                            </button> 
                        </Row> 
                        <Row className="mt-3">
                            <Row>
                                <ArrowToggler 
                                    style={
                                        {marginLeft:"12px",
                                        width:"72%",
                                        borderTop:"1px solid black",
                                       
                                        borderBottom: "1px solid black"
                                        }
                                    }
                                    title="DESCRIPTION"/>
                            </Row>
                            <Row>
                                <ArrowToggler
                                style={
                                    {marginLeft:"12px",
                                    width:"72%",
                                    borderBottom: "1px solid black"
                                    }
                                }
                                title="SHIPPING"/>
                            </Row>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Row className="d-flex justify-content-center mt-5">
                        <h4 className="text-center mb-1">
                            You may also like 
                        </h4>
                    </Row>
                    <Row className="d-flex flex-row justify-content-center">
                        <Col className="d-flex align-items-center justify-content-end">
        
                            {params.id == imageArr[2]._id ? (
                                <Link to={`/item/${imageArr[0]._id}`}>
                                    <img src={Image_1} className={"item-image "}/>
                                 </Link>
                            ) : (
                                <Link to={`/item/${imageArr[2]._id}`}>
                                    <img src={Mask} className={"item-mask"}/>
                                </Link>
                            )} 
                           
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center">
                            {params.id == imageArr[1]._id ? (
                                <Link to={`/item/${imageArr[0]._id}`}>
                                     <img src={Image_1} className={"item-image"}/>
                                 </Link>
                            ) : (
                                <Link to={`/item/${imageArr[1]._id}`}>
                                    <img src={Mobile} className={"item-mobile"}/>
                                </Link>
                            )} 
                        </Col>
                        <Col className="d-flex align-items-center justify-content-start">
                            {params.id == imageArr[4]._id ? (
                                <Link to={`/item/${imageArr[0]._id}`}>
                                     <img src={Image_1} className={"item-image"}/>
                                 </Link>
                            ) : (
                                <Link to={`/item/${imageArr[4]._id}`}>
                                    <img src={Hat} className={"item-hat"}/>
                                </Link>
                            )} 
                        </Col>
                    </Row>
                </Row>
                </>}
                {isMobile && <>
                    <Row>
                    <Col lg={6} className="item-side-container mt-4">
                    <CSSTransition in={inProp} timeout={300} classnames="my-node">
                        <div className="my-node-div">
                            <img src={item} classnames="my-node-enter my-node-enter-active my-node-exit my-node-exit-active"/>
                        </div>
                    </CSSTransition> 
                   
                    <Row className="d-flex felx-column  justify-content-center mt-3">
                        <div className="d-flex felx-column  justify-content-center">
                            <h3 className="item-title">
                             {product.category}
                           </h3>
                       </div>
                       <div className="stars d-flex felx-column  justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <p> 654 Ratings</p>
                        </div>
                        <div style={{lineHeight:'5px'}} className="d-flex felx-column  justify-content-center">
                            <p> 8.500</p>
                        </div>
                    </Row>
                    </Col>
                    <Col lg={1} style={{height:'6rem'}} className="item-side-container d-flex flex-row">
                    {loading ? (
                        <h2>Loading...</h2>
                        ) : error ? (
                            <h2>{error}</h2>
                        ) : ( 
                        <>
                            { imageArray.map((image) => ( 
                                <Row key={image._id}  className="item-side px-3">
                                    <Fade>
                                        <img src={image.img} onClick={()=>(setItem(image.img), setInProp(!inProp), setProductId(image._id))} className={(item==product.img && product.img == image.img ) || item==image.img ? "red-border" : " "}/>
                                    </Fade>
                                </Row>
                            ))}  
                        </>
                    )}
                    </Col>
                    <Col lg={5}>
                        <Row className="py-3">
                           <div>
                                <h5 style={{lineHeight:'10px'}} className="text-center">Quantity</h5>
                                <div className="box-container mt-3">
                                    <button className="left-box" onClick={handleMinusCount}>
                                        -
                                    </button>
                                    <div className="middle-box">
                                        {quantity}
                                    </div>
                                    <button className="right-box" onClick={handlePlusCount}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </Row>
                        <Row className="mt-3 d-flex justify-content-center px-5 mb-1">
                            <button style={{fading}}
                                    type="button"
                                    className={mouseEffect ? "btn-rounded-in" : classes}
                                    onMouseOver={handleIn} onMouseOut={handleOut}
                                    onClick={handleCart}>
                                Add To Cart
                            </button> 
                        </Row> 
                        <Row className="py-3 mt-2">
                            <Row>
                                <ArrowToggler  
                                    style={
                                        {marginLeft:"12px",
                                        width:"100%",
                                        borderTop:"1px solid black",
                                        borderRight:"1px solid black",
                                        borderLeft:"1px solid black",
                                        borderBottom: "1px solid black"
                                        }
                                    }
                                    title="DESCRIPTION"/>
                            </Row>
                            <Row>
                                <ArrowToggler
                                style={
                                    {marginLeft:"12px",
                                    width:"100%",
                                    borderRight:"1px solid black",
                                    borderLeft:"1px solid black",
                                    borderBottom: "1px solid black"
                                    }
                                }
                                title="SHIPPING"/>
                            </Row>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Row className="d-flex justify-content-center mt-4">
                        <h4 className="text-center">
                            You may also like
                        </h4>
                    </Row>
                    <Row className="example-row gx-5 d-flex flex-nowrap">
                        {loading ? (
                            <h2>Loading...</h2>
                        ) : error ? (
                            <h2>{error}</h2>
                        ) : (
                        <>
                        {products.map((bag) => (
                            <Col key={bag._id} className="example-section px-4 mt-2">
                                <Fade>
                                    <Link to={`/item/${bag._id}`}>
                                        <img src={bag.img}/> 
                                    </Link>
                                </Fade>
                                <div className="text-center mobile-examples mt-3">
                                    <p>
                                       {bag.name}
                                    </p>
                                    <p>
                                       {bag.price}
                                    </p>
                                    <p>
                                       In stock
                                    </p>
                                </div>
                               
                            </Col>
                            ))}       
                            </>
                        )}
                    </Row>
                </Row>
                </>}
            </Container>
        <Footer/>
        </div>
    )
}

export default Item