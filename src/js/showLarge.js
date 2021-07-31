import * as basicLightbox from 'basiclightbox';
import modalTpl from '../tpl/modal.hbs';

export default function (selector, escapeKeys) {
  let instance;
  selector.addEventListener('click', e => {
    if (e.target.tagName !== 'IMG') return;
    e.preventDefault();
    instance = basicLightbox.create(modalTpl(e.target.dataset));
    instance.show();
  });

  document.addEventListener('keydown', e => {
    if (!basicLightbox.visible()) return;
    if (escapeKeys.includes(e.code)) {
      e.preventDefault();
      instance.close();
    }
  });
}
