import mediapipe as mp
import cv2
import sys

def getWithinBounds(val, low, high):
    if val > high:
        return high
    if val < low:
        return low
    return val

mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.8)
mp_drawing = mp.solutions.drawing_utils
image = cv2.imread(sys.argv[1])
cv2.imshow("First image", image)
cv2.waitKey(0)
results = face_detection.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
print(results.detections[0])
print()
print(results.detections[0].location_data)
print()
print(results.detections[0].location_data.relative_bounding_box)
print()
print(results.detections[0].location_data.relative_bounding_box.xmin)
print()
print(results.detections[0].location_data.relative_bounding_box.height)
print(image.shape)
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
# I think this one is the right one
cropped_image = image[ymin:ymax, xmin:xmax]
cv2.imshow("Second image", cropped_image)
cv2.waitKey(0)
# This one is probably backwards
cropped_image2 = image[xmin:xmax, ymin:ymax]
cv2.imshow("Third image", cropped_image2)
cv2.waitKey(0)
annotated_image = image.copy()
for detection in results.detections:
    print('Nose tip:')
    print(mp_face_detection.get_key_point(
        detection, mp_face_detection.FaceKeyPoint.NOSE_TIP))
    mp_drawing.draw_detection(annotated_image, detection)
cv2.imshow("annotated image", annotated_image)
cv2.waitKey(0)