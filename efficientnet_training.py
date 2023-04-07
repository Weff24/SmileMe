import tensorflow as tf
from efficientnet.tfkeras import EfficientNetB0
from collections import OrderedDict
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D, MaxPool2D, BatchNormalization
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

# create efficientnet model
model_ft = EfficientNetB0(weights='imagenet', include_top=False)
for layer in model_ft.layers:
    layer.trainable = False

x = tf.keras.layers.GlobalAveragePooling2D()(model_ft.output)
x = tf.keras.layers.Dense(512, activation='relu')(x)
x = tf.keras.layers.Dropout(0.4)(x)
x = tf.keras.layers.Dense(7, activation='softmax')(x)

model = tf.keras.models.Model(model_ft.input, x)
# model.compile(loss='categorical_crossentropy', optimizer=tf.keras.optimizers.AdamW(lr=0.0001), metrics=['accuracy'])

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
# model_json = model.to_json()
# with open('model.json', 'w') as json_file:
#     json_file.write(model_json)

# model.save_weights('model.h5')
tf.saved_model.save(model, './efficientnet_model')

# Plotting the model accuracy and loss
plt.plot(model_info.history['accuracy'])
plt.plot(model_info.history['val_accuracy'])
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()