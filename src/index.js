import debounce from 'lodash.debounce';

import './sass/main.scss';
import config from './config.json';
import QuerySel from './js/QuerySel';
import InfiniteGallery from './js/InfiniteGallery';

const html = new QuerySel('body', 'form', 'input', '.gallery');
html.body.style.paddingTop = html.form.clientHeight + 'px';
const pixabayGallery = new InfiniteGallery(html.gallery, config.pixabay);

html.input.addEventListener(
  'input',
  debounce(() => {
    pixabayGallery.updateQuery(html.input.value);
    const url = new URL(location);
    url.searchParams.set('query', html.input.value);
    history.pushState(null, null, url);
  }),
  config.update_ms,
);

const startupQuery = new URL(location).searchParams.get('query');
if (startupQuery) {
  html.input.value = startupQuery;
  pixabayGallery.updateQuery(startupQuery);
}
