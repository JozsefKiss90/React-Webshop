import React from "react";
import Container from "react-bootstrap/Container"
import Logo from "../images/logo4.png";
import { Navbar, Nav, Row, Col, Collapse} from 'react-bootstrap';


const CheckoutNav = () => {

return (
    <div>   
    <Navbar bg="light" className="menu-3">
        <Container fluid className="d-flex justify-content-center">
            <Nav className="nav-content">
                    <Navbar.Brand>
                        <img src={Logo} alt="wut" className="logo"/>
                    </Navbar.Brand>
                </Nav>
        </Container> 
    </Navbar>
    </div>
    )
}

export default CheckoutNav