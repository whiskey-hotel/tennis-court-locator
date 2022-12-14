import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const color = '#ff7800';

const drawDetections = (map: L.Map, detectionObject: any[]) => {
  detectionObject.forEach((detection) => {
    const x = detection.bbox[0];
    const y = detection.bbox[1];
    const x2 = detection.bbox[2];
    const y2 = detection.bbox[3];
    const SWPoint = L.point(x, y2);
    const NEPoint = L.point(x2, y);
    const SWCorner = map.containerPointToLatLng(SWPoint);
    const NECorner = map.containerPointToLatLng(NEPoint);
    const bounds = L.latLngBounds(SWCorner, NECorner);
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
