import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';
import { useState, useRef, useLayoutEffect } from 'react';
import { canvasToTensor } from './utils';

const Mediapipe_test = () => {

    const image_size = 48;
    const videoRef = useRef(null);
    const canvasRef = useRef();
    const [faces, setFaces] = useState({});

    let detector;
    const loadModel = async () => {
        const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
        const detectorConfig = {
            runtime: 'tfjs',
        };
        detector = await faceDetection.createDetector(model, detectorConfig);
    }
    const runModel = async () => {
        const ctx = canvasRef.current.getContext("2d");
		canvasRef.current.width = image_size;
		canvasRef.current.height = image_size;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(videoRef.current, 0, 0, image_size, image_size);
        // const prediction_tensor = await canvasToTensor("srcCanvas");
        const estimationConfig = {flipHorizontal: true};
        const img = new Image();
        img.src = videoRef.current;
        img.width = 1280;
        img.height = 720;
        const faces = await detector.estimateFaces(canvasRef.current, estimationConfig);
        setFaces(faces);
        console.log("FACES: ")
        console.log(faces[0]);
        const test_img = document.getElementById('testimg');
        const test_faces = await detector.estimateFaces(test_img, estimationConfig);
        console.log("TEST FACES: ")
        console.log(test_faces[0])
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
        <img crossOrigin='anonymous' id='testimg' src="random.jpeg"/>
        <video autoPlay playsInline ref={videoRef}/>
        <canvas id='srcCanvas' ref={canvasRef} width={image_size} height={image_size} style={{display:"none"}}/>
        <h3 className='moodPrediction'>Faces: </h3>
        {/* <h3 className='moodPrediction'>xMin: {faces[0]["box"]["xMin"]}</h3>
        <h3 className='moodPrediction'>xMax: {faces[0]["box"]["xMax"]}</h3>
        <h3 className='moodPrediction'>yMin: {faces[0]["box"]["yMin"]}</h3>
        <h3 className='moodPrediction'>yMax: {faces[0]["box"]["yMax"]}</h3> */}
    </div>
}

export default Mediapipe_test;