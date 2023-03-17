import * as tf from '@tensorflow/tfjs';
import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import './Pytorch_model_tfjs.css'
import { canvasToTensor, argMax } from './utils';

const Pytorch_model_tfjs = () => {
    tf.setBackend('webgl');

    const moodModelInputSize = 48;
    const displayCanvasWidth = 640;
    const displayCanvasHeight = 480;
    
    const moods = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"};

    const videoRef = useRef(null);
    const hiddenCanvasRef = useRef();
    const displayCanvasRef = useRef();
    const [moodPrediction, setMoodPrediction] = useState();
    const [faces, setFaces] = useState();

    let moodModel;
    let faceDetector;
    const loadModel = async () => {
        moodModel = await loadGraphModel('tf_saved_model_tfjs/model.json');
        const faceModel = faceDetection.SupportedModels.MediaPipeFaceDetector;
        const detectorConfig = {
            runtime: 'tfjs',
        };
        faceDetector = await faceDetection.createDetector(faceModel, detectorConfig);
    };

    function drawVideos() {
        const ctx1 = hiddenCanvasRef.current.getContext("2d");
        // maybe delete these 2 lines later
		// hiddenCanvasRef.current.width = moodModelInputSize;
		// hiddenCanvasRef.current.height = moodModelInputSize;
		ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height);
        ctx1.drawImage(videoRef.current, 0, 0, moodModelInputSize, moodModelInputSize);

        const ctx2 = displayCanvasRef.current.getContext("2d");
        // maybe delete these 2 lines later
		// displayCanvasRef.current.width = displayCanvasWidth;
		// displayCanvasRef.current.height = displayCanvasHeight;
		ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
        ctx2.drawImage(videoRef.current, 0, 0, displayCanvasWidth, displayCanvasHeight);
    }

    const runModels = async () => {
        if(videoRef.current != null) {
            drawVideos();
            const prediction_tensor = canvasToTensor("hiddenCanvas");
            const prediction = await moodModel.execute(prediction_tensor);
            const prediction_data = await prediction.data();
            const prediction_mood = moods[argMax(prediction_data)]
            setMoodPrediction(prediction_mood);
            // hiddenCanvasRef.current.width = displayCanvasWidth;
            // hiddenCanvasRef.current.height = displayCanvasHeight;

            const estimationConfig = {flipHorizontal: true};
            const faces = await faceDetector.estimateFaces(displayCanvasRef.current, estimationConfig);
            setFaces(faces);
        }
        setTimeout(runModels, 100);
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
			await runModels();
		};
		init();
	}, []);

    useEffect(() => {
        if(faces != undefined && moodPrediction != undefined) {
            const ctx = displayCanvasRef.current.getContext("2d");
            ctx.beginPath();
            ctx.rect(
                faces[0]["box"]["xMin"], 
                faces[0]["box"]["yMin"],
                faces[0]["box"]["width"],
                faces[0]["box"]["height"]
            )
            ctx.stroke();
            ctx.font = "24px serif";
            const xpos = (faces[0]["box"]["xMin"] + faces[0]["box"]["width"]) / 2
            const ypos = faces[0]["box"]["yMax"] + 30;
            ctx.fillText(moodPrediction, xpos, ypos);
        }
    }, [faces, moodPrediction])

    return <div className='model_container'>
        <video autoPlay playsInline ref={videoRef}/>
        <canvas id='hiddenCanvas' className='hiddenCanvas' ref={hiddenCanvasRef} width={moodModelInputSize} height={moodModelInputSize}/>
        <canvas className='displayCanvas' ref={displayCanvasRef} width={displayCanvasWidth} height={displayCanvasHeight}/>
        <h3 className='moodPrediction'>Mood: {moodPrediction}</h3>
    </div>
}

export default Pytorch_model_tfjs;