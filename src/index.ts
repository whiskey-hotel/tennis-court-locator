import { mapRender, mapContainer } from './components/map-component';
import './index.css';
import * as elementBuilder from './modules/elementBuilder';
import getImage from './modules/captureImage';

const main: HTMLElement = elementBuilder.newElement({
  element: 'div',
  elementID: 'main',
});

elementBuilder.moduleRender({ mapContainer }, main);
elementBuilder.sendToBody(main);

mapRender();

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
  const mapElement = document.getElementById('map');
  getImage(mapElement);
});
