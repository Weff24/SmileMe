import {Tensor, InferenceSession} from 'onnxruntime-web';
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import './Pytorch_model_onnx.css'
import { canvasToTensor } from './utils';

const Pytorch_model_onnx = () => {
    const image_size = 128;
    const webcamRef = useRef(null);
    const videoConstraints = {
        facingMode: "user"
    };
    
    const initialImg = new Image();
    initialImg.width = image_size;
    initialImg.height = image_size;
    initialImg.style = {display: "none"};
    const [imgSrc, setImgSrc] = useState('');
    const canvas = useRef();
    const [moodPrediction, setMoodPrediction] = useState("");

    let inferenceSession;
    const loadModel = async () => {
        // new InferenceSession({backendHint: 'webgl'}) for GPU use
        try {
            inferenceSession = await InferenceSession.create("./pytorch_model.onnx");
        } catch (error) {
            console.log("YEP ITS HHERE")
            console.log(error);
        }
    };

    const runModel = async () => {
        const newImg = new Image();
        const newImgSrc = webcamRef.current.getScreenshot();
        setImgSrc(newImgSrc);
        newImg.src = newImgSrc;
        newImg.width = image_size;
        newImg.height = image_size;
        const ctx = canvas.current.getContext("2d");
		canvas.current.width = image_size;
		canvas.current.height = image_size;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(newImg, 0, 0, image_size, image_size);
        const onnxTensor = await canvasToTensor("srcCanvas");
        const prediction = await inferenceSession.run([onnxTensor]);
        setMoodPrediction(prediction);
    }

    useLayoutEffect(() => {
		const init = async () => {
			await loadModel();
			await runModel();
		};
		init();
	}, []);

    return <div className='model_container'>
        <Webcam 
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={true}
        />;
        <img src={imgSrc} width={image_size} height={image_size} style={{display:"none"}}/>
        <canvas id='srcCanvas' ref={canvas} width={image_size} height={image_size} style={ {display: "none"} }/>
        <h3 className='moodPrediction'>Mood: {moodPrediction}</h3>
    </div>
}

export default Pytorch_model_onnx;