import { replace } from '../framework/render';
import OneWayPointPresenter from './OneWayPointPresenter';

export default class WayPointsPresenter {
  content = null;

  constructor(content) {
    this.content = content;
    this.arrayOfInst = [];
  }

  changingIsFavourite = (id) => {
    this.content = this.content.map((elem) => {
      if (elem.id === id) {
        elem.isFavourite = !elem.isFavourite;
        return elem;
      }
      return elem;
    });

    this.arrayOfInst.forEach((elem) => {
      elem.destroy();
    });

    this.init();
  };

  #renderOneElem(elem) {
    const newWayPoint = new OneWayPointPresenter(
      elem,
      this.changingIsFavourite
    );
    this.arrayOfInst.push(newWayPoint);
    newWayPoint.init();
  }

  init() {
    for (let i = 0; i < this.content.length; i++) {
      this.#renderOneElem(this.content[i]);
    }
  }
}
