import os
import shutil

# RUN FROM SMILEME FOLDER

FER2013_train = os.path.join(os.getcwd(), "FER2013_cropped/train/")
images_train = os.path.join(os.getcwd(), "images_cropped/train/")
emotions = ["angry", "fear", "happy", "neutral", "sad", "surprise"]

emotion_count_train = []
for e in emotions:
    FER_path = os.path.join(FER2013_train, e)
    count = 0
    for f in os.listdir(FER_path):
        count += 1
    images_path = os.path.join(images_train, e)
    for f in os.listdir(images_path):
        count += 1
    emotion_count_train.append(count)

min_emotion_num = min(emotion_count_train)
print(f"MINIMUM NUMBER ACROSS EMOTIONS FOR TRAIN: {min_emotion_num}")
new_images_path = os.path.join(os.getcwd(), "combined_images")
os.mkdir(new_images_path)
new_images_train_path = os.path.join(new_images_path, "train")
os.mkdir(new_images_train_path)

for e in emotions:
    new_images_path_emotion = os.path.join(new_images_train_path, e)
    os.mkdir(new_images_path_emotion)
    FER_path = os.path.join(FER2013_train, e)
    FER_num = min_emotion_num / 2
    count = 0
    for filename in os.listdir(FER_path):
        file_path = os.path.join(FER_path, filename)
        shutil.copy(file_path, new_images_path_emotion)
        count += 1
        if count > FER_num:
            break
    print(f"COPIED {count} FILES FROM FER TRAIN TO NEW DIRECTORY")
    images_path = images_train + e
    for filename in os.listdir(images_path):
        file_path = os.path.join(images_path, filename)
        shutil.copy(file_path, new_images_path_emotion)
        count += 1
        if count > min_emotion_num:
            break
    print(f"COPIED {count} TOTAL FILES TO NEW DIRECTORY")


FER2013_test = os.path.join(os.getcwd(), "FER2013_cropped/test/")
images_test = os.path.join(os.getcwd(), "images_cropped/validation/")

emotion_count_test = []
for e in emotions:
    FER_path = os.path.join(FER2013_test, e)
    count = 0
    for f in os.listdir(FER_path):
        count += 1
    images_path = os.path.join(images_test, e)
    for f in os.listdir(images_path):
        count += 1
    emotion_count_test.append(count)

min_emotion_num = min(emotion_count_test)
print(f"MINIMUM NUMBER ACROSS EMOTIONS IS: {min_emotion_num}")
new_images_test_path = os.path.join(new_images_path, "test")
os.mkdir(new_images_test_path)

for e in emotions:
    new_images_path_emotion = os.path.join(new_images_test_path, e)
    os.mkdir(new_images_path_emotion)
    FER_path = os.path.join(FER2013_test, e)
    FER_num = min_emotion_num / 2
    count = 0
    for filename in os.listdir(FER_path):
        file_path = os.path.join(FER_path, filename)
        shutil.copy(file_path, new_images_path_emotion)
        count += 1
        if count > FER_num:
            break
    print(f"COPIED {count} FILES FROM FER TEST TO NEW DIRECTORY")
    images_path = images_train + e
    for filename in os.listdir(images_path):
        file_path = os.path.join(images_path, filename)
        shutil.copy(file_path, new_images_path_emotion)
        count += 1
        if count > min_emotion_num:
            break
    print(f"COPIED {count} TOTAL FILES TO NEW DIRECTORY")