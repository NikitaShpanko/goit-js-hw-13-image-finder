import * as basicLightbox from 'basiclightbox';
import modalTpl from '../tpl/modal.hbs';

export default function (selector, escapeKeys) {
  let instance;

  selector.addEventListener('click', e => {
    // FOR MOBILE://
    if (basicLightbox.visible()) {
      instance.close();
      e.preventDefault();
      return;
    }
    ////////////////
    if (e.target.tagName !== 'IMG') return;
    e.preventDefault();
    instance = basicLightbox.create(modalTpl(e.target.dataset));
    instance.show();

    // console.log(instance.element().getBoundingClientRect());
    // instance
    //   .element()
    //   .querySelector('img')
    //   .addEventListener('load', e => {
    //     console.log(e.target.getBoundingClientRect());
    //   });
  });

  document.addEventListener('keydown', e => {
    if (!basicLightbox.visible()) return;
    if (escapeKeys.includes(e.code)) {
      e.preventDefault();
      instance.close();
    }
  });
}
