import React from "react";
import NavComponent from "../Components/Navbar"
import Footer from "../Components/Footer"
import Container from "react-bootstrap/Container"
import {Row, Col, ListGroup} from 'react-bootstrap';
import { useNavigate} from "react-router-dom"
const Success = () => {

    let navigate = useNavigate();
    
    function handleReturn() {
        navigate({
            pathname: '/',
            search: '/',
            });
    }  

    return(
        <div> 
            <NavComponent/>
                <Container style={{height:"20rem"}} className="d-flex align-items-center justify-content-center">
                   <div className="mb-5">
                    <Row className="py-1">
                            <h2 className="text-center">
                            Thank you for your order!
                            </h2>
                        </Row>
                        <Row className="py-1">
                            <h5 className="text-center">
                            We are currently processing your order and will send you a confirmation email shortly.
                            </h5>
                        </Row>
                        <Row className="py-1">
                            <div className="d-flex justify-content-center" >
                                <button  type="button" className="btn-rounded-7" onClick={handleReturn}>
                                    Go back to shop
                                </button> 
                            </div>
                        </Row>
                   </div>
                </Container>
            <Footer/>
        </div>    
    )
}

export default Success