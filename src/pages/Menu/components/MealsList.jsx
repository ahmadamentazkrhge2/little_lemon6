import React, { useState, useEffect } from 'react'
import MealsItem from './MealsItem'
import styles from "./MealsList.module.css"
import MealDialog from './MealDialog'
import dbData from "../../../db.json" 

const MealsList = (props) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item);
    handleCloseDialog();
  };

  useEffect(() => {
    // تحميل البيانات مباشرة من db.json بناء على activeTab
    try {
      const category = props.activeTab.toLowerCase();
      
      // البيانات من db.json
      let categoryData = [];
      
      switch(category) {
        case 'meals':
          categoryData = dbData.meals || [];
          break;
        case 'desserts':
          categoryData = dbData.desserts || [];
          break;
        case 'drinks':
          categoryData = dbData.drinks || [];
          break;
        case 'specialmeals': // إذا كان هناك specialMeals
          categoryData = dbData.specialMeals || [];
          break;
        default:
          categoryData = [];
      }
      
      setMeals(categoryData);
      setError(null);
    } catch (err) {
      setError('خطأ في تحميل البيانات');
      console.error('Error:', err);
    }
  }, [props.activeTab])

  if (loading) {
    return <div className={styles.loading}>Loading meals...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{props.activeTab}</h1>
        
        {meals.length === 0 ? (
          <div className={styles.noData}>لا توجد عناصر في هذه الفئة</div>
        ) : (
          <ul className={styles.mealsList}>
            {meals.map((meal) => (
              <div key={meal.id} onClick={() => handleItemClick(meal)}>
                <MealsItem 
                  img={meal.img} 
                  title={meal.title} 
                  desc={meal.desc} 
                  price={meal.price}
                />
              </div>
            ))}
          </ul>
        )}

        <MealDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          item={selectedItem}
          onAddToCart={handleAddToCart}
        />
      </div>
    </section>
  )
}

export default MealsList