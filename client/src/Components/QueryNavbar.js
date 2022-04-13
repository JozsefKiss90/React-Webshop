import {React, useState} from "react";
import Container from "react-bootstrap/Container"
import Logo from "../images/logo4.png";
import { Navbar, Nav, Row, Col, Collapse, NavDropdown, Form, Offcanvas, Button, FormControl} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'

const QueryNav = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

return (
    <div>   
        <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas style={{maxWidth:"50%"}} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{maxWidth:"50%"}}>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
    )
}

export default QueryNav