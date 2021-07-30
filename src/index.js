import './sass/main.scss';
import config from './config.json';
import pixabaySearch from './js/pixabaySearch';
import renderGallery from './js/renderGallery';
Element.prototype.renderGallery = renderGallery;

pixabaySearch('ze', 6).then(data => console.log(data));
//document.querySelector('body').renderGallery('fff');
