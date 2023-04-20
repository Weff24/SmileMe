import React from "react";
import './App.css';
  
const Contact = () => {
  return (
    <div class = "about_title">
      <h1>
        Contact Us
      </h1>

      {/* Insert Picture Here? */}
      <div class = "about_description">
        Meet the Team:
        <h5 className="header-contributors">
           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Jeffrey Wu</a> <br/>
           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Andy Dong</a><br/>
           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Frank Gu</a><br/>
           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Mitch Weng</a><br/>
           <a href="https://www.linkedin.com/in/isaacsun1/">Isaac Sun</a><br/>
           <a href="https://www.linkedin.com/in/minseo-kim-b84986215/">Minseo Kim</a><br/>
           <a href="https://www.linkedin.com/in/shaopeng-frank-gu-73b369221/">Tina Chen</a>
         </h5>
      </div>
    </div>
  );
};
  
export default Contact;