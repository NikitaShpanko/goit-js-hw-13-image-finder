import './sass/main.scss';
import config from './config.json';
import QuerySel from './js/QuerySel';
import PixabayGallery from './js/PixabayGallery';

const html = new QuerySel('body', '.gallery');
console.log(html);
const pixabayGallery = new PixabayGallery(html._gallery, config.pixabay);
pixabayGallery.updateQuery('ze');
