import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    const totalPrice = items.reduce((total, item) => {
        return parseFloat((total + (item.price * item.quantity)).toFixed(2));
    }, 0);
    
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    const addItem = (newItem) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id);
            
            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                const existingItem = updatedItems[existingItemIndex];
                
                updatedItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity + newItem.quantity
                };
                return updatedItems;
            } else {
                return [...prevItems, { ...newItem }];
            }
        });
    };

    const removeItem = (itemId) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    const updateItemQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(itemId);
            return;
        }

        setItems((prevItems) => {
            const itemIndex = prevItems.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return prevItems;

            const updatedItems = [...prevItems];
            updatedItems[itemIndex] = {
                ...prevItems[itemIndex],
                quantity: newQuantity
            };
            return updatedItems;
        });
    };

    const increaseItemQuantity = (itemId) => {
        setItems((prevItems) => {
            const itemIndex = prevItems.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return prevItems;

            const updatedItems = [...prevItems];
            const item = updatedItems[itemIndex];
            
            updatedItems[itemIndex] = {
                ...item,
                quantity: item.quantity + 1
            };
            return updatedItems;
        });
    };

    const decreaseItemQuantity = (itemId) => {
        setItems((prevItems) => {
            const itemIndex = prevItems.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return prevItems;

            const item = prevItems[itemIndex];
            
            if (item.quantity === 1) {
                return prevItems.filter(item => item.id !== itemId);
            } else {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = {
                    ...item,
                    quantity: item.quantity - 1
                };
                return updatedItems;
            }
        });
    };

    // 🔥 confirm تمت إزالة الـ 
    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('cartItems');
    };

    const getItemQuantity = (itemId) => {
        const item = items.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    };

    const isInCart = (itemId) => {
        return items.some(item => item.id === itemId);
    };

    const cartContextValue = {
        items,
        totalPrice, 
        totalItems, 
        addItem,
        removeItem,
        updateItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        clearCart,
        getItemQuantity,
        isInCart
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
