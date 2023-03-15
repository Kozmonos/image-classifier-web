# Web Image Classification

![Tensorflow](https://www.gstatic.com/devrel-devsite/prod/v05e7bfbff49f105125b8b594f3a652493da8c30b69bf85fd5d75c6ab4f13a57e/tensorflow/images/lockup.svg)

> if you have a NodeJS project you can use [@kozmonos/image-classifier](https://www.npmjs.com/package/@kozmonos/image-classifier) package.

This package allows you to interact with 3 simple functions (init, train, predict) using Tensorflow JS's [@tensorflow-models/knn-classifier](https://www.npmjs.com/package/@tensorflow-models/knn-classifier) package.

```html
<img id="class0" src="/images/class0.jpg " />
<img id="class1" src="/images/class1.jpg " />
<img id="test" src="/images/test.jpg " />
```

```javascript
const imageClassifier = require("@kozmonos/image-classifier");

// Initialize the classifier
const classifier = await imageClassifier.init();

// Train the classifier
const image = document.getElementById("class0");
const label = "label";
classifier.addExample(image, label);

const image2 = document.getElementById("class1");
const label2 = "label2";
classifier.addExample(image2, label2);

// Predict the class of an image
const image3 = document.getElementById("test");
const result = await classifier.predictClass(image);
/*
 out: {  classIndex: 0, label: 'label2',  confidences: { label2: 0.6666666666666666, label: 0.3333333333333333 } }
*/
```
