import './App.css';
import React from "react";
// import WebcamCapture from './WebcamCapture';
import Pytorch_model_onnx from './Pytorch_model_onnx';
import Pytorch_model_tfjs from './Pytorch_model_tfjs';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './about';
import Game from './game';
import Main from './main';
import Contact from './contact';


function App() {
  return (
    <div className="App">

      <nav class = "navbar">
        <ul class="nav-links">
            <div class="menu">
              <li><a href="/">Demo</a></li> 
              <li><a href="about.js">About</a></li>
              <li><a href="game.js">Game</a></li>      
              <li><a href="contact.js">Contact</a></li>
            </div>   
        </ul>
      </nav>

      <header className="App-header">
        <h1 className="title"><a href="/">SmileMe</a></h1>
        <h2 className="subtitle">IEEE ML Team</h2>
      </header>

      <Router>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/about.js' element={<About/>} />
          <Route path='/game.js' element={<Game/>} />
          <Route path='/contact.js' element={<Contact/>} />
        </Routes>
      </Router>
      
      <div className="content">
        {/* <Pytorch_model_tfjs/> */}
      </div>

      <footer className="App-footer">
         <p>&copy; 2023 IEEE ML Team. All rights reserved.</p>
       </footer>
     </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import WebcamCapture from './WebcamCapture';
// import HappyPage from './HappyPage';
// import SadPage from './SadPage';
// import AngryPage from './AngryPage';
// import ExcitedPage from './ExcitedPage';
// import SurprisedPage from './SurprisedPage';
// import CalmPage from './CalmPage';
// import ProudPage from './ProudPage';

// function App() {
//   const [challengeIndex, setChallengeIndex] = useState(0);
//   const [emotion, setEmotion] = useState('');

//   function handleEmotionDetected(emotion) {
//     setEmotion(emotion);
//   }

//   function handleNextChallenge() {
//     setChallengeIndex(challengeIndex + 1);
//     setEmotion('');
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1 className="title">IEEE ML Team</h1>
//         <h2 className="subtitle">Smile Me</h2>
//       </header>

//       <div className="content">
//         {challengeIndex === 0 && (
//           // <WebcamCapture onEmotionDetected={handleEmotionDetected} />
//           <div>
//             <Pytorch_model_tfjs/>
//             <button onClick={handleNextChallenge}>Next Challenge</button>
//           </div>
//         )}

//         {challengeIndex === 1 && (
//           <div>
//             <h2>Sad Page</h2>
//             <p>Make your face look sad!</p>
//             {emotion === 'sad' && (
//               <div>
//                 <HappyPage
//                   isEmotionDetected={!!emotion}
//                   emotion={emotion}
//                   onNextChallenge={handleNextChallenge}
//                 />
//                 <button onClick={handleNextChallenge}>Next Challenge</button>
//               </div>
//             )}
//           </div>
//         )}

//         {challengeIndex === 2 && (
//           <div>
//             <h2>Sad Page</h2>
//             <p>Make your face look sad!</p>
//             {emotion === 'sad' && (
//               <button onClick={handleNextChallenge}>Next Challenge</button>
//             )}
//           </div>
//           // <SadPage
//           //   isEmotionDetected={!!emotion}
//           //   emotion={emotion}
//           //   onNextChallenge={handleNextChallenge}
//           // />
//         )}

//         {challengeIndex === 3 && (
//           <div>
//             <h2>Sad Page</h2>
//             <p>Make your face look sad!</p>
//             {emotion === 'sad' && (
//               <button onClick={handleNextChallenge}>Next Challenge</button>
//             )}
//           </div>
//           // <AngryPage
//           //   isEmotionDetected={!!emotion}
//           //   emotion={emotion}
//           //   onNextChallenge={handleNextChallenge}
//           // />
//         )}

//         {challengeIndex === 4 && (
//           <div>
//             <h2>Sad Page</h2>
//             <p>Make your face look sad!</p>
//             {emotion === 'sad' && (
//               <button onClick={handleNextChallenge}>Next Challenge</button>
//             )}
//           </div>
//           // <ExcitedPage
//           //   isEmotionDetected={!!emotion}
//           //   emotion={emotion}
//           //   onNextChallenge={handleNextChallenge}
//           // />
//         )}

//         {challengeIndex === 5 && (
//           <div>
//             <h2>Sad Page</h2>
//             <p>Make your face look sad!</p>
//             {emotion === 'sad' && (
//               <button onClick={handleNextChallenge}>Next Challenge</button>
//             )}
//           </div>
//           // <SurprisedPage
//           //   isEmotionDetected={!!emotion}
//           //   emotion={emotion}
//           //   onNextChallenge={handleNextChallenge}
//           // />
//         )}

//         {challengeIndex === 6 && (
//           <div>
//             <h2>Sad Page</h2>
//             <p>Make your face look sad!</p>
//             {emotion === 'sad' && (
//               <button onClick={handleNextChallenge}>Next Challenge</button>
//             )}
//           </div>
//           // <CalmPage
//           //   isEmotionDetected={!!emotion}
//           //   emotion={emotion}
//           //   onNextChallenge={handleNextChallenge}
//           // />
//         )}
//       </div>
//     </div>
//   );}
// export default App;






// function FirstPage() {
//   const [emotion, setEmotion] = useState('');

//   function handleEmotionDetected(emotion) {
//     setEmotion(emotion);
//   }

//   return (
//     <div className="page">
//       <h1>Page 1: Happy</h1>
//       <WebcamCapture onEmotionDetected={handleEmotionDetected} />
//       <Pytorch_model_tfjs currentEmotion={emotion} />
//     </div>
//   );
// }

// export default FirstPage;
