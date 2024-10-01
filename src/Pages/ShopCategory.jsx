import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState('');
  const [sortedProducts, setSortedProducts] = useState([]);

  const sortProducts = (products, option) => {
    switch (option) {
      case 'low-high':
        return [...products].sort((a, b) => a.new_price - b.new_price);
      case 'high-low':
        return [...products].sort((a, b) => b.new_price - a.new_price);
      case 'a-z':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  useEffect(() => {
    setSortedProducts(sortProducts(all_product, sortOption));
  }, [all_product, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {sortedProducts.length} products
        </p>
        <div>
          <select className="shopcategory-sort" onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="low-high">Low-High</option>
            <option value="high-low">High-Low</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item) => {
          if (props.category === item.category) {
            return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          }
          return null;
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
