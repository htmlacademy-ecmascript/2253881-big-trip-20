import oneWayPointPresenter from './oneWayPointPresenter';

export default class wayPointsPresenter {
  content = null;
  changingIsFavourite = null;
  constructor(content, changingIsFavourite) {
    this.content = content;
    this.arrayOfInst = [];
    this.changingIsFavourite = changingIsFavourite;
  }

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
