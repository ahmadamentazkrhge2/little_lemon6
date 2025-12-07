import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Card from "../../pages/Home/components/Testimonials/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./SimpleSlider.module.css";
import dbData from "../../db.json"

export default function SimpleSlider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // أصبح false لأن البيانات فورية

  useEffect(() => {
    setData(dbData.testimonials || []);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
        }
      }
    ]
  };
  
  return (
    <div className={styles.container}>
      {loading ? (
        <div style={{ textAlign: "center", color: "green" }}>Loading ...</div>
      ) : (
        <Slider {...settings}>
          {data.map((testimonial) => (
            <div key={testimonial.id}>
              <Card testimonial={testimonial} />
            </div>
          ))}
        </Slider>
      )}
      
      {data.length === 0 && !loading && (
        <div style={{ textAlign: "center", color: "orange" }}>
        No opinions
        </div>
      )}
    </div>
  );
}