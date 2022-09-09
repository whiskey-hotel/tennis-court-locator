/* eslint-disable max-len */
import { loadGraphModel, browser } from '@tensorflow/tfjs';

const classesDir = {
  1: {
    name: 'Court',
    id: 1,
  },
};

const buildDetectedObjects = (
  scores: number[],
  imageWidth: number,
  imageHeight: number,
  boxes: number[],
  classes: {},
) => {
  const threshold = 0.5;
  const detectionObjects = [];
  scores.forEach((score, i) => {
    if (score > threshold) {
      const minY = boxes[i * 4] * imageHeight;
      const minX = boxes[i * 4 + 1] * imageWidth;
      const maxY = boxes[i * 4 + 2] * imageHeight;
      const maxX = boxes[i * 4 + 3] * imageWidth;
      const bbox = [minX, minY, maxX, maxY];

      detectionObjects.push({
        class: classes[i],
        label: classesDir[classes[i]].name,
        score: score.toFixed(4),
        bbox,
      });
    }
  });

  return detectionObjects;
};

const detect = async (imageElement: HTMLImageElement) => {
  const model = await loadGraphModel(
    'https://raw.githubusercontent.com/whiskey-hotel/tennis-court-locator/main/web_model/model.json',
  );
  const imageWidth = imageElement.naturalWidth;
  const imageHeight = imageElement.naturalHeight;
  const imageTensor = browser.fromPixels(imageElement);
  const newTensor = imageTensor.expandDims();
  const prediction = await model.executeAsync(newTensor);

  const boxes = prediction[0].dataSync(); // detection_boxes: coordinates of the detection boxes in the image.
  const classes = prediction[3].dataSync(); // detection_classes: detection-level class labels.
  const scores = prediction[6].dataSync(); // detection_scores: detection scores for the detection boxes in the image.
  //   const rawScores = prediction[1]; // raw_detection_scores: contains class score logits for raw detection boxes.
  //   const rawBoxes = prediction[2]; //   raw_detection_boxes: contains decoded detection boxes without Non-Max suppression.
  //   const numDetections = prediction[4].dataSync(); // num_detections: number of detections in the batch.
  //   const identity0 = prediction[5].dataSync(); // detection_anchor_indices: The anchor indices of the detections after NMS.
  //   const multiClassScores = prediction[7].dataSync(); // detection_multiclass_scores: class score distribution (including background)
  // for detection boxes in the image including background class.

  const detectionObjects = buildDetectedObjects(scores, imageWidth, imageHeight, boxes, classes);
  console.log(detectionObjects);
  return detectionObjects;
};

export default detect;
