import debounce from 'lodash.debounce';

import './sass/main.scss';
import config from './config.json';
import QuerySel from './js/QuerySel';
import PixabayGallery from './js/PixabayGallery';

const html = new QuerySel('body', 'form', 'input', '.gallery');
html.body.style.paddingTop = html.form.clientHeight + 'px';
const pixabayGallery = new PixabayGallery(html.gallery, config.pixabay);

html.input.addEventListener(
  'input',
  debounce(() => {
    pixabayGallery.updateQuery(html.input.value);
  }),
  config.update_ms,
);

const startupQuery = new URL(location).searchParams.get('query');
if (startupQuery) {
  html.input.value = startupQuery;
  pixabayGallery.updateQuery(startupQuery);
}
