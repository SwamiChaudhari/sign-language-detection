import React, { useEffect, useState, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import '../styles/SignLanguageQuiz.css';
import "aos/dist/aos.css";
import AOS from "aos";


const SignLanguageQuiz = () => {

  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // Initialize AOS
  }, []);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);
  const URL = "https://teachablemachine.withgoogle.com/models/Ka3PafD6_/"; // Replace with your model URL

  const words = ["Hello", "Thank you", "Please", "Yes", "No"]; // Add more words as needed

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const toggleWebcam = async () => {
    if (isWebcamActive) {
      const stream = webcamRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      webcamRef.current.srcObject = null;
      setIsWebcamActive(false);
    } else {
      if (webcamRef.current) {
        webcamRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setIsWebcamActive(true);
      }
    }
  };

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setFeedback("");
  };

  const predictGesture = async () => {
    if (model && webcamRef.current && isWebcamActive) {
      const webcamCanvas = document.createElement("canvas");
      const video = webcamRef.current;
      const ctx = webcamCanvas.getContext("2d");
      webcamCanvas.width = video.videoWidth;
      webcamCanvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);

      const predictions = await model.predict(webcamCanvas);
      setPredictions(predictions);

      const highestPrediction = predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );

      if (highestPrediction.className.toLowerCase() === currentWord.toLowerCase()) {
        setFeedback("Correct! 🎉");
      } else {
        setFeedback(`Try again! Detected: ${highestPrediction.className}`);
      }
    }
  };

  return (
    <div className="quiz-container" data-aos="zoom-in-up">
      <h2>Sign Language Quiz</h2>
      <div className="video-container">
        <video ref={webcamRef} autoPlay playsInline width="300" height="300"></video>
      </div>
      <div className="controls">
        <button className="sign-button" onClick={toggleWebcam}>
          {isWebcamActive ? "Stop Webcam" : "Start Webcam"}
        </button>
        <button className="sign-button" onClick={getRandomWord}>
          Show Random Word
        </button>
        <button className="sign-button" onClick={predictGesture} disabled={!isWebcamActive || !currentWord}>
          Check Sign
        </button>
      </div>
      {currentWord && <h3>Show the sign for: {currentWord}</h3>}
      {feedback && <p className="feedback">{feedback}</p>}
      <div ref={labelContainerRef} className="label-container">
        {predictions.map((p, i) => (
          <p key={i}>
            {p.className}: {Math.round(p.probability * 100)}%
          </p>
        ))}
      </div>
    </div>
  );
};

export default SignLanguageQuiz;
