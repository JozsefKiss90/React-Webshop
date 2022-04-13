import React from "react";
import { useState } from "react";
import Fade from 'react-reveal/Fade';
import {Col} from 'react-bootstrap';

function ShopItem(props) {
    const [mouseEffect, setMouseEffect] = useState (false)
    function handleIn() {
        setMouseEffect(!mouseEffect)
      }
    
      function handleOut() {
        setMouseEffect(!mouseEffect)
      }
    return (
      <Col className="shop-items">
        <Fade>
            <img src={mouseEffect ? props.image : props.image2} onMouseEnter={handleIn} onMouseLeave={handleOut} className={props.className}/>
        </Fade>
      </Col>
    )
}

export default ShopItem