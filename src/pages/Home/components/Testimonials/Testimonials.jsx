import React from "react";
import SimpleSlider from "../../../../shared/SimpleSlider/SimpleSlider";
import styles from "./Testimonials.module.css";

const Testimonials = () => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.sectionTitle}>What People Say About Us</h1>
          <p className={styles.sectionSubtitle}>
            Discover why our customers love dining with us
          </p>
        </div>
        <div className={styles.sliderWrapper}>
          <SimpleSlider />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;