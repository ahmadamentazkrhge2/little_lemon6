import React from 'react';
import styles from './MealsTab.module.css';

const MealsTab = (props) => {
  const { activeTab, setActiveTab } = props;

  const tabs = [
    { id: 'meals', label: 'Meals' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' }
  ];

  const handleTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Menu</h1>
        <ul className={styles.tabsList}>
          {tabs.map((tab) => (
            <li key={tab.id} className={styles.tabItem}>
              <button
                className={`${styles.tabButton} ${
                  activeTab === tab.label ? styles.active : ''
                }`}
                onClick={() => handleTabClick(tab.label)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MealsTab;