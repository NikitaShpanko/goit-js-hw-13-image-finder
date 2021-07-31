import PixabayGallery from './PixabayGallery';

export default class InfiniteGallery extends PixabayGallery {
  #observer;
  constructor(parentElem, config) {
    super(parentElem, config);
    this.#observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.#observer.unobserve(entry.target);
            this.updateQuery(this.query, this.page + 1, false);
          }
        });
      },
      //{ root: document /*, threshold: 0.5*/ },
    );
  }

  async updateQuery(query, page = 1, clear = true) {
    if (clear) scrollTo(0, 0);
    await super.updateQuery(query, page, clear);
    if (this.page < this.pageCount) {
      this.#observer.observe(this.parent.querySelector('li:last-child'));
    }
  }
}
