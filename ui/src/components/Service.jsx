import React, { useState } from "react";
import "../styles/Service.css";
import AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from "react";
const GestureSpeechRecognition = () => {
  const [transcript, setTranscript] = useState(
    "Transcript will appear here..."
  );
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // Initialize AOS
  }, []);
  const [isRecording, setIsRecording] = useState(false); // Track recording state

  // 🎤 Start Speech Recognition
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setTranscript(speechText);

      // Send text to Flask backend
      fetch("http://localhost:5000/save-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: speechText }),
      });
    };

    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
    };

    recognition.start();
  };

  // 🎥 Toggle Video Recording
  const toggleVideoRecording = async () => {
    try {
      if (!isRecording) {
        // Start Recording
        const response = await fetch("http://localhost:5000/start-recording", {
          method: "POST",
        });
        const data = await response.json();
        if (data.error) {
          alert("Error: " + data.error);
        } else {
          setIsRecording(true);
          alert("Video Recording Started");
        }
      } else {
        // Stop Recording
        const response = await fetch("http://localhost:5000/stop-recording", {
          method: "POST",
        });
        const data = await response.json();
        setIsRecording(false);
        alert("Video Recording Stopped");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="service-container">
      <div className="service-wrapper" data-aos="fade-up">
        <h1>Sign Language & Speech Recognition</h1>

        <div className="speech-text">
          <button onClick={startSpeechRecognition}>🎤 Record Audio</button>
          <p>{transcript}</p>
        </div>
        <div className="divider"></div>
        <div className="video-toggle">
          <button onClick={toggleVideoRecording}>
            {isRecording
              ? "🛑 Stop Video Recording"
              : "📹 Start Video Recording"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestureSpeechRecognition;
