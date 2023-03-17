import * as tf from '@tensorflow/tfjs';
// source: https://github.com/zsajjad/onnx-demo
export function canvasToTensor(canvasId) {
	var ctx = document.getElementById(canvasId).getContext("2d");

	// const n = 64;
	// const c = 3;
	const h = ctx.canvas.height;
	const w = ctx.canvas.width;

	const out_data = new Float32Array(h * w);

	// load src context to a tensor
	var srcImgData = ctx.getImageData(0, 0, w, h);
	var src_data = srcImgData.data;

	var src_idx = 0;
	var out_idx_r = 0;
	var out_idx_g = out_idx_r + h * w;
	var out_idx_b = out_idx_g + h * w;

	const norm = 1.0;
	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			let src_r = src_data[src_idx++];
			let src_g = src_data[src_idx++];
			let src_b = src_data[src_idx++];
			src_idx++;

			out_data[out_idx_r++] = src_r / norm;
			out_data[out_idx_g++] = src_g / norm;
			out_data[out_idx_b++] = src_b / norm;
		}
	}

	const out = tf.tensor(out_data, [1, h, w, 1], "float32");

	return out;
}

export function argMax(array) {
	let maxIndex = -1;
	let maxValue = -1;
	for(let i = 0; i < array.length; i++) {
		if(array[i] > maxValue) {
			maxIndex = i;
			maxValue = array[i];
		}
	}
	return maxIndex;
}