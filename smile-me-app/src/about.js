import React from "react";
import './App.css';
  
const About = () => {
  return (
    <div class = "about_title">
      <h1>
        Who Are We?
      </h1>

      {/* Insert Picture Here? */}
      <div class = "about_description">
        We are a Machine Learning team in Northwestern's IEEE Program. <br/><br/>
        SmileMe is a facial emotion recognition app that allows users
         to see how well they are able to express their mood their face. 
         A game mode is provided where users try to match as many of the facial emotions that are 
         displayed on the screen in a given amount of time.
      </div>
    </div>
  );
};
  
export default About;