import './App.css';
import React from "react";
// import WebcamCapture from './WebcamCapture';
import Pytorch_model_onnx from './Pytorch_model_onnx';
import Pytorch_model_tfjs from './Pytorch_model_tfjs';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Demo from './demo';
import Game from './game';
import Main from './main';
import Contact from './contact';


function App() {
  return (
    <div className="App">
      <nav class = "navbar">
        <div class = "logo">
          <a href="/"><img src="./headshots/2.png"  width = "100px"/></a>
        </div>
        <ul class="nav-links">
            <div class="menu">
              <li><a href="/">Home</a></li> 
              <li><a href="demo.js">Demo</a></li>
              <li><a href="game.js">Game</a></li>      
              <li><a href="contact.js">Contact</a></li>
            </div>   
        </ul>
      </nav>

      <Router>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/demo.js' element={<Demo/>} />
          <Route path='/game.js' element={<Game/>} />
          <Route path='/contact.js' element={<Contact/>} />
        </Routes>
      </Router>
      

      <footer className="App-footer">
         <p>&copy; 2023 IEEE ML Team. All rights reserved.</p>
       </footer>
     </div>
  );
}

export default App;