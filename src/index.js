import debounce from 'lodash.debounce';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import { success, error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import './sass/main.scss';
import config from './config.json';
import QuerySel from './js/QuerySel';
import InfiniteGallery from './js/InfiniteGallery';
import pnotifySetup from './js/pnotifySetup';
import showLarge from './js/showLarge';

const html = new QuerySel('body', 'form', 'input', '.gallery');
html.body.style.paddingTop = html.form.clientHeight + 'px';
pnotifySetup(html.body);

const pixabayGallery = new InfiniteGallery(html.gallery, config.pixabay, () => {
  error({ text: "Couldn't fetch more images.", delay: 5000 });
});

showLarge(html.gallery, config.modal);

html.input.addEventListener(
  'input',
  debounce(async () => {
    await pixabayGallery.updateQuery(html.input.value);
    if (pixabayGallery.pageCount) {
      success(`Found ${pixabayGallery.foundItemCount} item(s).`);
    } else {
      error('Nothing found.');
    }

    const url = new URL(location);
    url.searchParams.set('query', html.input.value);
    history.pushState(null, null, url);
  }, config.update_ms),
);

const startupQuery = new URL(location).searchParams.get('query');
if (startupQuery) {
  html.input.value = startupQuery;
  pixabayGallery.updateQuery(startupQuery);
}
