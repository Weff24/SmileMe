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



const Pytorch_model_tfjs = ({onEmotionDetected}) => {
    tf.setBackend('webgl');

    const moodModelInputSize = 48;
    const displayCanvasWidth = 640;
    const displayCanvasHeight = 480;
    
    const moods = {0: "angry", 1: "fearful", 2: "happy", 3: "neutral", 4: "sad", 5: "surprised"};

    const videoRef = useRef(null);
    const hiddenCanvasRef = useRef();
    const displayCanvasRef = useRef();
    const [moodPrediction, setMoodPrediction] = useState();
    const [face, setFace] = useState();

    let moodModel;
    let faceDetector;
    const loadModel = async () => {
        moodModel = await loadGraphModel('tfjs_combined_images_model_v5/model.json');
        const faceModel = faceDetection.SupportedModels.MediaPipeFaceDetector;
        const detectorConfig = {
            runtime: 'tfjs',
            maxFaces: 1
        };
        faceDetector = await faceDetection.createDetector(faceModel, detectorConfig);
    };

    const runModels = async () => {
        if(videoRef.current != null) {
            const ctx2 = displayCanvasRef.current.getContext("2d");
		    ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
            ctx2.translate(displayCanvasWidth, 0);
            ctx2.scale(-1,1);
            ctx2.drawImage(videoRef.current, 0, 0, displayCanvasWidth, displayCanvasHeight);
            ctx2.setTransform(1,0,0,1,0,0);
            const estimationConfig = {flipHorizontal: false};
            const face_ouput = await faceDetector.estimateFaces(displayCanvasRef.current, estimationConfig);
            setFace(face_ouput);
            if(face_ouput.length > 0) {
                const ctx1 = hiddenCanvasRef.current.getContext("2d");
                ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height);
                ctx1.drawImage(
                    displayCanvasRef.current, 
                    face_ouput[0]["box"]["xMin"], 
                    face_ouput[0]["box"]["yMin"],
                    face_ouput[0]["box"]["width"],
                    face_ouput[0]["box"]["height"], 
                    0, 
                    0, 
                    moodModelInputSize, 
                    moodModelInputSize
                );
                const prediction_tensor = canvasToTensor("hiddenCanvas");
                const prediction = await moodModel.execute(prediction_tensor);
                // console.log(prediction);
                const prediction_data = await prediction.data();
                console.log(prediction_data);
                const prediction_mood = moods[argMax(prediction_data)]
                setMoodPrediction(prediction_mood);
            }
            else {
                setMoodPrediction(null);
            }
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
        if(face != undefined && face.length > 0 &&  moodPrediction != undefined && moodPrediction != null) {
            const ctx = displayCanvasRef.current.getContext("2d");
            ctx.beginPath();
            // for some reason the x position is flipped...? so
            ctx.rect(
                face[0]["box"]["xMin"], 
                face[0]["box"]["yMin"],
                face[0]["box"]["width"],
                face[0]["box"]["height"]
            )
            ctx.stroke();
            ctx.font = "24px serif";
            const xpos = ((face[0]["box"]["xMin"] + face[0]["box"]["xMin"] + face[0]["box"]["width"]) / 2) - 30
            const ypos = face[0]["box"]["yMax"] + 30;
            ctx.fillText(moodPrediction, xpos, ypos);
            ctx.setTransform(1,0,0,1,0,0);
        }
        if (moodPrediction){
            onEmotionDetected(moodPrediction.toLowerCase(), videoRef.current);
        }
    }, [face, moodPrediction,onEmotionDetected])

    return <div className='model_container'>
        <video autoPlay playsInline ref={videoRef}/>
        <canvas id='hiddenCanvas' className='hiddenCanvas' ref={hiddenCanvasRef} width={moodModelInputSize} height={moodModelInputSize}/>
        <canvas className='displayCanvas' ref={displayCanvasRef} width={displayCanvasWidth} height={displayCanvasHeight}/>
        <h3 className='moodPrediction'>{moodPrediction != null ? "Current Mood: " + moodPrediction : "No face detected"}</h3>
    </div>
}

export default Pytorch_model_tfjs;

