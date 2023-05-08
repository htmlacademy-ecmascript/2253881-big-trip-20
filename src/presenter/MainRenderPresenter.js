import { render, RenderPosition } from '../framework/render';
import { SORT_TYPES } from '../framework/conts';
import ErrorDwnl from '../view/ErrorDwnl';
import ListOfFilters from '../view/ListOfFilters';
import WayPointsPresenter from './WayPointsPresenter';
import HeaderPresenter from './HeaderPresenter';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');

export default class MainRender {
  content = null;
  #backupContent;
  #WayPointPresenter = null;
  #HeaderPresenter = null;
  #sortType = SORT_TYPES.day;

  constructor(content) {
    this.content = content;
  }

  #sortList = (type) => {
    if (this.#sortType === type) {
      return;
    }
    console.log('kakat');
    console.log(this.#WayPointPresenter.content);
    //sort
    //clear
    //render
  };

  init() {
    if (this.#WayPointPresenter !== null) {
      this.#backupContent = [...this.#WayPointPresenter.content];
    }
    this.#HeaderPresenter = new HeaderPresenter(this.content, this.#sortList);
    this.#WayPointPresenter = new WayPointsPresenter(this.content);

    if (this.content.length) {
      this.#HeaderPresenter.init();
      this.#WayPointPresenter.init(this.content);
    } else {
      render(new ErrorDwnl(), sortContainerElem, RenderPosition.BEFOREEND);
    }
    render(
      new ListOfFilters(this.content),
      filterContainerElem,
      RenderPosition.BEFOREEND
    );
  }
}
