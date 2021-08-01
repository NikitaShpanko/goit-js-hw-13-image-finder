import * as basicLightbox from 'basiclightbox';
import modalTpl from '../tpl/modal.hbs';

import QuerySel from './QuerySel';

export default function (selector, config) {
  let instance,
    html,
    x,
    y,
    downX,
    downY,
    prevX,
    prevY,
    loaded = false;

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

    loaded = false;
    html.img.addEventListener('load', function fn(e) {
      loaded = true;
      html.img.removeEventListener('load', fn);
    });
  });

  document.addEventListener('keydown', e => {
    if (!basicLightbox.visible()) return;
    if (config.escapeKeys.includes(e.code)) {
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

  document.addEventListener('mouseup', intersectionClose);

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

  document.addEventListener('touchend', intersectionClose);

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

  window.addEventListener('resize', () => {
    html.a.style.opacity = 1;
  });

  function movePic(dx, dy) {
    x += dx;
    y += dy;
    html.a.style.transform = `translate(${x}px,${y}px)`;
    html.a.style.opacity = intersectRatio();
  }

  function isMoving(e) {
    return basicLightbox.visible() &&
      loaded &&
      e.target === html.img && //
      isTouch(e)
      ? e.touches.length === 1
      : e.buttons === 1; // left button
  }

  function hasMoved(e) {
    e = isTouch(e) ? e.touches[0] : e;
    return (e.screenX - downX) ** 2 + (e.screenY - downY) ** 2 > 1;
  }

  function intersectRatio() {
    const cX = Math.min(html._parent.clientWidth, html.modal.clientWidth);
    const cY = Math.min(html._parent.clientHeight, html.modal.clientHeight);
    const sX = html.a.scrollWidth;
    const sY = html.a.scrollHeight;

    let x1 = x;
    let y1 = y - (sY - cY) / 2;
    let x2 = x + sX;
    let y2 = y + (sY + cY) / 2;

    x1 = x1 > 0 ? x1 : 0;
    y1 = y1 > 0 ? y1 : 0;
    x2 = x2 < cX ? x2 : cX;
    y2 = y2 < cY ? y2 : cY;

    return ((x2 - x1) * (y2 - y1)) / (cX * cY);
  }

  function intersectionClose() {
    if (!(basicLightbox.visible() && loaded)) return;
    if (intersectRatio() < config.intersectToClose) {
      instance.close();
    } else {
      html.a.style.opacity = 1;
    }
  }
}

function isTouch(e) {
  return e instanceof TouchEvent;
}
