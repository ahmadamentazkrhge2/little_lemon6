// MealsItem.js
import React from 'react'
import styles from "./MealsItem.module.css"
const MealsItem = (props) => {
  return (
    <li className={styles.mealItem}>
      <img src={props.img} alt="meals" className={styles.mealImage} />
      <div className={styles.mealContent}>
        <h1 className={styles.mealTitle}>{props.title}</h1>
        <p className={styles.mealPrice}>{props.price.toFixed(2)}$</p>
        <p className={styles.mealDesc}>{props.desc}</p>
        <button className={styles.mealButton}>view details</button>
      </div>
    </li>
  )
}

export default MealsItem