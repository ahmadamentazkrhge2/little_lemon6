import React from 'react';
import styles from "./HeroSection.module.css";
import img from "../../../../assets/hero-img.jpg";

const HeroSection = () => {
  const handleReserveTable = () => {

    console.log("Reserve table clicked");
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.hero}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Little Lemon</h1>
          <h2 className={styles.heroSubtitle}>Chicago</h2>
          <p className={styles.heroDescription}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes
            served with a modern twist.
          </p>
          {/* <button 
            className={styles.heroButton}
            onClick={handleReserveTable}
          >
            Reserve a Table
          </button> */}
        </div>
        <div className={styles.heroImage}>
          <img className={styles.img} src={img} alt="Delicious Mediterranean food at Little Lemon restaurant" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;