import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import logo from '../assets/Logo.jpg';
import CartContext from '../store/CartContext';
import CartDialog from '../pages/Home/components/CartSideBar/CartDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCtx = useContext(CartContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={logo} alt="Little Lemon Logo" />
        </Link>

        {/* Navigation Menu */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/menu" 
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                onClick={closeMenu}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Section - Cart and Mobile Menu */}
        <div className={styles.rightSection}>
          {/* Cart Button */}
          <button className={styles.cartButton} onClick={toggleCart}>
            <ShoppingCart size={20} />
            <span className={styles.cartText}>Your Cart</span>
            <span className={styles.cartBadge}>{cartCtx.totalItems || 0}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu} />
        )}
      </div>

      {/* Cart Dialog */}
      <CartDialog 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </header>
  );
};

export default Header;