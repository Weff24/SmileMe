import React from "react";
import './App.css';
import Pytorch_model_tfjs from "./Pytorch_model_tfjs";

const Demo = () => {

  const onEmotionDetected = () => {
  };  
  
  return (
    <div class = "about_title">
      <h2>
        Demo
      </h2>

      <Pytorch_model_tfjs onEmotionDetected={onEmotionDetected}/>
      
    </div>
  );
};
  
export default Demo;