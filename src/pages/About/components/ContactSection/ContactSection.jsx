import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import styles from './ContactSection.module.css';
import restaurantImage from "../../../../assets/chefs1.jpg"


const ContactSection = () => {
 

  const handleViewMenu = () => {
    window.location.href = '/menu';
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageContainer}>
            <img src={restaurantImage} alt="Little Lemon Restaurant" className={styles.image} />
          </div>
          
          <div className={styles.info}>
            <h2 className={styles.title}>Visit Us</h2>
            
            <div className={styles.details}>
              <div className={styles.item}>
                <MapPin className={styles.icon} />
                <div>
                  <h3 className={styles.itemTitle}>Location</h3>
                  <p className={styles.itemText}>
                    123 Lemon Street, Chicago, IL 60601
                  </p>
                </div>
              </div>
              
              <div className={styles.item}>
                <Clock className={styles.icon} />
                <div>
                  <h3 className={styles.itemTitle}>Opening Hours</h3>
                  <p className={styles.itemText}>
                    <strong>Mon-Thu:</strong> 11:00 AM - 10:00 PM<br />
                    <strong>Fri-Sat:</strong> 11:00 AM - 11:00 PM<br />
                    <strong>Sunday:</strong> 12:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
              
              <div className={styles.item}>
                <Phone className={styles.icon} />
                <div>
                  <h3 className={styles.itemTitle}>Contact</h3>
                  <p className={styles.itemText}>
                    Phone: (312) 555-LEMON<br />
                    Email: hello@littlelemon.com
                  </p>
                </div>
              </div>
              
              <div className={styles.item}>
                <Mail className={styles.icon} />
                <div>
                  <h3 className={styles.itemTitle}>Reservations</h3>
                  <p className={styles.itemText}>
                    Call us or book online. For groups of 6+, please reserve 24 hours in advance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className={styles.buttons}>
              
              <button 
                className={styles.secondaryButton}
                onClick={handleViewMenu}
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;