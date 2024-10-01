import React, { useContext } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa"; 
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
  const { wishlist, toggleWishlist } = useContext(ShopContext);

  const isInWishlist = wishlist.includes(props.id);

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img 
          onClick={() => window.scrollTo(0, 0)}
          src={props.image}
          alt=""
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
        <div 
          className={`wishlist-icon ${isInWishlist ? 'in-wishlist' : ''}`} 
          onClick={() => toggleWishlist(props.id)}
        >
          <FaRegHeart  />
        </div>
      </div>
    </div>
  );
}

export default Item;
