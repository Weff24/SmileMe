from facial_emotion_recognition import EmotionRecognition

import cv2 as cv
import torch 

if torch.cuda.is_available():
    device = 'gpu'
    gpu_id = 0
else:
    device = 'cpu'
    gpu_id = None


er = EmotionRecognition(device='gpu', gpu_id=0)

cam = cv.VideoCapture(0)

success, frame = cam.read()

frame = er.recognise_emotion(frame, return_type='BGR')

cv.imshow("frame", frame)

while True:
    key = cv.waitKey(10)
    if key & 0xff == 27:
        break