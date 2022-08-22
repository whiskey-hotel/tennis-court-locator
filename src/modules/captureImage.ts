import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

const getImage = async (extent, url: string) => {
  const layer = new MapImageLayer({
    url,
  });

  const height = 640;
  const width = 640;

  const dataImageObject = await layer.fetchImage(extent, height, width);
  return dataImageObject;
};
export default getImage;
