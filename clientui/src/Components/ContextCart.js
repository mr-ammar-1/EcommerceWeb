import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Items from "./Items";
import { CartContext } from "./Cart";
import { CartProvider, useCart } from "react-use-cart";
import { useState, useEffect} from "react";
import { Context } from "../context";
import axios from "axios";


const ContextCart = () => {
  const { item, clearCart, totalItem, totalAmount } = useContext(CartContext);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    addItem,
    emptyCart
  } = useCart();

  const totalPrice = items.reduce(
    (sum, item) => sum + parseInt(item.price) * parseInt(item.quantity),
    0
  );
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const handleCheckout=()=>{
   axios.post("http://localhost:8000/create-checkout-session",{
    items,
    userId:user._id
  }).then((res)=>{
    if(res.data.url){
      window.location.href=res.data.url

    }
  })
  .catch((err)=>{
      console.log(err.message)
  })
  }
  // if (item.length === 0) {
  //   return (
  //     <>
  //       <header>
  //         <div className="continue-shopping">
  //           <img src="./arrow.png" alt="arrow" className="arrow-icon" />
  //           <h3>continue shopping</h3>
  //         </div>

  //         {/* <div className="cart-icon">
  //           <img src="./cart.png" alt="cart" />
  //           <p>{totalItem}</p>
  //         </div> */}
  //       </header>

  //       <section className="main-cart-section">
  //         <h1>shopping Cart</h1>
  //         <p className="total-items">
  //           you have <span className="total-items-count">{totalItem} </span>{" "}
  //           items in shopping cart
  //         </p>
  //       </section>
  //     </>
  //   );
  // }

  return (
    <div className="cartWrapper">
      <header>
        <div className="continue-shopping">
          <img src="./images/arrow.png" alt="arrow" className="arrow-icon" />
          <h3>continue shopping</h3>
        </div>

        {/* <div className="cart-icon">
          <img src="./images/cart.png" alt="cart" />
          <p>{totalItem}</p>
        </div> */}
      </header>

      <section className="main-cart-section">
        <h1>shopping Cart</h1>
        <p className="total-items">
          you have <span className="total-items-count">{totalUniqueItems} </span> items
          in shopping cart
        </p>

        <div className="cart-items">
          <div className="cart-items-container">
            <Scrollbars>
              {items.map((curItem) => {
                return <Items key={curItem.id} {...curItem} />;
              })}
            </Scrollbars>
          </div>
        </div>

        <div className="card-total">
          <h3>
            Cart Total : <span>{
              totalPrice
            }$</span>
          </h3>
          <button onClick={()=>handleCheckout()}>checkout</button>
          <button className="clear-cart" onClick={emptyCart}>
            Clear Cart
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContextCart;
