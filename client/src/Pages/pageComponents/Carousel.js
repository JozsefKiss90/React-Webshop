import "./Carousel.css";
import React from "react"; 
import { useState } from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';

function Carousel(props) {

    const [zoomed, setZoomed] = useState ({})
    const [fading_3, setFading_3] = useState (false)

    const [indexValue, setIndexValue] = useState({})

    React.useEffect(() => {
        setZoomed({backgroundSize:550})
      }, [0]);

    React.useEffect(() => {
        setFading_3(!fading_3)
       }, [0]); 

    const classes_3 = fading_3 ? 'slide' : 'activeSlide'
    const classes_4 = fading_3 ? 'zoomClass' : 'zoomClass hide'
    const [imageIndex, setImageIndex] = useState(0);

    React.useEffect(() => {
        setIndexValue(props.array[imageIndex])
       }, [imageIndex]);

    props.sendDataToParent(indexValue)

    const settings = {
    focusOnSelect: true,
    infinite: true, 
    lazyLoad: true,
    speed: 600,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    beforeChange: (current, next) => setImageIndex(next),
    };

    return (
    <div className="App">
      
        <Slider {...settings} style={{fading_3, zoomed}} className={classes_4}>
        {props.array.map((img, idx) => ( 
            <div key={img._id} className={[idx === imageIndex ? "slide activeSlide" : "slide"].join(' ')}>
            {idx === imageIndex ?
                <Link to={`/item/${props.array[idx]._id}`}>
                    <img src={img.img} alt={img}  />
                </Link> :
             <img src={img.img} alt={img} />
            }
            </div>
            ))}

        </Slider> 
    </div>
    );
}

export default Carousel;