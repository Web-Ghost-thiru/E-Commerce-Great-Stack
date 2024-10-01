import React from 'react';
import './Popular.css';
import data_product from '../Assets/data';
import Item from '../Items/Item';
import Slider from "react-slick";

const Popular = () => {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <Slider {...settings} className="popular-item">
            {data_product.map((item, i) => (
                <Item 
                    key={i} 
                    id={item.id} 
                    name={item.name} 
                    image={item.image} 
                    new_price={item.new_price} 
                    old_price={item.old_price} 
                />
            ))}
        </Slider>
    </div>
  );
};

export default Popular;
