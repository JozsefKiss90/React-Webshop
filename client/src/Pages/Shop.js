import {React, useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from "react-router";
import NavComponent from "../Components/Navbar"
import Footer from "../Components/Footer"
import Fade from 'react-reveal/Fade';
import Container from "react-bootstrap/Container" 
import {Row, Col} from 'react-bootstrap';
import Image_2 from "../images/pollockbag2.1.png";
import Image_3 from "../images/pollockbag3.1.png";
import Mask from "../images/pollockmask1.1.png"
import Mask_2 from "../images/pollockmask2.png"
import Hat from "../images/pollockhat.png"
import Mobile from "../images/mobile.png"
import Mobile_2 from "../images/mobile2.png"
import { listPoduct } from "../actions/productActions";
import {Link} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import Carousel_2 from "./pageComponents/Carousel-2"; 

const Shop = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(()=>{
        dispatch(listPoduct())
    },[dispatch]) 

    const [mouseEffect, setMouseEffect] = useState (false)
    const [mouseEffect_2, setMouseEffect_2] = useState (false)
    const [mouseEffect_3, setMouseEffect_3] = useState (false)

    const routePath = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [routePath]);

    function handleIn() {
        setMouseEffect(!mouseEffect)
      }
    
    function handleOut() {
        setMouseEffect(!mouseEffect)
      }

    function handleIn_2() {
        setMouseEffect_2(!mouseEffect_2)
      }
    
    function handleOut_2() {
        setMouseEffect_2(!mouseEffect_2)
      }
    
    function handleIn_3() {
        setMouseEffect_3(!mouseEffect_3)
      }
    
    function handleOut_3() {
        setMouseEffect_3(!mouseEffect_3)
      }
    
    function findBags(bag) {
        return bag.category == 'Shopping Bag';
      }
    
    const bags = products.filter(findBags)

    function findMasks(mask) {
        return mask.category == 'mask';
      }
    
    const masks = products.filter(findMasks)

    function findMobiles(mobile) {
        return mobile.category == 'mobile';
      }
    
    const mobiles = products.filter(findMobiles)

    return (
        <div>
        <NavComponent/>
        {isDesktopOrLaptop && <>
            <Container fluid>
                <Row>
                    <Col>
                    
                    </Col>
                    <Col className="shop-title">
                        <h2 >
                            All Merchandise
                        </h2>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                    </Col>
                    <Col className="shop-title-2">
                        <h5>
                        Pick Your Own Stlye
                        </h5>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{marginTop:"10px"}}>
                <Row>
                    <Col className="shop-items">
                        <Fade>
                        {loading ? (
                            <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                            <>
                            {
                            <Link to={`/item/${bags[0]._id}`}>
                                <img src={mouseEffect ? Image_3 : Image_2} onMouseEnter={handleIn} onMouseLeave={handleOut} className="shop-image"/>
                            </Link>
                                }       
                            </>
                        )}
                        </Fade>
                    </Col>
                    <Col className="shop-items">
                        <Fade>
                        {loading ? (
                            <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                            <>
                            {
                            <Link to={`/item/${masks[0]._id}`}>
                                <img src={mouseEffect_2 ? Mask : Mask_2} onMouseEnter={handleIn_2} onMouseLeave={handleOut_2}  className="mask"/>
                            </Link>
                                }       
                            </>
                        )}
                        </Fade>
                    </Col>
                    <Col className="shop-items">
                        <Fade>
                        {loading ? (
                            <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                            <>
                            {
                            <Link to={`/item/${products[7]._id}`}>
                                <img src={Hat} className="hat"/>                        
                            </Link>
                     
                                }       
                            </>
                        )}
                        </Fade>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                <Col className="example-title">
                    <p>
                        {mouseEffect ? "Free Form" : "Autmn Rythm"}
                    </p>
                </Col>
                <Col className="example-title">
                    <p>
                        {mouseEffect_2 ? "The She-Wolf" : "Convergence"}
                    </p>
                </Col>
                <Col className="example-title">
                    <p>
                        Mural
                    </p>
                </Col>
                </Row>
                <Row>
                <Col className="example-price">
                    <p>
                        8.000
                    </p>
                </Col>
                <Col className="example-price">
                    <p>
                    8.000
                    </p>
                </Col>
                <Col className="example-price">
                    <p>
                        8.000 <br/>
                    </p>
                </Col>
                </Row>
                <Row>
                <Col className="example-stock">
                    <p>
                        In Stock
                    </p>
                </Col>
                <Col className="example-stock">
                    <p>
                        In Stock
                    </p>
                </Col>
                <Col className="example-stock">
                    <p>
                        In Stock
                    </p>
                </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col className="shop-items-2">
                    <Fade>
                        {loading ? (
                            <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                            <>
                            {
                            <Link to={`/item/${mobiles[0]._id}`}>
                                <img src={mouseEffect_3 ? Mobile : Mobile_2} onMouseEnter={handleIn_3} onMouseLeave={handleOut_3} className="mobile"/>
                            </Link>
                                }       
                            </>
                        )}
                        </Fade>
                       
                    </Col>
                    <Col  className="shop-items-2">
                      
                    </Col>
                    <Col  className="shop-items-2">
                      
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col className="example-title">
                        <p>
                        {mouseEffect_3 ? "The Deep" : "No. 1"}
                        </p>
                    </Col>
                    <Col className="example-title">
                      
                    </Col>
                    <Col className="example-title">
                      
                    </Col>
                </Row>
                <Row>
                    <Col className="example-price">
                        <p>
                            8.000
                        </p>
                    </Col>
                    <Col className="example-price">
                        
                    </Col>
                    <Col className="example-price">
                        
                    </Col>
                </Row>
                <Row style={{paddingBottom:"3rem"}}>
                    <Col className="example-stock">
                        <p>
                            In Stock
                        </p>
                    </Col>
                    <Col className="example-stock">
                       
                    </Col>
                    <Col className="example-stock">
                        
                    </Col>
                </Row>
            </Container>
        </>}
        {isMobile && <>
            <Container fluid>
                <Row>
                    <Col>
                    
                    </Col>
                    <Col className="text-center mt-3">
                        <h2 >
                            All Merchandise
                        </h2>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                    </Col>
                    <Col className="shop-title-2">
                        <h5 style={{whiteSpace: 'nowrap'}}>
                            Pick Your Own Stlye
                        </h5>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
            <Container fluid>
            
                    <Row className="shop-items">
                        <Row className="text-center mt-3 py-3">
                           <h6>
                           Shopping Bags
                           </h6>
                        </Row>
                        <Fade>
                        {loading ? (
                            <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                            <>
                            { 
                            <>
                            <Carousel_2 array={bags}/>
                            
                            </>
                                }       
                            </>
                        )}
                        </Fade>
                    </Row>
                    <Row  className="shop-items">
                        <Row className="text-center mt-5">
                           <h6 className="mt-3">
                           Masks
                           </h6>
                        </Row>
                        <Fade>
                        {loading ? (
                            <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                            <>
                            {
                            <>
                           <Carousel_2 array={masks}/>
                            </>
                                }       
                            </>
                        )}
                        </Fade>
                    </Row>
            
                    <Row className="shop-items mt-3">
                        <Row className="text-center mt-5">
                           <h6 className="mt-3">
                           Mobile cases
                           </h6>
                        </Row>
                        <Fade>
                        {loading ? (
                            <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                            <>
                            {
                            <>
                             <Carousel_2 array={mobiles}/>
                            </>
                                }       
                            </>
                        )}
                        </Fade>
                    </Row>
                    <Row className="shop-items">
                        <Row className="text-center mt-5">
                           <h6 className="mt-3">
                           Hats
                           </h6>
                        </Row>
                        <Fade>
                        {loading ? (
                            <h2>Loading...</h2>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                            <>
                            {
                            <>
                            <div className="d-flex justify-content-center">
                                <img src={Hat} className="hat"/>
                             </div>
                            </>
                                }       
                            </>
                        )}
                        </Fade>
                    </Row>   
            </Container>
        </>}
        <Footer/>
        </div>
      
    )
}

export default Shop