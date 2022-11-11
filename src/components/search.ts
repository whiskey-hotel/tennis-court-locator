/* eslint-disable max-len */

// const auto = () => new window.Autocomplete('searchBar', {
//   selectFirst: true,
//   howManyCharacters: 1,

//   // eslint-disable-next-line consistent-return
//   onSearch: async ({ currentValue }) => {
//     const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&city=${encodeURI(
//       currentValue,
//     )}`;

//     try {
//       const httpResponse = await fetch(api);
//       const dataResponse = await httpResponse.json();
//       return dataResponse.features;
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   onResults: ({ currentValue, matches, template }) => {
//     const regex = new RegExp(currentValue, 'gi');

//     // if the result returns 0 we
//     // show the no results element
//     if (matches === 0) {
//       return template;
//     }
//     return matches
//       .map(
//         (element) => `
//       <li class="loupe dropdown-item">
//         <p>
//           ${element.properties.display_name.replace(regex, (str) => `<b>${str}</b>`)}
//         </p>
//       </li> `,
//       )
//       .join('');
//   },

//   // we add an action to enter or click
//   onSubmit: ({ object }) => {
//     // remove all layers from the map
//     map.eachLayer((layer) => {
//       // @ts-ignore
//       if (layer.toGeoJSON) {
//         map.removeLayer(layer);
//       }
//     });

//     const [lng, lat] = object.geometry.coordinates;

//     map.setView([lat, lng], 17);
//   },

//   // get index and data from li element after
//   // hovering over li with the mouse or using
//   // arrow keys ↓ | ↑
//   onSelectedItem: ({ index, element, object }) => {
//     console.log('onSelectedItem:', index, element, object);
//   },

//   // the method presents no results element
//   noResults: ({ currentValue, template }) => template(`<li class="dropdown-item">No results found: "${currentValue}"</li>`),
// });
declare global {
  interface Window {
    Autocomplete: any;
  }
}
let map: L.Map;

const mapImport = (windowMap: L.Map) => {
  // a wrapper function to import the intialized leaflet map without
  // altering any AUTOCOMPLETE source code
  map = windowMap;
  // auto();
};

const maxResults = 5;
const apiKey = process.env.HERE_API_KEY;

const dropdown = document.getElementById('results');
const searchForm = document.getElementById('searchForm');
const searchBox = document.getElementById('searchBar');

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

searchBox.addEventListener('input', async (e) => {
  if (dropdown.firstChild) {
    removeAllChildNodes(dropdown);
  }
  // @ts-ignore
  const input = e.target.value;
  try {
    if (!input) return;
    const autosuggestRequest = await fetch(
      `https://autosuggest.search.hereapi.com/v1/autosuggest?&limit=${maxResults}&lang=en&at=40.7499,-73.847&q=${input}&apiKey=${apiKey}`,
      { mode: 'cors' },
    );

    const autosuggestResponse = await autosuggestRequest.json();

    if (autosuggestResponse.items.length === 0) throw new Error('City not Found.');

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/dot-notation
    autosuggestResponse.items.forEach((result, index) => {
      const listResult = document.createElement('span');
      const labelResult = result.address.label;
      const placeID = result.id;

      listResult.innerHTML = labelResult;
      listResult.id = `result-${index}`;
      listResult.dataset.value = placeID;

      listResult.addEventListener('click', () => {
        // @ts-ignore
        searchBox.value = labelResult;
        searchBox.dataset.value = placeID;
        removeAllChildNodes(dropdown);
      });

      dropdown.appendChild(listResult);
    });
  } catch (error) {
    const listResult = document.createElement('span');
    listResult.textContent = error.message;
    dropdown.appendChild(listResult);
  }
});

searchForm.addEventListener('submit', async () => {
  try {
    const geocodeRequest = await fetch(
      // @ts-ignore
      `https://geocode.search.hereapi.com/v1/geocode?q=${searchBox.value}&apiKey=${apiKey}`,
      { mode: 'cors' },
    );

    const geocodeResponse = await geocodeRequest.json();

    const { lat } = geocodeResponse.items[0].position;
    const { lng } = geocodeResponse.items[0].position;
    map.setView([lat, lng], 17);
  } catch (error) {
    console.log(error);
  }
});

export default mapImport;
