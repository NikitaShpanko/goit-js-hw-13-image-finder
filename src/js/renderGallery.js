import imagesTpl from '../tpl/images.hbs';

export default function (data) {
  if (data) this.insertAdjacentHTML('beforeend', imagesTpl(data));
}
