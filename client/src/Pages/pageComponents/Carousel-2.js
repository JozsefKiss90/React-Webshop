import "./Carousel-2.css";
import {React, useState } from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {Row, Col} from 'react-bootstrap';

function Carousel_2(props) {


  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrows next" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
        </svg>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrows prev" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  }; 

  return (
    <div > 
      <Slider {...settings}>
        {props.array.map((img, idx) => (
          <div key={idx} className='d-flex justify-content-center flex-column'>
             <Link className="d-flex justify-content-center" to={`/item/${props.array[idx]._id}`}>
              <img src={img.img} alt={img} className='shop-image'/>
            </Link>
            <Row className="text-center">
                <p>
                    <strong>
                    {img.name}
                    </strong> <br/>
                    {img.price}  <br/>
                    In stock
                </p>
              </Row>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel_2;