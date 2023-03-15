const tf = require('@tensorflow/tfjs');
const mobilenetModule = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');

class imageClassification {
	async init() {
		this.classifier = knnClassifier.create();
		this.mobilenet = await mobilenetModule.load();
	}

	 train(image, label) {
		const img = tf.browser.fromPixels(image);
		const logits = this.mobilenet.infer(img, true);
		this.classifier.addExample(logits, label);
	}

	 async predict(image) {
		const img = tf.browser.fromPixels(image);
		const logits = this.mobilenet.infer(img, true);
		const result = await this.classifier.predictClass(logits);
		return result;
	}
}


module.exports = imageClassification;