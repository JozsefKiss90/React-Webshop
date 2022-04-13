import { useState } from "react";

const [clicked, setClicked] = useState('');

  const handleClick = () => {
    clicked ? setClicked('') : setClicked('base-state');
  };

const [zoomed, setZoomed] = useState ('')

React.useEffect(() => {
  setTimeout(function() {
    setZoomed({backgroundsize:500})
}, 1000);
}, [0]);


useEffect(() => {
  setTimeout(function () {
    setStyle({ opacity: 1 });
  }, 3000);
}, []);

<Col lg={4} className="item-desc mt-5 mb-5">
<Row>
  <Col className="image-container">
  <Fade delay={100}>
    <img src={Image_1_1}/>
  </Fade>
  </Col>
  <Col className="image-container-1">
    <Fade delay={100}>
      <img src={Image_2}/>
    </Fade>
  </Col>
</Row>
<Row>
  <Col className="image-container mt-3">
   <Fade>
      <img src={Image_3}/>
    </Fade>
  </Col>
  <Col className="image-container-1 mt-3">
    <Fade>
        <img src={Image_4}/>
      </Fade>
  </Col>
</Row>

<Nav.Item className="list-icon" onClick={() => setOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </Nav.Item>


<Collapse in={open} timeout={200}>
  <Container fluid className="dropdown-container">
    <Row className="dropdown">
      <Col className="dropdown-sections"></Col>
      <Col className="dropdown-sections">
        <ul className="text-center dropdown-list">
          <li>
            HOME
          </li>
          <li>
            BEST SELLERS
          </li>
          <li>
            SHOP
          </li>
          <li>
            ABOUT US
          </li>
          <li>
            CONTANT US
          </li>
        </ul>
        
      </Col>
      <Col className="dropdown-sections"></Col>
    </Row>
  </Container>
</Collapse>