import React from "react";
import "../styles/About.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import SignLanguageQuiz from "./SignLanguageQuiz";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // Initialize AOS
  }, []);
  return (
    <div className="about-container">
      <div className="about-wrapper" data-aos="fade-up">
        <h3 className="about-heading">FUN ACTIVITIES 😄</h3>
        <p className="about-para">
          learning should be fun and encouraging and not depressing. It should
          be integrated with fun quizes.Integrating hand sign detection into
          quiz games offers an innovative and engaging approach to learning,
          making the experience both fun and educational. By utilizing hand
          gesture recognition technology, players can interact with the game
          through natural movements, enhancing both cognitive and motor skills.
          This method not only makes learning more interactive but also caters
          to diverse learning styles, fostering inclusivity and motivation among
          users.
        </p>
        <SignLanguageQuiz />
      </div>
    </div>
  );
};

export default About;
