import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import './sass/main.scss';
import config from './config.json';
import QuerySel from './js/QuerySel';
import InfiniteGallery from './js/InfiniteGallery';
import modalTpl from './tpl/modal.hbs';

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

html.gallery.addEventListener('click', e => {
  if (!e.target.tagName === 'IMG') return;
  e.preventDefault();
  const instance = basicLightbox.create(modalTpl(e.target.dataset));
  instance.show();
});

const startupQuery = new URL(location).searchParams.get('query');
if (startupQuery) {
  html.input.value = startupQuery;
  pixabayGallery.updateQuery(startupQuery);
}
