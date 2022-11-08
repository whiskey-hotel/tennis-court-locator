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

const mapImport = (windowMap: L.Map) => {
  // a wrapper function to import the intialized leaflet map without
  // altering any AUTOCOMPLETE source code
  const map: L.Map = windowMap;
  return map;
  // auto();
};

const maxResults = 5;
const country = 'USA';
const apiKey = process.env.HERE_API_KEY;

const dropdown = document.getElementById('results');
const searchBox = document.getElementById('searchBar');

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

searchBox.addEventListener('input', async (e) => {
  if (dropdown.firstChild) {
    removeAllChildNodes(dropdown);
  }
  // @ts-ignore
  const input = e.target.value;
  try {
    if (!input) return;
    const autocompleteRequest = await fetch(
      `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${apiKey}&query=${input}&maxresults=${maxResults}&country=${country}&beginHighlight=<b>&endHighlight=</b>`,
      { mode: 'cors' },
    );

    const autocompleteResponse = await autocompleteRequest.json();

    if (autocompleteResponse.suggestions.length === 0) throw new Error('City not Found.');

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/dot-notation
    autocompleteResponse.suggestions.forEach((result, index) => {
      const listResult = document.createElement('span');
      listResult.textContent = result.label;
      listResult.id = `result-${index}`;

      dropdown.appendChild(listResult);
    });
  } catch (error) {
    const listResult = document.createElement('span');
    listResult.textContent = error.message;
    dropdown.appendChild(listResult);
  }
});

// const geocodeRequest = `https://geocode.search.hereapi.com/v1/geocode?q=Invalidenstr+117+Berlin&apiKey=${apiKey}`;
// const autosuggestRequest = `https://autosuggest.search.hereapi.com/v1/autosuggest?&limit=${maxResults}&lang=en&at=40.7499,-73.847&q=${input}&apiKey=${apiKey}`;

export default mapImport;
// https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=SNTYP9caYOkohkWRtYNUIi3MniJlU3uThWLmnw4ELBk&query=austin&maxresults=10&country=USA&beginHighlight=<b>&endHighlight=</b>
// autocomplete to geocode

// or autosuggest
// map.getCenter()
