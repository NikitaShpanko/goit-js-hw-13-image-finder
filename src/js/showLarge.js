import * as basicLightbox from 'basiclightbox';
import modalTpl from '../tpl/modal.hbs';

import QuerySel from './QuerySel';

export default function (selector, escapeKeys) {
  let instance, html, x, y, downX, downY, prevX, prevY;

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

    html = new QuerySel({ parent: instance.element() }, 'img', 'a', '.modal');
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
    if (!isMoving(e)) return;
    downX = e.screenX;
    downY = e.screenY;
  });

  document.addEventListener('mousemove', e => {
    if (!isMoving(e)) return;
    e.preventDefault();
    movePic(e.movementX, e.movementY);
  });

  document.addEventListener('touchstart', e => {
    if (!isMoving(e)) return;
    prevX = e.touches[0].screenX;
    prevY = e.touches[0].screenY;
    downX = prevX;
    downY = prevY;
  });

  document.addEventListener('touchmove', e => {
    if (!isMoving(e)) return;
    e.preventDefault();
    e.stopPropagation();
    movePic(
      e.touches[0].screenX - prevX, //
      e.touches[0].screenY - prevY,
    );
    prevX = e.touches[0].screenX;
    prevY = e.touches[0].screenY;
  });

  document.addEventListener('click', e => {
    if (!basicLightbox.visible()) return;
    if (e.target === html.img) {
      if (hasMoved(e)) {
        e.preventDefault();
        e.stopPropagation();
      }
    } else if (e.target === html.modal) {
      instance.close();
    }
  });

  function movePic(dx, dy) {
    x += dx;
    y += dy;
    html.a.style.transform = `translate(${x}px,${y}px)`;
  }

  function isMoving(e) {
    return basicLightbox.visible() && //
      e.target === html.img &&
      isTouch(e)
      ? e.touches.length === 1
      : e.buttons === 1; // left button
  }

  function hasMoved(e) {
    e = isTouch(e) ? e.touches[0] : e;
    return (e.screenX - downX) ** 2 + (e.screenY - downY) ** 2 > 1;
  }
}

function isTouch(e) {
  return e instanceof TouchEvent;
}
