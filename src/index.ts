import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';
import * as elementBuilder from './modules/elementBuilder';
/* This code is needed to properly load the images in the Leaflet CSS */
// eslint-disable-next-line no-underscore-dangle

const main: HTMLElement = elementBuilder.newElement({
  element: 'div',
  elementID: 'main',
});

const mapContainer: HTMLElement = elementBuilder.newElement({
  element: 'div',
  elementID: 'map',
});

main.appendChild(mapContainer);

// elementBuilder.moduleRender({ mapContainer }, main);
elementBuilder.sendToBody(main);
elementBuilder.sendToBody(mapContainer);

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  .openPopup();
