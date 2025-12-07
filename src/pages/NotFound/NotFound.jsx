import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <section className={styles.notFoundSection}>
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundContent}>
          <div className={styles.notFoundIllustration}></div>
          <h1 className={styles.notFoundNumber}>404</h1>
          <h2 className={styles.notFoundTitle}>Page Not Found</h2>
          <p className={styles.notFoundMessage}>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className={styles.notFoundButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;