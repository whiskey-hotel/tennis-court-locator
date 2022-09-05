import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const color = '#ff7800';

const drawDetections = (map: L.Map, detectionObject: any[]) => {
  detectionObject.forEach((detection) => {
    const x = detection.bbox[0];
    const y = detection.bbox[1];
    const x2 = detection.bbox[2] + x;
    const y2 = detection.bbox[3] + y;
    const point1 = L.point(x, y);
    const point2 = L.point(x2, y2);
    const corner1 = map.layerPointToLatLng(point1);
    const corner2 = map.layerPointToLatLng(point2);
    const bounds = L.latLngBounds(corner1, corner2);
    L.rectangle(bounds, { color, weight: 1 }).addTo(map);
  });
};

const clearMap = (map: L.Map) => {
  map.eachLayer((layer) => {
    // @ts-ignore
    if (layer.options.color === color) map.removeLayer(layer);
  });
};

export { drawDetections, clearMap };
