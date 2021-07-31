import './sass/main.scss';
import config from './config.json';
import QuerySel from './js/QuerySel';
import PixabayGallery from './js/PixabayGallery';

const html = new QuerySel('body', 'form', 'input', '.gallery');
html.body.style.paddingTop = html.form.clientHeight + 'px';
const pixabayGallery = new PixabayGallery(html.gallery, config);

// html.form.addEventListener('submit', e => {
//   //e.preventDefault();
//   //pixabayGallery.updateQuery(html.input.value);
// });

const startupQuery = new URL(location).searchParams.get('query');
if (startupQuery) {
  html.input.value = startupQuery;
  pixabayGallery.updateQuery(startupQuery);
}
