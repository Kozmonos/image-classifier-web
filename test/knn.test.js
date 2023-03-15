const { createCanvas, loadImage } = require('canvas')
const { expect } = require('chai');
const knn = require('../index.min.js');
const path = require('path');

const assetsPath = path.join(__dirname, "..", 'assets', 'test');

const getAssetsImage = async (image) => {
	try {
		const imgPath = path.join(assetsPath, image);
		const img = await loadImage(imgPath)
		const canvas = createCanvas(img.width, img.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		return canvas;
	} catch (error) {
		console.log({ error })
		throw new Error('Image not found');
	}
}

describe('knn', () => {

	const class1Tag = 'apple';
	const class2Tag = 'peach';
	const testImages = {
		class1: [
			'apple6.jpg',
			'apple7.jpg'
		],
		class2: [
			'peach6.jpg',
			'peach7.jpg'
		]
	}
	const imageClassification = new knn();
	before(async function () {
		this.timeout(60000);
		const trainImagesClass1 = ['apple1.jpg', 'apple2.jpg', 'apple3.jpg', 'apple4.jpg', 'apple5.jpg']
		const trainImagesClass2 = ['peach1.jpg', 'peach2.jpg', 'peach3.jpg', 'peach4.jpg', 'peach5.jpg']

		await imageClassification.init();

		trainImagesClass1.forEach((img) => {
			console.log(`training ${img}`)
			getAssetsImage(img)
				.then((imgItem) => {
					imageClassification.train(imgItem, class1Tag);
				})
		});
		trainImagesClass2.forEach((img) => {
			console.log(`training ${img}`)
			getAssetsImage(img)
				.then((imgItem) => {
					imageClassification.train(imgItem, class2Tag);
				})
		});
	})


	testImages.class1.forEach(function (img) {
		it(`should classify ${img} as ${class1Tag}`, async function () {
			this.timeout(10000);
			console.log("predicting...")
			const image = await getAssetsImage(img)
			const result = await imageClassification.predict(image);
			console.log({ result })
			expect(result.label).to.equal(class1Tag);
		})
	});

	testImages.class2.forEach(function (img) {
		it(`should classify ${img} as ${class2Tag}`, async function () {
			this.timeout(10000);
			console.log("predicting...")
			const image = await getAssetsImage(img)
			const result = await imageClassification.predict(image);
			console.log({ result })
			expect(result.label).to.equal(class2Tag);
		})
	});

})
