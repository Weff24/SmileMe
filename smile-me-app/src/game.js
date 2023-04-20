import React, { useState } from "react";
import "./App.css";
import Pytorch_model_tfjs from "./Pytorch_model_tfjs";

const targetEmotions = ["happy", "sad", "fearful"];
const emotionEmojis = {
  happy: "😃",
  sad: "😢",
  fearful: "😱",
};
const Game = () => {
  const [score, setScore] = useState(0); // score is the number of correct emotions detected
  // setScore is a function that updates the score state that is written by React
  const [targetIndex, setTargetIndex] = useState(0);
  const[isDelaying,setIsDelaying] = useState(false);

  const onEmotionDetected = (emotion) => {
    if (emotion === targetEmotions[targetIndex] && !isDelaying) {
      setIsDelaying(true);
      setTimeout(() => {
        setScore((prevScore) => prevScore + 1); // Use functional form
        setTargetIndex((prevTargetIndex) => (prevTargetIndex + 1) % targetEmotions.length); // Use functional form
        setIsDelaying(false);
      }, 500);
    }
  };

  return (
    <div className="content">
      <h2>
        Target emotion: {targetEmotions[targetIndex]}{" "}
        {emotionEmojis[targetEmotions[targetIndex]]}
      </h2>
      <h2>Score: {score}</h2>
      <Pytorch_model_tfjs onEmotionDetected={onEmotionDetected} />
    </div>
  );
};

export default Game;