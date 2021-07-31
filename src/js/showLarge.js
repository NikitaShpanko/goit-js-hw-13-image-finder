import * as basicLightbox from 'basiclightbox';
import modalTpl from '../tpl/modal.hbs';

export default function (selector, escapeKeys) {
  let instance, img, x, y, downX, downY, prevX, prevY;

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
    downX = e.screenX;
    downY = e.screenY;
  });

  document.addEventListener('mousemove', e => {
    if (!checkMouse(e)) return;
    e.preventDefault();
    x += e.movementX;
    y += e.movementY;
    img.style.transform = `translate(${x}px,${y}px)`;
  });

  document.addEventListener('touchstart', e => {
    if (!checkTouch(e)) return;
    prevX = e.touches[0].screenX;
    prevY = e.touches[0].screenY;
    downX = prevX;
    downY = prevY;
  });

  document.addEventListener('touchmove', e => {
    if (!checkTouch(e)) return;
    e.preventDefault();
    e.stopPropagation();
    x += e.touches[0].screenX - prevX;
    y += e.touches[0].screenY - prevY;
    prevX = e.touches[0].screenX;
    prevY = e.touches[0].screenY;
    img.style.transform = `translate(${x}px,${y}px)`;
  });

  document.addEventListener('click', e => {
    if (checkMouse(e, true) || checkTouch(e, true)) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function checkMouse(e, click = false) {
    return (
      e instanceof MouseEvent &&
      basicLightbox.visible() &&
      e.target.tagName === 'IMG' &&
      (click ? hasMoved(e) : e.buttons === 1)
      //(click ? (downX - e.screenX) ** 2 + (downY - e.screenY) ** 2 > 1 : e.buttons === 1)
    );
  }

  function checkTouch(e, click = false) {
    return (
      e instanceof TouchEvent &&
      basicLightbox.visible() &&
      e.target.tagName === 'IMG' &&
      (click ? hasMoved(e.touches[0]) : e.touches.length === 1)
      //? (downX - e.touches[0].screenX) ** 2 + (downY - e.touches[0].screenY) ** 2 > 1
    );
  }

  function hasMoved(obj) {
    return (obj.screenX - downX) ** 2 + (obj.screenY - downY) ** 2 > 1;
  }
}
