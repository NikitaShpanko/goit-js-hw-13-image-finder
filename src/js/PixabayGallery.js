import imagesTpl from '../tpl/images.hbs';

export default class PixabayGallery {
  #parentElem;
  #config;
  #query = '';
  #page = 1;
  #pageCount = 0;
  #pixResponse = {};

  constructor(parentElem, config) {
    this.#parentElem = parentElem;
    this.#config = { ...config };
  }

  async updateQuery(query, page = 1, clear = true) {
    if (!query || (query === this.#query && page === this.#page)) return;
    try {
      const { orientation, per_page, key } = this.#config;
      const f = await fetch(
        `https://pixabay.com/api/?image_type=photo&orientation=${orientation}&q=${query}&page=${page}&per_page=${per_page}&key=${key}`,
      );
      if (!f.ok) return false;
      this.#pixResponse = { ...(await f.json()) };
      this.#query = query;
      this.#page = page;
      this.#pageCount = Math.ceil(this.#pixResponse.total / per_page);
      if (clear) this.clear();
      this.render();
      return true;
    } catch {
      return false;
    }
  }

  render() {
    if (this.#page > this.#pageCount) return;
    this.#parentElem.insertAdjacentHTML('beforeend', imagesTpl(this.#pixResponse));
  }

  clear() {
    this.#parentElem.innerHTML = '';
  }

  get query() {
    return this.#query;
  }

  get page() {
    return this.#page;
  }

  get pageCount() {
    return this.#pageCount;
  }

  get data() {
    return this.#pixResponse;
  }

  get parent() {
    return this.#parentElem;
  }

  get foundItemCount() {
    return this.#pixResponse.total;
  }
}
