import React, { useEffect } from 'react'
import { CartProvider, useCart } from "react-use-cart";

const CheckoutSuccess = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    addItem,
    emptyCart
  } = useCart();
  
  useEffect(() => {
    emptyCart()
  }, [])

  return (
    <div  >
      <h2>Checkout Success</h2>

    </div>
  )
}

export default CheckoutSuccess
