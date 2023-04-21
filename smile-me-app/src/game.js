import React, { useState , useRef} from "react";
import "./App.css";
import Pytorch_model_tfjs from "./Pytorch_model_tfjs";

const targetEmotions = ["happy", "sad", "fearful"];
const emotionEmojis = {
  happy: "😃",
  sad: "😢",
  fearful: "😱",
};
const canvasWidth = 640;
const canvasHeight = 480;
const Game = () => {
  const [score, setScore] = useState(0); // score is the number of correct emotions detected
  // setScore is a function that updates the score state that is written by React
  const [targetIndex, setTargetIndex] = useState(0);
  const[isDelaying,setIsDelaying] = useState(false);
  const [prevEmotion, setPrevEmotion] = useState("");
  const canvasRef = useRef();

  const onEmotionDetected = (emotion, image) => {
    if (emotion === targetEmotions[targetIndex] && !isDelaying) {
      setIsDelaying(true);
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      setPrevEmotion(targetEmotions[targetIndex]);
      setTimeout(() => {
        setScore((prevScore) => prevScore + 1); // Use functional form
        setTargetIndex(Math.floor(Math.random()*targetEmotions.length)); // Use functional form
        setIsDelaying(false);
      }, 500);
    }
  };

  return (
    <div className="game_title">
        <h2>
        Game
        </h2>
        <div class = "instruct">
            Instructions: Try to match the mood of the target emotion using SmileMe! Each correct mood match is one point.
        </div>
      <h2>
        <br></br>
        Target Emotion: {targetEmotions[targetIndex]}{" "}
        {emotionEmojis[targetEmotions[targetIndex]]}
      </h2>
      <h2>Score: {score}</h2>
      <div className="images">
        <Pytorch_model_tfjs onEmotionDetected={onEmotionDetected} />
        <h2>This was your {prevEmotion} face!</h2>
        <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef}/>
      </div>
    </div>
  );
};

export default Game;