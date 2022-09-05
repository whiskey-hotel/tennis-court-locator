import { mapRender, mapContainer } from './components/map-component';
import './index.css';
import * as elementBuilder from './modules/elementBuilder';
import getImage from './modules/captureImage';
import detect from './modules/runModel';
import { drawDetections, clearMap } from './modules/draw';

const main: HTMLElement = elementBuilder.newElement({
  element: 'div',
  elementID: 'main',
});

elementBuilder.moduleRender({ mapContainer }, main);
elementBuilder.sendToBody(main);

const map = mapRender();

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
  const mapElement = document.getElementById('map');
  clearMap(map);
  const image = await getImage(mapElement);
  const detections = await detect(image);
  drawDetections(map, detections);
});
