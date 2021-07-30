import imagesTpl from '../tpl/images.hbs';

export default class PixabayGallery {
  #parentElem;
  #config;
  #query = '';
  #page = 1;
  #pixResponse = {};

  constructor(parentElem, config) {
    this.#parentElem = parentElem;
    this.#config = { ...config };
  }

  async updateQuery(query, page = 1) {
    if (!query || (query === this.#query && page === this.#page)) return;
    try {
      const { orientation, per_page, key } = this.#config;
      const f = await fetch(
        `https://pixabay.com/api/?image_type=photo&orientation=${orientation}&q=${query}&page=${page}&per_page=${per_page}&key=${key}`,
      );
      this.#pixResponse = await f.json();
      this.#query = query;
      this.#page = page;
      this.render();
      //console.log(this.#pixResponse);
      //return await f.json();
    } catch (err) {
      console.warn(err);
      //return null;
    }
  }

  render() {
    if (!this.#pixResponse?.hits?.length) return;
    this.#parentElem.insertAdjacentHTML('beforeend', imagesTpl(this.#pixResponse));
  }
}
