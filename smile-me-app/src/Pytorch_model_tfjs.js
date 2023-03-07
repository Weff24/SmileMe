import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
import './Pytorch_model_tfjs.css'
import { canvasToTensor } from './utils';

const Pytorch_model_tfjs = () => {
    tf.setBackend('webgl');
    const MODEL_URL = 'tf_tfjs_model/model.json';
    const image_size = 48;
    const videoRef = useRef(null);
    // const videoConstraints = {
    //     facingMode: "user",
    //     mirrored: true
    // };
    const moods = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"};
    
    // const initialImg = new Image();
    // initialImg.width = image_size;
    // initialImg.height = image_size;
    // initialImg.style = {display: "none"};
    // const [imgSrc, setImgSrc] = useState('');
    const canvasRef = useRef();
    const [moodPrediction, setMoodPrediction] = useState("");

    let model;
    const loadModel = async () => {
        model = await loadGraphModel('tf_saved_model_tfjs/model.json');
        console.log(model);
    };

    function argMax(array) {
        let maxIndex = -1;
        let maxValue = -1;
        for(let i = 0; i < array.length; i++) {
            if(array[i] > maxValue) {
                maxIndex = i;
                maxValue = array[i];
            }
        }
        return maxIndex;
      }

    const runModel = async () => {
        // const newImg = new Image();
        // const newImgSrc = webcamRef.current.getScreenshot();
        // setImgSrc(newImgSrc);
        // newImg.src = newImgSrc;
        // newImg.width = image_size;
        // newImg.height = image_size;
        // document.getElementById('srcImg').src = newImgSrc;
        const ctx = canvasRef.current.getContext("2d");
		canvasRef.current.width = image_size;
		canvasRef.current.height = image_size;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(videoRef.current, 0, 0, image_size, image_size);
        const prediction_tensor = await canvasToTensor("srcCanvas");
        console.log("HERE")
        console.log("Prediction tensor: " + prediction_tensor);
        const prediction = await model.execute(prediction_tensor);
        let prediction_data = await prediction.data();
        let prediction_mood = moods[argMax(prediction_data)]
        console.log("HERE")
        console.log("Prediction: " + prediction)
        console.log("Prediction data:" + prediction_data)
        console.log("argMax: " + argMax(prediction_data))
        console.log("mood: " + moods[argMax(prediction_data)])
        setMoodPrediction(prediction_mood);
        setTimeout(runModel, 100);
    }

    useLayoutEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				audio: false,
				video: {
					facingMode: "user"
				}
			})
			.then(stream => {
				videoRef.current.srcObject = stream;
				videoRef.current.onloadedmetadata = () => {
					videoRef.current.play();
				};
			});
	}, [videoRef]);

    useLayoutEffect(() => {
		const init = async () => {
			await loadModel();
			await runModel();
		};
		init();
	}, []);

    return <div className='model_container'>
        {/* <Webcam 
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={true}
        />; */}
        {/* <img id='srcImg' src={imgSrc} width={image_size} height={image_size} style={{display:"none"}}/> */}
        <video autoPlay playsInline ref={videoRef}/>
        <canvas id='srcCanvas' ref={canvasRef} width={image_size} height={image_size} style={{display:"none"}}/>
        <h3 className='moodPrediction'>Mood: {moodPrediction}</h3>
    </div>
}

export default Pytorch_model_tfjs;