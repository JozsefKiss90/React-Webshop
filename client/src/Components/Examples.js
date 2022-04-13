import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import Fade from 'react-reveal/Fade';
import Container from "react-bootstrap/Container"
import {Row, Col} from 'react-bootstrap';
import { listPoduct } from "../actions/productActions";
import {Link} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

const Examples = () => {
    
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(()=>{
        dispatch(listPoduct())
    },[dispatch]) 

    function findBags(bags) {
        return bags.category == 'Shopping Bag';
      }

    function filterBags(bags) {
        return bags.name != 'No.1'
    }
 
    const bags = products.filter(findBags)
    const filteredBags = bags.filter(filterBags)
 
    return(
        <div>{
            isMobile && <>
                <Container fluid >
                    <Row className="example-row gx-5 d-flex flex-nowrap mt-2">
                        {loading ? (
                            <h2>Loading...</h2>
                        ) : error ? (
                            <h2>{error}</h2>
                        ) : (
                        <>
                        {bags.map((bag) => (
                            <Col key={bag._id} className="example-section px-4 mt-3">
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
                </Container>     
                </>
            }
        {isDesktopOrLaptop && <>
           <Container fluid>
           <Row sm={12} className="mt-5 px-5">
           {loading ? (
               <h2>Loading...</h2>
           ) : error ? (
               <h2>{error}</h2>
           ) : (
           <>
           {filteredBags.map((bag) => (
               <Col key={bag._id} className="example-section">
                   <Fade>
                       <Link to={`/item/${bag._id}`}>
                           <img src={bag.img}/> 
                       </Link>
                   </Fade>
               </Col>
               ))}       
               </>
           )}
           </Row>
       </Container>
       <Container fluid>
           <Row className="px-5">
            <Col className="example-title">
                <p>
                    Autumn Rhythm
                </p>
            </Col>
            <Col className="example-title">
                <p>
                    Convergence
                </p>
            </Col>
            <Col className="example-title">
                <p>
                    Mural
                </p>
            </Col>
           </Row>
            <Row className="px-5">
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
           <Row className="px-5">
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
        </>
        }
        </div>
    )
}

export default Examples