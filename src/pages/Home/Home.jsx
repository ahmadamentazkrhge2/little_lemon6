import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import SpecialsMealsSection from "./components/SpecialMealsSection/SpecialMealsSection";
import Testimonials from "./components/Testimonials/Testimonials";
import ChefsSection from "./components/ChefsSection/ChefsSection";
const Home = () => {
  return (
 
     
      <main>
      <HeroSection />
      <SpecialsMealsSection />
      <Testimonials />
      <ChefsSection />
      </main>
 

  );
};

export default Home;
