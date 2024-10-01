import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState("");

    const handleSizeClick = (size) => {
        setSelectedSize(size); 
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.warning('Please Select Size!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            addToCart(product.id, selectedSize);
        }
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-image-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <button 
                                key={size} 
                                className={`size ${selectedSize === size ? 'selected' : ''}`} 
                                onClick={() => handleSizeClick(size)}
                            >{size}</button>
                        ))}
                    </div>
                </div>
                <button onClick={handleAddToCart}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span>{product.category} , T-Shirt , Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags :</span>Modern , Latest</p>
            </div>
        </div>
    );
};

export default ProductDisplay;
