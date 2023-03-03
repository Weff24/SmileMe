import './App.css';
import WebcamCapture from './WebcamCapture';
import Pytorch_model from './Pytorch_model';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <h1 className="title">IEEE ML Team</h1>
        <h2 className="subtitle">Smile Me</h2>
      </header>
      
      <div className="content">
        {/* <WebcamCapture/> */}
        <Pytorch_model/>
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
