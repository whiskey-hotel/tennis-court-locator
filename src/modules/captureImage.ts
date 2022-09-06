import domtoimage from 'dom-to-image';

const getImage = async (mapElement: HTMLElement) => {
  const width = mapElement.clientWidth;
  const height = mapElement.clientHeight;
  const image = new Image();

  const dataImageURL = await domtoimage.toPng(mapElement, { width, height });
  image.src = dataImageURL;
  // document.body.appendChild(image);
  return image;
};
export default getImage;
