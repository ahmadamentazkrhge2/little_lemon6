import React from 'react';
import styles from "./HeroSection.module.css"
const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Little Lemon</h1>
          <p className={styles.heroSubtitle}>
            Where Tradition Meets Modern Flavors
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;