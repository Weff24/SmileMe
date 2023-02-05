from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D, MaxPool2D
from keras.optimizers import Adam
from keras.preprocessing.image import ImageDataGenerator
from matplotlib import pyplot as plt

# Preprocessing the data
train_data_cleaned = ImageDataGenerator(rescale = 1./255)
test_data_cleaned = ImageDataGenerator(rescale = 1./255)
train_generator = train_data_cleaned.flow_from_directory(
    'FER2013/train',
    target_size = (48, 48),
    batch_size = 64,
    color_mode = 'grayscale',
    class_mode = 'categorical')
test_generator = test_data_cleaned.flow_from_directory(
    'FER2013/test',
    target_size = (48, 48),
    batch_size = 64,
    color_mode = 'grayscale',
    class_mode = 'categorical')

# Building the model
model = Sequential()

# 1st Convolutional Layer
model.add(Conv2D(filters=32, kernel_size=(3,3), activation='relu', input_shape=(48,48,1)))
# 2nd Convolutional Layer
model.add(Conv2D(filters=64, kernel_size=(3,3), activation='relu'))
# Purpose of having this pooling layer is to reduce the spatial size of the representation to 
# reduce the amount of parameters and computation in the network, and hence to also control overfitting.
model.add(MaxPooling2D(pool_size=(2,2)))
# Dropout layer avoids overfitting by randomly dropping units (along with their connections) from the neural network during training.
model.add(Dropout(0.25))

# 3rd Convolutional Layer
model.add(Conv2D(filters=128, kernel_size=(3,3), activation='relu'))
# pooling layer
model.add(MaxPooling2D(pool_size=(2,2)))
# 4th Convolutional Layer
model.add(Conv2D(filters=128, kernel_size=(3,3), activation='relu'))
# pooling layer
model.add(MaxPooling2D(pool_size=(2,2)))
# Dropout layer
model.add(Dropout(0.25))

# Flattening the data for fully connected layers
# Purpose of flattening is to convert all the resultant 2D arrays into a single long continuous linear vector.
model.add(Flatten())
# Dense layer
# Purpose of dense layer is to perform classification on the dataset.
model.add(Dense(1024, activation='relu'))
# Dropout layer
model.add(Dropout(0.5))
# Another dense layer
# 7 is the number of emotional classes
model.add(Dense(7, activation='softmax'))

# Compiling the model
model.compile(loss='categorical_crossentropy', optimizer=Adam(lr=0.0001, decay=1e-6), metrics=['accuracy'])

# Fit the model
model_info = model.fit_generator(
    train_generator,
    steps_per_epoch = 28709 // 64,
    epochs = 50, # reduce this if you have limited computational power
    validation_data = test_generator,
    validation_steps = 7178 // 64)

# Save the model
model_json = model.to_json()
with open('model.json', 'w') as json_file:
    json_file.write(model_json)

model.save_weights('model.h5')

# Plotting the model accuracy and loss
# plt.plot(model_info.history['accuracy'])
# plt.plot(model_info.history['val_accuracy'])
# plt.title('Model Accuracy')
# plt.ylabel('Accuracy')
# plt.xlabel('Epoch')
# plt.legend(['train', 'test'], loc='upper left')
# plt.show()