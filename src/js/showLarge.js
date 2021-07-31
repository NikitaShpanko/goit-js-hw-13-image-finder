import * as basicLightbox from 'basiclightbox';
import modalTpl from '../tpl/modal.hbs';

export default function (selector, escapeKeys) {
  let instance, img, x, y, down_x, down_y;

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

    img = instance.element().querySelector('img');
    x = 0;
    y = 0;

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

  document.addEventListener('mousedown', e => {
    if (!checkMouse(e)) return;
    down_x = e.screenX;
    down_y = e.screenY;
  });

  document.addEventListener('mousemove', e => {
    if (!checkMouse(e)) return;
    e.preventDefault();
    x += e.movementX;
    y += e.movementY;
    img.style.transform = `translate(${x}px,${y}px)`;
  });

  document.addEventListener(
    'click',
    e => {
      if (checkMouse(e, true)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    //true,
  );

  function checkMouse(e, click = false) {
    return (
      basicLightbox.visible() &&
      e.target.tagName === 'IMG' &&
      (click ? (down_x - e.screenX) ** 2 + (down_y - e.screenY) ** 2 > 1 : e.buttons === 1)
    );
  }
}
