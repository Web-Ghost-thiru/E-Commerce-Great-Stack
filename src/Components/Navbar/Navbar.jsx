import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { VscAccount } from "react-icons/vsc";
import withAuthModal from '../withAuthModal/withAuthModal';



const Navbar = ({ setIsLogined, openAuthModal }) => {
  const { user, getTotalCartItems, menu, setMenu } = useContext(ShopContext);
  const logined = !!user;
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLogined(true);
    }
  }, [setIsLogined]);

  const handleLogout = () => {
    setIsLogined(false);
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <Link to="/"> <img onClick={() => setMenu("shop")} src={logo} alt="logo" /></Link>
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
        <li onClick={() => setMenu("mens")}><Link to='/mens'>Men</Link>{menu === "mens" ? <hr /> : null}</li>
        <li onClick={() => setMenu("womens")}><Link to='/womens'>Women</Link>{menu === "womens" ? <hr /> : null}</li>
        <li onClick={() => setMenu("kids")}><Link to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : null}</li>
      </ul>
      <div className="nav-login-cart">
        {
          logined ? (
            <>
              <div 
                className='user-icon-container'
                onMouseEnter={() => setIsHovering(true)} 
                onMouseLeave={() => setIsHovering(false)}
              >
                <VscAccount className='user-icon' title={user.email} />
                {isHovering && (
                  <div className='dropdown'>
                    <ul className='dropdown-list'>
                      <li><Link to="/orders">Orders</Link></li>
                      <li><Link to="/wishlist">Wishlist</Link></li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  </div>
                )}
                <div>
                  <h3>{user.name}</h3>
                </div>
              </div>
            </>
          ) : (
            <button onClick={openAuthModal}>Login</button>
          )
        }
        <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

// export default Navbar;

export const WrapNavbar = withAuthModal(Navbar);