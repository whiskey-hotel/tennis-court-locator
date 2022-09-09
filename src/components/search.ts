declare global {
  interface Window {
    Autocomplete: any;
  }
}
let map: L.Map;

const auto = () => new window.Autocomplete('searchBar', {
  selectFirst: true,
  howManyCharacters: 1,

  // eslint-disable-next-line consistent-return
  onSearch: async ({ currentValue }) => {
    const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&city=${encodeURI(
      currentValue,
    )}`;

    try {
      const httpResponse = await fetch(api);
      const dataResponse = await httpResponse.json();
      return dataResponse.features;
    } catch (error) {
      console.log(error);
    }
  },

  onResults: ({ currentValue, matches, template }) => {
    const regex = new RegExp(currentValue, 'gi');

    // if the result returns 0 we
    // show the no results element
    if (matches === 0) {
      return template;
    }
    return matches
      .map(
        (element) => `
      <li class="loupe dropdown-item">
        <p>
          ${element.properties.display_name.replace(regex, (str) => `<b>${str}</b>`)}
        </p>
      </li> `,
      )
      .join('');
  },

  // we add an action to enter or click
  onSubmit: ({ object }) => {
    // remove all layers from the map
    map.eachLayer((layer) => {
      // @ts-ignore
      if (layer.toGeoJSON) {
        map.removeLayer(layer);
      }
    });

    const [lng, lat] = object.geometry.coordinates;

    map.setView([lat, lng], 17);
  },

  // get index and data from li element after
  // hovering over li with the mouse or using
  // arrow keys ↓ | ↑
  onSelectedItem: ({ index, element, object }) => {
    console.log('onSelectedItem:', index, element, object);
  },

  // the method presents no results element
  noResults: ({ currentValue, template }) => template(`<li class="dropdown-item">No results found: "${currentValue}"</li>`),
});

const mapImport = (windowMap: L.Map) => {
  // a wrapper function to import the intialized leaflet map without
  // altering any AUTOCOMPLETE source code
  map = windowMap;
  auto();
};
export default mapImport;
