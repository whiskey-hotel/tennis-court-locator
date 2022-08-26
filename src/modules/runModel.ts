import * as tf from '@tensorflow/tfjs';

const detect = async (imageElement: HTMLImageElement) => {
  const model = await tf.loadGraphModel(
    'https://raw.githubusercontent.com/whiskey-hotel/tennis-court-locator/main/web_model/model.json',
  );
  const imageTensor = tf.browser.fromPixels(imageElement);
  const newTensor = imageTensor.expandDims();
  const prediction = await model.executeAsync(newTensor);
  console.table(prediction);
};

export default detect;
