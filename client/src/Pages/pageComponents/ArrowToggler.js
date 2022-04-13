import React from "react";
import { useState } from "react";
import Arrow from '../../svg/Arrow';

function ArrowToggler(props) {
    const [arrowPos, setArrowPos] = useState(false)
    const [boxHeight, setBoxHeight] = useState(false)

    function arrowToggle() { 
        setArrowPos(!arrowPos)
        setBoxHeight(!boxHeight)
      }
    
    const arrowUp = arrowPos ? 'arrow-path-1 moved' : 'arrow-path-1'
    const arrowDown = arrowPos ? 'arrow-path-2 moved' : 'arrow-path-2'
    const expand = boxHeight ? 'item-description expand' : 'item-description'

   return (
    <div style={props.style} className={expand} onClick={arrowToggle}>
        <div style={{textAlign: "center", lineHeight:"2.3rem"}}>
            {props.title}
        </div>
        <div className="item-arrow">
            <Arrow className={arrowUp} className2={arrowDown}/>
        </div>
    </div>
   )
}

export default ArrowToggler