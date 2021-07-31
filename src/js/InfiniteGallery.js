import PixabayGallery from './PixabayGallery';

export default class InfiniteGallery extends PixabayGallery {
  #errHandler;
  #observer;
  constructor(parentElem, config, errHandler) {
    super(parentElem, config);
    this.#errHandler = errHandler;
    this.#observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.#observer.unobserve(entry.target);
          this.updateQuery(this.query, this.page + 1, false);
        }
      });
    });
  }

  async updateQuery(query, page = 1, clear = true) {
    if (clear) {
      scrollTo(0, 0);
      this.#observer.disconnect();
    }
    if (!(await super.updateQuery(query, page, clear))) {
      this.#errHandler();
      return false;
    }

    if (this.pageCount && this.page < this.pageCount) {
      this.#observer.observe(this.parent.querySelector('li:last-child'));
    }
    return true;
  }
}
