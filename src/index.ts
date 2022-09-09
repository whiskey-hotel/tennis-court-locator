import { mapRender } from './components/map-component';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
// import * as elementBuilder from './modules/elementBuilder';
import getImage from './modules/captureImage';
import detect from './modules/runModel';
import { drawDetections, clearMap } from './modules/draw';
import loaderContainer from './components/loader';
import mapImport from './components/search';
// import searchContainer from './components/search';

// const main: HTMLElement = elementBuilder.newElement({
//   element: 'div',
//   elementID: 'main',
// });

// elementBuilder.moduleRender({ searchContainer, mapContainer }, main);
// elementBuilder.sendToBody(main);

const map = mapRender();
mapImport(map);
const mapElement = document.getElementById('map');
mapElement.appendChild(loaderContainer);

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
  clearMap(map);
  const image = await getImage(mapElement);
  loaderContainer.style.display = 'block';
  const detections = await detect(image);
  drawDetections(map, detections);
  loaderContainer.style.display = 'none';
});
