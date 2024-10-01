import React, { useContext, useEffect, useState } from "react";
import "./CSS/OrderPage.css";
import { ShopContext } from "../Context/ShopContext";

const OrderPage = () => {
  const { user, all_product } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const userOrders =
        JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
      setOrders(userOrders);
    }
  }, [user]);

  return (
    <div className="order-page">
      <h1>Your Orders</h1>
      <hr className="main-line" />
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="order">
            <h2>Order placed on: {order.date}</h2>
            <div className="order-items">
              {
              Object.keys(order.items).map((itemId) => {
                const orderItem = order.items[itemId];
                if (orderItem && orderItem.quantity > 0) {
                  const product = all_product.find(
                    (p) => p.id === parseInt(itemId)
                  );
                  if (product) {
                    return (
                      <div key={itemId} className="order-item">
                        <img src={product.image} alt={product.name} />
                        <p>{product.name}</p>
                        <p>Quantity: {orderItem.quantity}</p>
                        <p>Size: {orderItem.size}</p>
                        <p>Total: ${product.new_price * orderItem.quantity}</p>
                      </div>
                    );
                  }
                }
                return null;
              })}
            </div>
          </div>
        ))
      ) : (
        <p className="no-order-found">No orders found. Place an order to see it here.</p>
      )}
    </div>
  );
};

export default OrderPage;
