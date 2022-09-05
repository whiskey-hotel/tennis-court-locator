import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as elementBuilder from '../modules/elementBuilder';

const esriLayer = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
// const googleLayer = 'http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}';

const mapContainer: HTMLElement = elementBuilder.newElement({
  element: 'div',
  elementID: 'mapContainer',
});

const mapElement: HTMLElement = elementBuilder.newElement({
  element: 'div',
  elementID: 'map',
});

const search: HTMLElement = elementBuilder.newElement({
  element: 'button',
  elementID: 'searchButton',
  text: 'Search this area',
});

mapContainer.appendChild(mapElement);
mapElement.appendChild(search);

const mapRender = () => {
  const map = L.map('map').setView([40.7499, -73.847], 17);

  L.tileLayer(esriLayer, {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  }).addTo(map);

  return map;
};

export { mapContainer, mapRender };
