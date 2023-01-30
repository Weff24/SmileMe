# GPU ACCELERATION if stuff gets slow later
# look into: MPS acceleration for mac/pytorch
# or CUDA whatever that is

# imports
import torch
import torch.nn as nn                   #for sequence api in torch
from torch.utils.data import DataLoader #for loading images
import numpy as np                      #just in case if you need numpy arrays
import torchvision.transforms as transforms           #Used for data preprocessing and converting images to tensors
import torchvision.datasets as datasets
import torch.optim                      #For using the desired parameter update
import torch.nn.functional

import matplotlib.pyplot as plt
import random

# check and set device
if torch.cuda.is_available():
  device = torch.device('cuda')
else:
  device = torch.device('cpu')

print("Using device: ", device)

num_pixels = 448

# preprocessing
transform = transforms.Compose([transforms.RandomHorizontalFlip(), transforms.Resize((num_pixels,num_pixels)), transforms.ToTensor()])
train_data = datasets.ImageFolder("images/train", transform=transform) # is it imagefolder? imagenet?
loaded_train = DataLoader(train_data, batch_size=64, shuffle=True)
validation_data = datasets.ImageFolder("images/validation", transform=transform)
loaded_validation = DataLoader(validation_data,batch_size=64, shuffle=True)
print(train_data.classes)
print(validation_data.classes)

# visualizing some sample data
dataiter = iter(loaded_train)   #The iter() function in python represents the iterator similar to c++ iterators
images, labels = next(dataiter) #The next() method retrieves the object 
expression = {0:"angry",1:"disgust",2:"fear",3:"happy",4:"neutral",5:"sad",6:"surprise"} #Create a dictionary for mapping accordingly
random_idx = random.sample(range(0,64),1)[0]     #Selects a random single number from 0-64
print("Target label: ",expression[int(labels[random_idx].numpy())])  #Converting it to numpy from tensor to fetch the label
plt.imshow(np.transpose(images[random_idx].numpy(), (1, 2, 0)))
plt.show()