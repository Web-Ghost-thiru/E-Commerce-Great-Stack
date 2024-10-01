import React, { useContext } from 'react';
import './OrderSuccessful.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const OrderSuccessful = () => {
  const { setMenu } = useContext(ShopContext);
  
  return (
    <>
      <div className='container'>
        <div className='order-message'><h1>Order Placed Successfully!!!</h1></div>
      </div>
      <div className='home-container'>
        <Link to="/">
          <button onClick={() => setMenu("shop")} className='home-button'>
            Go to Home
          </button>
        </Link>
        <Link to="/orders">
          <button className='orders-button'>
            Go to Orders
          </button>
        </Link>
      </div>
    </>
  );
}

export default OrderSuccessful;
