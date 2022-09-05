import * as elementBuilder from '../modules/elementBuilder';

const loaderContainer: HTMLElement = elementBuilder.newElement({
  element: 'div',
  className: 'loaderContainer',
});
const loader: HTMLElement = elementBuilder.newElement({
  element: 'div',
  className: 'loader',
});

loaderContainer.appendChild(loader);

export default loaderContainer;
