import tensorflow as tf
import onnx
from onnx_tf.backend import prepare

onnx_model = onnx.load('pytorch_model.onnx')
tf_model = prepare(onnx_model)
tf_model.export_graph('pytorch_model')