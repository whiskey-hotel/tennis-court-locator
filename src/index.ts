import { mapRender, mapContainer } from './components/map-component';
import './index.css';
import * as elementBuilder from './modules/elementBuilder';

const main: HTMLElement = elementBuilder.newElement({
  element: 'div',
  elementID: 'main',
});

elementBuilder.moduleRender({ mapContainer }, main);
elementBuilder.sendToBody(main);

mapRender();
