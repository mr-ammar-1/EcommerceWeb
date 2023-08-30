import React, { useContext } from "react";
import { CartContext } from "./Cart";
import img1 from "./minus.png";
import img2 from "./add.png";
import img3 from "./delete.png";
import { user_images } from "../apicall/data"
import { useCart } from "react-use-cart";

const Items = ({ id,name,description,price, quantity }) => {
  // const {  increment, decrement } = useContext(CartContext);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();
  return (
    <>
      <div className="items-info">
        <div className="product-img">
          <img src={`${user_images}${id}.jpg`} alt="iamge" />
        </div>

        <div className="title">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>

        <div className="add-minus-quantity">
          {/* <i className="fas fa-minus minus" onClick={() => decrement(id)}></i> */}
          <div onClick={() => updateItemQuantity(id, quantity - 1)} style={{
            width: '2rem',
            cursor: 'pointer'
          }}>
            <img style={{
              width: '100%',
              height: '100%',
            }} src={img1} alt="" />
          </div>
          
          <input type="text" placeholder={quantity} disabled />
          {/* <i className="fas fa-plus add" onClick={() => increment(id)}></i> */}
          <div onClick={() => updateItemQuantity(id, quantity + 1)} style={{
            width: '2rem',
            cursor: 'pointer'
          }}>
            <img style={{
              width: '100%',
              height: '100%',
            }} src={img2} alt="" />
          </div>
        </div>

        <div className="price">
          <h3>{price}$</h3>
        </div>

        <div className="remove-item">
        <div onClick={() => removeItem(id)} style={{
            width: '2rem',
            cursor: 'pointer'
          }}>
            <img style={{
              width: '100%',
              height: '100%',
            }} src={img3} alt="" />
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};

export default Items;
