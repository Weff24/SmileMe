# run this with the path to the directory of images to process
# will output the new images in same structure with only the faces
import mediapipe as mp
import cv2
import numpy as np
import sys
import os
import matplotlib.pyplot as plt

mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.8)
mp_drawing = mp.solutions.drawing_utils

def main():
    cwd = os.getcwd()
    image_directory = sys.argv[1]
    output_directory = sys.argv[2]
    createImagesInDir(
        os.path.join(cwd, image_directory), 
        os.path.join(cwd, output_directory)
    )

def createImagesInDir(inp_dir, out_dir):
    os.mkdir(out_dir)
    os.chdir(out_dir)
    for filename in os.listdir(inp_dir):
        print("FILE NAME IS: " + str(filename))
        file_path = os.path.join(inp_dir, filename)
        print("FILE PATH IS " + str(file_path))
        if os.path.isfile(file_path):
            image = cv2.imread(file_path)
            if image is None:
                print("UNABLE TO READ IMAGE: " + str(filename))
                continue
            # Convert the BGR image to RGB and process it with MediaPipe Face Detection.
            results = face_detection.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

            # Draw face detections of each face.
            if not results.detections:
                print("NO FACE FOUND FOR IMAGE AT PATH: " + str(file_path))
                cv2.imshow("NO FACE FOUND FOR THIS IMAGE", image)
                cv2.waitKey(0)
                continue
            image_height = image.shape[0]
            image_width = image.shape[1]
            xmin = round(results.detections[0].location_data.relative_bounding_box.xmin * image_width)
            xmax = round((results.detections[0].location_data.relative_bounding_box.xmin + results.detections[0].location_data.relative_bounding_box.width) * image_width)
            ymin = round(results.detections[0].location_data.relative_bounding_box.ymin * image_height)
            ymax = round((results.detections[0].location_data.relative_bounding_box.ymin + results.detections[0].location_data.relative_bounding_box.height) * image_height)
            xmin = getWithinBounds(xmin, 0, image_width)
            xmax = getWithinBounds(xmax, 0, image_width)
            ymin = getWithinBounds(ymin, 0, image_height)
            ymax = getWithinBounds(ymax, 0, image_height)
            cropped_image = image[ymin:ymax, xmin:xmax]
            cv2.imwrite(filename, cropped_image)
            print("successfully made and stored new image!")
        elif os.path.isdir(file_path):
            createImagesInDir(file_path, os.path.join(out_dir, filename))

def getWithinBounds(val, low, high):
    if val > high:
        return high
    if val < low:
        return low
    return val

if __name__ == '__main__':
    main()