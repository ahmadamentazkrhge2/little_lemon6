import React from "react";
import MealsTab from "./components/MealsTab";
import MealsList from "./components/MealsList";
import { useState  } from "react";
const Menu = () => {
  const [activeTab, setActiveTab] = useState('Meals')

  return(
     <div className="main-content container">
    <MealsTab activeTab={activeTab} setActiveTab={setActiveTab} />
    <MealsList activeTab={activeTab}/>
    
    
    </div>);
};

export default Menu;
