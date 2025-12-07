import React from 'react';
import { ChefHat } from 'lucide-react'; 
import styles from './StorySection.module.css';
import image from "../../../../assets/meal2.jpg"
const StorySection = () => {
  return (
    <section className={styles.storySection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <ChefHat size={48} className={styles.icon} />
            <h2 className={styles.title}>Our Story</h2>
            <p className={styles.text}>
              Founded in 1995 by brothers Mario and Adrian, Little Lemon began as a small family restaurant in Chicago. Inspired by our grandmother's recipes, we've grown into a beloved local destination.
            </p>
            <p className={styles.text}>
              Every dish tells a story - from the secret spice blends passed down generations to the modern twists our chefs add. We believe in food that warms the heart and creates memories.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.number}>28+</span>
                <span className={styles.label}>Years Serving</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.number}>50K+</span>
                <span className={styles.label}>Happy Customers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.number}>100+</span>
                <span className={styles.label}>Signature Dishes</span>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={image} alt="Little Lemon Founders" className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;