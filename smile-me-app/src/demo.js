import React from "react";
import './App.css';
import Pytorch_model_tfjs from "./Pytorch_model_tfjs";
  
const Demo = () => {
  return (
    <div class = "about_title">
      <h2>
        Demo
      </h2>

      <Pytorch_model_tfjs/>

      {/* Maybe a Section on How It was Developed? */}
      
    </div>
  );
};
  
export default Demo;