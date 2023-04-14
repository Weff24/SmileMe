// import './App.css';
// import WebcamCapture from './WebcamCapture';
import Pytorch_model_onnx from './Pytorch_model_onnx';
import Pytorch_model_tfjs from './Pytorch_model_tfjs';

// function App() {
//   return (
//     <div className="App">

//       <header className="App-header">
//         <h1 className="title">IEEE ML Team</h1>
//         <h2 className="subtitle">Smile Me</h2>
//       </header>
      
//       <div className="content">
//         {/* <WebcamCapture/> */}
//         {/* <Pytorch_model_onnx/> */}
//         <Pytorch_model_tfjs/>
//       </div>

//       <footer className="App-footer">
//         <h5 className="header-contributors">
//           Contributors: 
//           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Jeffrey Wu</a>,
//           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Andy Dong</a>,
//           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Frank Gu</a>,
//           <a href="https://www.linkedin.com/in/mitch-weng-178724232/">Mitch Weng</a>,
//           <a href="https://www.linkedin.com/in/isaacsun1/">Isaac Sun</a>,
//           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Minseo Kim</a>,
//           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Tina Chen</a>
//         </h5>
//         <p>&copy; 2023 IEEE ML Team. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import WebcamCapture from './WebcamCapture';
import HappyPage from './HappyPage';
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
//           <WebcamCapture onEmotionDetected={handleEmotionDetected} />
//         )}

//         {challengeIndex === 1 && (
//           <HappyPage
//             isEmotionDetected={!!emotion}
//             emotion={emotion}
//             onNextChallenge={handleNextChallenge}
//           />
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


function FirstPage() {
  const [emotion, setEmotion] = useState('');

  function handleEmotionDetected(emotion) {
    setEmotion(emotion);
  }

  return (
    <div className="page">
      <h1>Page 1: Happy</h1>
      <WebcamCapture onEmotionDetected={handleEmotionDetected} />
      <Pytorch_model_tfjs currentEmotion={emotion} />
    </div>
  );
}

export default FirstPage;
  // export default App;