import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart, user, getTotalCartItems, setCartItems, getDefaultCart, wishlist, setWishlist } = useContext(ShopContext);

    const totalCartItems = getTotalCartItems();
    function handleLogin(){
        toast.error('Please Login to Continue', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    function handleCheckout() {
        if (totalCartItems === 0) {

            toast.error('Cart is empty! Please add items before proceeding to checkout.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const currentOrder = {
            items: cartItems,
            totalAmount: getTotalCartAmount(),
            date: new Date().toLocaleString(),
        };
        const userOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
        const updatedOrders = [...userOrders, currentOrder];
        localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedOrders));

        toast.success('Order Placed Successfully!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        const updatedWishlist = wishlist.filter((wishlistItemId) => !cartItems[wishlistItemId]?.quantity);
        setWishlist(updatedWishlist);
        setCartItems(getDefaultCart());
    }

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Size</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {
                all_product.map((e) => {
                    const cartItem = cartItems[e.id];
                    if (cartItem?.quantity > 0) {
                        return (
                            <div key={e.id}>
                                <div className="cartitems-format cartitems-format-main">
                                    <Link to={`/product/${e.id}`}>
                                        <img className='carticon-product-icon' src={e.image} alt="" />
                                    </Link>
                                    <p>{e.name}</p>
                                    <p>${e.new_price}</p>
                                    <button className='cartitems-quantity'>{cartItem.quantity}</button>
                                    <p>{cartItem.size}</p>
                                    <p>${e.new_price * cartItem.quantity}</p>
                                    <img className='carticons-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })
            }
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    {
                        user ? (
                            totalCartItems > 0 ? (
                                <Link to='/orderplaced'>
                                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                                </Link>
                            ) : (
                                <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                            )
                        ) : (
                                <button onClick={handleLogin}>PROCEED TO CHECKOUT</button>
                            
                        )
                    }

                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;

