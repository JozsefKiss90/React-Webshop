import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container"
import Logo from "../images/logo4.png";
import { Navbar, Nav, Row, Col, Collapse, Offcanvas} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive'
import { useSelector} from 'react-redux'
import QueryNav from "./QueryNavbar";
import { Link } from "react-router-dom";

const NavComponent = () => {

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [newNav, setNewNav] = useState (false)
  const [sticky, setSticky] = useState({});

  React.useEffect(() => {
      window.addEventListener('scroll', stickNavbar);
      return () => window.removeEventListener('scroll', stickNavbar);
    }, []);
  
  React.useEffect(() => {
      window.addEventListener('scroll', scrollPos);
      return () => window.removeEventListener('scroll', scrollPos);
      }, []);
  
  React.useEffect(() => {
      window.addEventListener('scroll', newNavbar);
      return () => window.removeEventListener('scroll', newNavbar);
      }, []);

  const newNavbar = () => {
      if (window !== undefined) {
        let posHeight_2 = window.scrollY;
        posHeight_2 > 112 ? setNewNav(!newNav) : setNewNav(newNav)
      }
    };

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 150 ? setSticky({ position: "fixed", top: "0", marginTop:"0", transition: "top 1s"}) : setSticky({});
    }
  };
  const scrollPos = () => {
    if (window !== undefined) {
      let posHeight = window.scrollY;
      posHeight > 112 ? setScroll(posHeight) : setScroll(0)
    }
  };
 
  const navClass = newNav ? 'menu-2 show' : 'menu-2'

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(!show);
  const handleShow = () => setShow(!show);

return (
    
    <div>   
    
    <Navbar bg="light" className="menu-top" style={{overflowY:"hidden"}} >
      <Container fluid={+true}>
        <Row>
          <Nav className="nav-content">
            <Nav.Item className="list-icon" onClick={isMobile ? handleShow : () => setOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </Nav.Item>
          </Nav>
        </Row>
        <Row >
          <Nav className="nav-content">
            <Navbar.Brand>
              <Link to="/">
                <img src={Logo} alt="wut" className="logo"/>
              </Link>
            </Navbar.Brand>
          </Nav>
        </Row>
        <Row>
          <Nav className="nav-content">
            <Nav.Item className="bag-icon">
            <Link style={{color:'black'}} to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
            
                {cartItems.length>0 ? 
                  <div className="bag-qnty">
                  <p >
                  {cartItems.length}
                  </p>
              </div> :
              <>
              </>
              }
            </Link>
            </Nav.Item>
          </Nav>
        </Row>
    </Container> 
  </Navbar>
  <Container fluid={+true} >
      <Row className="black-bar"> 
        <p>
          Free Shipping Worldwide
        </p>
      </Row>
    </Container>
  <Navbar bg="light" fluid={+true}  className={navClass}>  
    <Container fluid={+true} >
      <Row>
          <Nav className="nav-content">
            <Nav.Item className="list-icon"onClick={isMobile ? handleShow : () => setOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </Nav.Item>
          </Nav>
        </Row> 
        <Row >
          <Nav className="nav-content">
            <Navbar.Brand>
              <Link to="/">
                  <img src={Logo} alt="wut" className="logo"/>
              </Link>
            </Navbar.Brand>
          </Nav>
        </Row>
        <Row>
          <Nav className="nav-content">
            <Nav.Item className="ms-auto bag-icon">
            <Link style={{color:'black'}} to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
            
                {cartItems.length>0 ? 
                  <div className="bag-qnty">
                  <p >
                  {cartItems.length}
                  </p>
              </div> :
              <>
              </>
              }
            </Link>
            </Nav.Item>
          </Nav>
        </Row>
    </Container>
  </Navbar>
  {isMobile && 
    <Offcanvas style={{maxWidth:"50%"}} show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title></Offcanvas.Title>
    </Offcanvas.Header>
      <Offcanvas.Body>
        <Col className="dropdown-sections">
            <ul className="text-center dropdown-list">
            <Link to="/">
                <li>
                  HOME
                </li>   
              </Link>
              <Link to="/bestsellers">
                <li>
                BEST SELLERS
                </li>   
              </Link>
              <Link to="/shop">
                <li>
                  SHOP
                </li>   
              </Link>
              <Link to="/about">
                <li>
                  ABOUT US
                </li>   
              </Link>
              <Link to="/contact">
                <li>
                  CONTACT US
                </li>   
              </Link>
            </ul>
          </Col>
        </Offcanvas.Body>
    </Offcanvas>
  }
  {isDesktopOrLaptop &&
  <Collapse in={open} timeout={300}>
      <Container fluid={+true}  className="dropdown-container" style={{top:`${112+scroll}`+"px"}}>
        <Row className="dropdown">
          <Col className="dropdown-sections"></Col>
          <Col className="dropdown-sections">
            <ul className="text-center dropdown-list">
              <Link to="/">
                <li>
                  HOME
                </li>   
              </Link>
              <Link to="/bestsellers">
                <li>
                BEST SELLERS
                </li>   
              </Link>
              <Link to="/shop">
                <li>
                  SHOP
                </li>   
              </Link>
              <Link to="/about">
                <li>
                  ABOUT US
                </li>   
              </Link>
              <Link to="/contact">
                <li>
                  CONTACT US
                </li>   
              </Link>
            </ul>       
          </Col>
          <Col className="dropdown-sections"></Col>
        </Row>
      </Container>
    </Collapse>}
    </div>
    )
}

export default NavComponent