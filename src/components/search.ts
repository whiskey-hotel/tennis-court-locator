import * as elementBuilder from '../modules/elementBuilder';

const errorBar = elementBuilder.newElement({
  element: 'div',
  elementID: 'errorBar',
});

const searchContainer = elementBuilder.newElement({
  element: 'div',
  elementID: 'searchContainer',
});

const searchForm = elementBuilder.newElement({
  element: 'form',
  elementID: 'searchForm',
});

const searchBar = elementBuilder.newElement({
  element: 'input',
  elementID: 'searchBar',
});

searchForm.setAttribute('onSubmit', 'return false');
searchForm.setAttribute('noValidate', '');
searchBar.setAttribute('type', 'text');
searchBar.setAttribute('placeholder', 'Search a US City');
searchBar.setAttribute('required', '');
searchBar.setAttribute('autocomplete', 'off');

searchContainer.appendChild(errorBar);
searchContainer.appendChild(searchForm);
searchForm.appendChild(searchBar);

export default searchContainer;
