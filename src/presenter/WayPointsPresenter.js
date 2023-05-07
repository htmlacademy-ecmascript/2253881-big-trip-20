import OneWayPointPresenter from './OneWayPointPresenter';

export default class WayPointsPresenter {
  content = null;

  constructor(content) {
    this.content = content;
  }

  isFavouriteChanging() {
    console.log(this.content);
  }

  #renderOneElem(elem) {
    const newWayPoint = new OneWayPointPresenter(
      elem,
      this.isFavouriteChanging
    );

    newWayPoint.init();
  }

  init() {
    for (let i = 0; i < this.content.length; i++) {
      this.#renderOneElem(this.content[i]);
    }
  }
}
