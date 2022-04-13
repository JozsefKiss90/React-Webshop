import React from "react";
import NavComponent from "../Components/Navbar"
import Footer from "../Components/Footer"
import Container from "react-bootstrap/Container"
import {Row, Col, ListGroup} from 'react-bootstrap';
import { useNavigate} from "react-router-dom"
const Cancel = () => {

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
                <Container style={{height:"15rem"}} className="d-flex align-items-center justify-content-center">
                   <div>
                   <Row className="py-1">
                        <h2 className="text-center">
                            Payment cancelled
                        </h2>
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

export default Cancel