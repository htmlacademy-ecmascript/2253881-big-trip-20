import AbstractView from '../framework/view/abstract-view';
import OneWayPointPresenter from './OneWayPointPresenter';

export default class WayPointsPresenter extends AbstractView {
  #content = null;

  constructor(data) {
    super();
    this.#content = data;
  }

  #renderOneElem(elem) {
    const newWayPoint = new OneWayPointPresenter(elem);
    newWayPoint.init();
  }

  init() {
    for (let i = 0; i < this.#content.length; i++) {
      this.#renderOneElem(this.#content[i]);
    }
  }
}
