import "../styles/Hero.css";
import '../styles/Hero.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Hero = () => {

  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // Initialize AOS
  }, []);

  return (
    <section className="Hero-section">
      {/* <div className="element"></div> */}
      <div className="hero-container">
        <div className="text-container" data-aos="fade-up">
          <h1  >🖐️ Speak with Your Hands, Be Heard Instantly</h1>
          <p>
            Transform gestures into words with our AI-powered sign language
            detection. Break barriers, foster inclusivity, and communicate
            effortlessly—anytime, anywhere. 🚀
          </p>
        </div>
        <div className="image-container">
          <img src="/images/image copy.png" alt="hero image" data-aos="fade-up" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
