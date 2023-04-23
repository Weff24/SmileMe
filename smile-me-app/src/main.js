import React from "react";
import './App.css';
import Pytorch_model_tfjs from './Pytorch_model_tfjs';
  
const Main = () => {
  return (
    <div className="Content">
       <header className="App-header">
        <h1 className="title"><a href="/">SmileMe</a></h1>
        <h2 className="subtitle">IEEE ML Team</h2>
      </header>
      <div className = "content">
      <img src="IMG_0215.png" width= "600px" style={{"marginBottom": "30px", "border": "1px solid black"}}/>
      <h2>
       A Facial Emotion Recognition App
      </h2>
      <div class = "about_description">
        We are a Machine Learning team in Northwestern's IEEE Program. <br/><br/>
        SmileMe is a facial emotion recognition app that allows users
         to see how well they are able to express their mood their face. 
         A game mode is provided where users try to match as many of the facial emotions that are 
         displayed on the screen in a given amount of time.
      </div>

      <div class = "btn-group">
        <div class="demo_but">
          <a href="demo.js" class="btn btn-primary d-block" role="button"><button class="btn">Try the Demo</button></a>
        </div>
        <div class="game_but">
          <a href="game.js" class="btn btn-primary d-block" role="button"><button class="btn">Play Game</button></a>
        </div>
      </div>

      </div>

    </div>
  );
};
  
export default Main;