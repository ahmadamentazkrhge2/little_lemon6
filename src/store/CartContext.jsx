import React from "react";

const CartContext = React.createContext({
    items: [],
    totalPrice: 0,
    totalItems: 0,
    addItem: () => {},
    removeItem: () => {},
    updateItemQuantity: () => {},
    increaseItemQuantity: () => {},
    decreaseItemQuantity: () => {},
    clearCart: () => {},
    getItemQuantity: () => 0,
    isInCart: () => false
});

export default CartContext;