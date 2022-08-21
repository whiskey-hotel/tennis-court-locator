import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet';
import 'esri-leaflet-vector/dist/esri-leaflet-vector';
import * as elementBuilder from '../modules/elementBuilder';
import 'leaflet-providers';

const mapContainer: HTMLElement = elementBuilder.newElement({
  element: 'div',
  elementID: 'map',
});

const mapRender = () => {
  const map = L.map('map').setView([40.7499, -73.8470], 17);

  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
  ).addTo(map);
};

export { mapContainer, mapRender };
