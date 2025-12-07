import React, { useState, useContext } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import styles from './MealDialog.module.css';
import CartContext from '../../../store/CartContext';

const MealDialog = ({ isOpen, onClose, item }) => {
  const [quantity, setQuantity] = useState(1);
  const cartCtx = useContext(CartContext);

  if (!isOpen || !item) return null;

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    cartCtx.addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.img,
      quantity: quantity 
    });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Add Item</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src={item.img} alt={item.title} className={styles.image} />
          </div>

          <div className={styles.details}>
            <h3 className={styles.mealTitle}>{item.title}</h3>
            <p className={styles.mealPrice}>${item.price.toFixed(2)}</p>
            
            <div className={styles.quantityRow}>
              <div className={styles.quantityBox}>
                <button 
                  onClick={decreaseQty} 
                  className={styles.qtyBtn}
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className={styles.qty}>{quantity}</span>
                <button onClick={increaseQty} className={styles.qtyBtn}>
                  <Plus size={14} />
                </button>
              </div>
              
              <div className={styles.totalSection}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalPrice}>${totalPrice}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                className={styles.addButton}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              
              <button 
                className={styles.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDialog;