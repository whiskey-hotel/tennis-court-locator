import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import mapRender from './components/map-component';
import getImage from './modules/captureImage';
import detect from './modules/runModel';
import { drawDetections, clearMap } from './modules/draw';
import loaderContainer from './components/loader';
import mapImport from './components/search';

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
