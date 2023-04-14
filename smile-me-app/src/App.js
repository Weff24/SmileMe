import './App.css';
import WebcamCapture from './WebcamCapture';
import Pytorch_model_onnx from './Pytorch_model_onnx';
import Pytorch_model_tfjs from './Pytorch_model_tfjs';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './about';
import Game from './game';
import Main from './main';


function App() {
  return (
    <div className="App">

      <nav class = "navbar">
        <ul class="nav-links">
                <div class="menu">
                  <li><a href="about.js">about</a></li>
                  <li><a href="game.js">game</a></li>      
                  <li><a href="contact.js">contact</a></li>
                </div>   
          </ul>

        </nav>

      <header className="App-header">
        <h1 className="title">IEEE ML Team</h1>
        <h2 className="subtitle">Smile Me</h2>
      </header>

      <Router>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/about.js' element={<About/>} />
          <Route path='/game.js' element={<Game/>} />
        </Routes>
      </Router>
      
      <div className="content">
        {/* <WebcamCapture/> */}
        {/* <Pytorch_model_onnx/> */}

        {/* <Pytorch_model_tfjs/> */}
      </div>

      <footer className="App-footer">
        <h5 className="header-contributors">
          Contributors: 
          <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Jeffrey Wu</a>,
          <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Andy Dong</a>,
          <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Frank Gu</a>,
          <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Mitch Weng</a>,
          <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Issac Sun</a>,
          <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Minseo Kim</a>,
          <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Tina Chen</a>
        </h5>
        <p>&copy; 2023 IEEE ML Team. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
