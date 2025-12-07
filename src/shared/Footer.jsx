import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import styles from "./Footer.module.css";
import footerLogo from "../assets/footer-logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer} style={{ marginTop: "auto" }}>
      <div className={`${styles.container} ${styles.footerContent}`}>
        <div className={styles.footerLogo}>
          <img src={footerLogo} alt="Little Lemon Logo" loading="lazy" />
        </div>
        
        <div className={styles.footerSection}>
          <p className={styles.title}>Sitemap</p>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <p className={styles.title}>Contact With Us</p>
          <ul className={styles.contactInfo}>
            <li>
              <a href="tel:(312) 593-2744">
                <FaPhoneAlt /> (312) 593-2744
              </a>
            </li>
            <li>
              <a href="mailto:customer@littlelemon.com">
                <FaEnvelope />
                customer@littlelemon.com
              </a>
            </li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <p className={styles.title}>Follow Us</p>
          <ul className={styles.socialLinks}>
            <li>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;