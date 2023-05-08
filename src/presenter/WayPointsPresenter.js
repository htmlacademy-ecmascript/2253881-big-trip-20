import oneWayPointPresenter from './oneWayPointPresenter';

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
    this.init(this.content);
  };

  resetList() {
    this.arrayOfInst.forEach((elem) => {
      elem.destroy();
    });
    this.arrayOfInst = [];
  }

  resetToClose = () => {
    this.arrayOfInst.forEach((elem) => {
      elem.resetView();
    });
  };

  #renderOneElem(elem) {
    const newWayPoint = new oneWayPointPresenter(
      elem,
      this.changingIsFavourite,
      this.resetToClose
    );
    this.arrayOfInst.push(newWayPoint);
    newWayPoint.init(this.content);
  }

  init(data) {
    for (let i = 0; i < data.length; i++) {
      this.#renderOneElem(data[i]);
    }
  }
}
