import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import "../Pages/CSS/wishList.css"
import Item from '../Components/Items/Item';

const WishList = () => {
  const { all_product, wishlist } = useContext(ShopContext);

  const wishlistItems = all_product.filter(product => wishlist.includes(product.id));

  return (
    <div className='wishlist'>
      <h1>Your Wishlist</h1>
      <hr />
      <div className="wishlist-items">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })  
        ) : (
          <p className='wishlist-name'>Your wishlist is empty</p>
        )}
      </div>
    </div>
  );
}

export default WishList;
