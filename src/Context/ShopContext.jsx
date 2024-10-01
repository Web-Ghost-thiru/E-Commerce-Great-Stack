import React, { createContext, useState, useEffect , useCallback } from 'react';
import all_product from '../Components/Assets/all_product';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [menu, setMenu] = useState("shop");
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlist, setWishlist] = useState([]);
    const [logined, setIsLogined] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const savedCart = localStorage.getItem(`cartItems_${user.email}`);
            const savedWishlist = localStorage.getItem(`wishlist_${user.email}`);
    
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            } else {
                setCartItems(getDefaultCart());
            }
    
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            } else {
                setWishlist([]);
            }
    
            const savedTemporaryCart = localStorage.getItem('temporaryCart');
            if (savedTemporaryCart) {
                const temporaryCart = JSON.parse(savedTemporaryCart);
                setCartItems(prevCart => {
                    const updatedCart = { ...prevCart };
    
                    for (const item in temporaryCart) {
                        if (temporaryCart[item].quantity > 0) {
                            updatedCart[item] = {
                                quantity: (updatedCart[item]?.quantity || 0) + temporaryCart[item].quantity,
                                size: temporaryCart[item].size || updatedCart[item]?.size
                            };
                        }
                    }
    
                    return updatedCart;
                });
    
                localStorage.setItem(`cartItems_${user.email}`, JSON.stringify(cartItems));
                localStorage.removeItem('temporaryCart');
            }
        } else {
            const savedTemporaryCart = localStorage.getItem('temporaryCart');
            if (savedTemporaryCart) {
                setCartItems(JSON.parse(savedTemporaryCart));
            } else {
                setCartItems(getDefaultCart());
            }
        }
    }, [user]);
    

    useEffect(() => {
        if (user) {
            localStorage.setItem(`cartItems_${user.email}`, JSON.stringify(cartItems));
            localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlist));
        } else {
            localStorage.setItem('temporaryCart', JSON.stringify(cartItems));
        }
    }, [cartItems, wishlist, user]);

    const addToCart = useCallback((productId, size) => {
        setCartItems(prevItems => ({
            ...prevItems,
            [productId]: {
                quantity: (prevItems[productId]?.quantity || 0) + 1,
                size: size || prevItems[productId]?.size || "M"
            }
        }));
        
        toast.success('Added to Cart', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, []);
    
    const removeFromCart = useCallback((itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: Math.max((prev[itemId]?.quantity || 1) - 1, 0)
        }));
    }, []);

    const toggleWishlist = (itemId) => {
        setWishlist(prevWishlist => {
            const isItemInWishlist = prevWishlist.includes(itemId);
            if (isItemInWishlist) {
                return prevWishlist.filter(id => id !== itemId) ;
            } else {
                return [...prevWishlist, itemId];
            }
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const cartItem = cartItems[item];
            if (cartItem?.quantity > 0) {
                let itemInfo = all_product.find(product => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItem.quantity;
                }
            }
        }
        return totalAmount;
    };
    

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item]?.quantity > 0) {
                totalItem += cartItems[item].quantity;
            }
        }
        return totalItem;
    };
    

    const signUpUser = (newUser) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === newUser.email);

        if (!existingUser) {
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            toast.success('Registration Successful', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/');
        } else {
            toast.error('User already Exists!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const contextValue = {
        all_product,
        getTotalCartAmount,
        getTotalCartItems,
        cartItems,
        addToCart,
        removeFromCart,
        wishlist,
        toggleWishlist,
        setUser,
        signUpUser,
        setCartItems,
        getDefaultCart,
        setWishlist,
        user,
        menu,
        setMenu,
        logined,
        setIsLogined
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
