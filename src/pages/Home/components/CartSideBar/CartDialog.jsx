import React, { useContext, useEffect, useState } from 'react';
import { 
  X, Trash2, Plus, Minus, CheckCircle, AlertCircle, 
  CreditCard, Shield, Package, ShoppingBag, Clock, 
  ChevronRight, Star, ShieldCheck, Truck, Lock, Check
} from 'lucide-react';
import styles from './CartDialog.module.css';
import CartContext from '../../../../store/CartContext';

const CartDialog = ({ isOpen, onClose }) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState(null);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [ordersHistory, setOrdersHistory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const savedOrders = JSON.parse(localStorage.getItem('littleLemonOrders') || '[]');
      setOrdersHistory(savedOrders);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const generateOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'LL-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const calculateDeliveryTime = () => {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 45 * 60000);
    return deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendOrder = async () => {
    if (cartCtx.items.length === 0) {
      setOrderMessage({
        type: 'warning',
        title: 'Cart is Empty',
        userMessage: 'Your cart is empty. Add some delicious items first!'
      });
      return;
    }

    setIsSubmitting(true);
    setShowConfirmOrder(false);
    setOrderMessage(null);

    try {
      const orderId = generateOrderId();
      const tax = parseFloat((cartCtx.totalPrice * 0.1).toFixed(2));
      const grandTotal = parseFloat((cartCtx.totalPrice + tax).toFixed(2));
      const deliveryTime = calculateDeliveryTime();
      
      const orderData = {
        id: orderId,
        items: cartCtx.items.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: item.quantity,
          img: item.img
        })),
        subtotal: cartCtx.totalPrice,
        tax: tax,
        total: grandTotal,
        orderDate: new Date().toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'confirmed',
        estimatedDelivery: deliveryTime,
        paymentMethod: 'Credit Card'
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('littleLemonOrders') || '[]');
      existingOrders.unshift(orderData);
      localStorage.setItem('littleLemonOrders', JSON.stringify(existingOrders));
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      setOrdersHistory(existingOrders);

      setOrderMessage({
        type: 'success',
        title: 'Order Confirmed! 🎉',
        userMessage: `Your order has been successfully placed.`,
        orderId: orderId,
        deliveryTime: deliveryTime,
        total: grandTotal
      });
      
      setTimeout(() => {
        cartCtx.clearCart();
      }, 500);
      
      setTimeout(() => {
        onClose();
        setOrderMessage(null);
      }, 8000);

    } catch (error) {
      console.error('Unexpected error:', error);
      setOrderMessage({
        type: 'error',
        title: 'Order Failed',
        userMessage: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderClick = () => {
    setShowConfirmOrder(true);
  };

  const safeTotalPrice = typeof cartCtx.totalPrice === 'number' ? cartCtx.totalPrice : 0;
  const tax = parseFloat((safeTotalPrice * 0.1).toFixed(2));
  const grandTotal = parseFloat((safeTotalPrice + tax).toFixed(2));

  return (
    <>
      {/* Success Overlay */}
      {orderMessage && orderMessage.type === 'success' && (
        <div className={styles.successOverlay}>
          <div className={styles.successCard}>
            <div className={styles.successIconContainer}>
              <div className={styles.successIconCircle}>
                <CheckCircle size={48} />
              </div>
            </div>
            
            <div className={styles.successContent}>
              <h2 className={styles.successTitle}>{orderMessage.title}</h2>
              <p className={styles.successSubtitle}>
                Thank you for ordering from Little Lemon!
              </p>
              
              <div className={styles.orderDetailsCard}>
                <div className={styles.orderDetailRow}>
                  <span className={styles.detailLabel}>Order Number</span>
                  <span className={styles.detailValue}>#{orderMessage.orderId}</span>
                </div>
                <div className={styles.orderDetailRow}>
                  <span className={styles.detailLabel}>Estimated Delivery</span>
                  <span className={styles.detailValue}>
                    <Clock size={14} />
                    {orderMessage.deliveryTime}
                  </span>
                </div>
                <div className={styles.orderDetailRow}>
                  <span className={styles.detailLabel}>Total Amount</span>
                  <span className={styles.detailValueHighlight}>
                    ${orderMessage.total?.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className={styles.successFeatures}>
                <div className={styles.feature}>
                  <ShieldCheck size={18} />
                  <span>Order protected</span>
                </div>
                <div className={styles.feature}>
                  <Truck size={18} />
                  <span>Free delivery</span>
                </div>
                <div className={styles.feature}>
                  <Lock size={18} />
                  <span>Secure payment</span>
                </div>
              </div>
              
              <button 
                className={styles.continueShoppingBtn}
                onClick={() => {
                  onClose();
                  setOrderMessage(null);
                }}
              >
                Continue Shopping
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dialog */}
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.dialogContainer} onClick={(e) => e.stopPropagation()}>
          <div className={styles.dialog}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <div className={styles.titleSection}>
                  <div className={styles.cartIconContainer}>
                    <ShoppingBag size={28} />
                    <span className={styles.cartBadge}>{cartCtx.totalItems}</span>
                  </div>
                  <div>
                    <h2 className={styles.title}>Your Shopping Cart</h2>
                    <p className={styles.subtitle}>
                      {cartCtx.items.length > 0 
                        ? `${cartCtx.totalItems} delicious items` 
                        : 'Your cart is waiting for delicious food'}
                    </p>
                  </div>
                </div>
                <button className={styles.closeButton} onClick={onClose}>
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
              {cartCtx.items.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <ShoppingBag size={64} />
                  </div>
                  <h3 className={styles.emptyTitle}>Your cart is empty</h3>
                  <p className={styles.emptyText}>
                    Add some mouth-watering dishes from our menu
                  </p>
                  <button className={styles.browseButton} onClick={onClose}>
                    Browse Our Menu
                    <ChevronRight size={18} />
                  </button>
                  
                  {/* Recent Orders */}
                  {ordersHistory.length > 0 && (
                    <div className={styles.recentOrdersSection}>
                      <h4 className={styles.recentOrdersTitle}>
                        <Clock size={18} />
                        Recent Orders
                      </h4>
                      <div className={styles.ordersGrid}>
                        {ordersHistory.slice(0, 3).map((order, index) => (
                          <div key={index} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                              <span className={styles.orderId}>#{order.id}</span>
                              <span className={styles.orderStatus}>
                                <div className={styles.statusDot}></div>
                                Delivered
                              </span>
                            </div>
                            <div className={styles.orderDate}>{order.orderDate}</div>
                            <div className={styles.orderTotal}>
                              ${order.total.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className={styles.cartItemsSection}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>Items in Cart</h3>
                      <button 
                        className={styles.clearAllButton}
                        onClick={cartCtx.clearCart}
                        disabled={isSubmitting}
                      >
                        <Trash2 size={16} />
                        Clear All
                      </button>
                    </div>
                    
                    <div className={styles.cartItems}>
                      {cartCtx.items.map((item) => {
                        const itemTotal = item.price * item.quantity;
                        return (
                          <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemImageWrapper}>
                              <img 
                                src={item.img || '/assets/default-food.jpg'} 
                                alt={item.title} 
                                className={styles.itemImage} 
                              />
                              <div className={styles.quantityBadge}>{item.quantity}</div>
                            </div>
                            
                            <div className={styles.itemInfo}>
                              <div className={styles.itemMain}>
                                <h4 className={styles.itemTitle}>{item.title}</h4>
                                <p className={styles.itemDesc}>
                                  {item.desc || 'Freshly prepared delicious meal'}
                                </p>
                                <div className={styles.itemPriceRow}>
                                  <span className={styles.unitPrice}>
                                    ${item.price.toFixed(2)} each
                                  </span>
                                  <span className={styles.itemTotalPrice}>
                                    ${itemTotal.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className={styles.itemControls}>
                                <div className={styles.quantitySelector}>
                                  <button 
                                    className={`${styles.quantityBtn} ${styles.decreaseBtn}`}
                                    onClick={() => cartCtx.decreaseItemQuantity(item.id)}
                                    disabled={isSubmitting || item.quantity <= 1}
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className={styles.quantityDisplay}>
                                    {item.quantity}
                                  </span>
                                  <button 
                                    className={`${styles.quantityBtn} ${styles.increaseBtn}`}
                                    onClick={() => cartCtx.increaseItemQuantity(item.id)}
                                    disabled={isSubmitting}
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                                
                                <button 
                                  className={styles.removeItemBtn}
                                  onClick={() => cartCtx.removeItem(item.id)}
                                  disabled={isSubmitting}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className={styles.orderSummaryCard}>
                    <h3 className={styles.summaryTitle}>Order Summary</h3>
                    
                    <div className={styles.summaryRows}>
                      <div className={styles.summaryRow}>
                        <span>Subtotal ({cartCtx.totalItems} items)</span>
                        <span>${safeTotalPrice.toFixed(2)}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Tax & Fees</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Delivery Fee</span>
                        <span className={styles.freeBadge}>FREE</span>
                      </div>
                      <div className={styles.summaryDivider}></div>
                      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                        <span>
                          <strong>Total Amount</strong>
                          <small>Including all taxes</small>
                        </span>
                        <span className={styles.grandTotal}>
                          ${grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Security Badge */}
                    <div className={styles.securityBadge}>
                      <ShieldCheck size={16} />
                      <span>Secure payment · 100% protected</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.continueShopping}
                      onClick={onClose}
                    >
                      Continue Shopping
                    </button>
                    <button 
                      className={styles.checkoutButton}
                      onClick={handleOrderClick}
                      disabled={isSubmitting}
                    >
                      <div className={styles.checkoutContent}>
                        <div>
                          <div className={styles.checkoutTitle}>Proceed to Checkout</div>
                          <div className={styles.checkoutSubtitle}>
                            ${grandTotal.toFixed(2)} • Secure payment
                          </div>
                        </div>
                        <CreditCard size={20} />
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Confirmation Modal */}
            {showConfirmOrder && (
              <div className={styles.confirmationOverlay}>
                <div className={styles.confirmationModal}>
                  <div className={styles.modalHeader}>
                    <CreditCard size={32} />
                    <h3>Confirm Your Order</h3>
                    <p>Review your order details before confirming</p>
                  </div>
                  
                  <div className={styles.modalContent}>
                    <div className={styles.orderReview}>
                      {cartCtx.items.map((item, index) => (
                        <div key={index} className={styles.orderItemReview}>
                          <div className={styles.reviewItemInfo}>
                            <span className={styles.reviewItemName}>
                              {item.quantity}x {item.title}
                            </span>
                            <span className={styles.reviewItemPrice}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.orderTotalReview}>
                      <div className={styles.totalRowReview}>
                        <span>Total</span>
                        <span className={styles.totalAmountReview}>
                          ${grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.modalActions}>
                      <button 
                        className={styles.modalCancel}
                        onClick={() => setShowConfirmOrder(false)}
                      >
                        Back to Cart
                      </button>
                      <button 
                        className={styles.modalConfirm}
                        onClick={sendOrder}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className={styles.spinner}></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock size={18} />
                            Confirm & Pay ${grandTotal.toFixed(2)}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDialog;