import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// const esriLayer =
//   'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
// const googleLayer = 'http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}';

const apiKey = process.env.HERE_API_KEY;
const style = 'satellite.day';
const size = 512;
const format = 'jpg';

const hereTileUrl = `https://{s}.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/${size}/${format}?apiKey=${apiKey}`;

const mapRender = () => {
  const map = L.map('map').setView([40.7499, -73.847], 17);

  L.tileLayer(hereTileUrl, {
    subdomains: ['1', '2', '3', '4'],
    attribution: '&copy; HERE 2019',
  }).addTo(map);

  return map;
};

export default mapRender;
