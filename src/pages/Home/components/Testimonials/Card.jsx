import React from "react";
import styles from "./Card.module.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Card = ({ testimonial }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className={styles.rating}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className={styles.star} />
        ))}
        {hasHalfStar && <FaStarHalfAlt className={styles.star} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className={styles.star} />
        ))}
        <span className={styles.ratingNumber}>({rating})</span>
      </div>
    );
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <div className={styles.testimonialCard}>
      {renderStars(testimonial.rating)}
      <div className={styles.testimonialContent}>
        <p className={styles.comment}>"{testimonial.com}"</p>
      </div>
      <div className={styles.personInfo}>
        <div className={styles.imageContainer}>
          <img 
            src={testimonial.img} 
            alt={testimonial.person} 
            className={styles.personImage}
            onError={handleImageError}
          />
          <div className={styles.avatarFallback}>
            {testimonial.person.charAt(0)}
          </div>
        </div>
        <div className={styles.personDetails}>
          <h3 className={styles.personName}>{testimonial.person}</h3>
          <span className={styles.verified}>Verified Customer</span>
        </div>
      </div>
    </div>
  );
};

export default Card;