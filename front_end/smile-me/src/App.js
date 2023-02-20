import React, { Component } from 'react';
//import logo from '../logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://github.com/Weff24/SmileMe"
            target="_blank"
            rel="noopener noreferrer"
          >
            IEEE SmileMe Project
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://github.com/Weff24/SmileMe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                </a>
                <h1>SmileMe</h1>
                <a
                  className="App-link"
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <u><b> Click here for live camera demo! </b></u> 
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
