import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SpecialMealsSection.module.css";
import dbData from "../../../../db.json"

const SpecialsMealsSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dbData.specialMeals || []);
  }, []);

  return (
    <section className={styles.specialsSection}>
      <div className={styles.container}>
        <div className={styles.specialsHeader}>
          <h1 className={styles.specialsTitle}>This week specials!</h1>
          <Link to="/menu" className={styles.viewMenuButton}>
            View Menu
          </Link>
        </div>

        <ul className={styles.mealsGrid}>
          {data.map((meal) => (
            <li key={meal.id} className={styles.mealCard}>
              <img 
                src={meal.img} 
                alt={meal.title} 
                className={styles.mealImage} 
              />
              <div className={styles.mealContent}>
                <div className={styles.mealHeader}>
                  <h3 className={styles.mealTitle}>{meal.title}</h3>
                  <p className={styles.mealPrice}>${meal.price}</p>
                </div>
                <p className={styles.mealDescription}>{meal.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SpecialsMealsSection;