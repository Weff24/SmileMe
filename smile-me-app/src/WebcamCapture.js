import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const videoConstraints = {
    facingMode: "user"
  };
  return <Webcam videoConstraints={videoConstraints} />;
}

export default WebcamCapture