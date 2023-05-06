import { render, RenderPosition } from '../framework/render';
import TripInfo from '../view/TripInfo';
import ListOfSort from '../view/ListOfSort';
import ErrorDwnl from '../view/ErrorDwnl';
import ListOfFilters from '../view/ListOfFilters';
import WayPointsPresenter from './WayPointsPresenter';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

export default class MainRender {
  #content = null;
  #TripInfo = null;
  #ListOfSort = null;
  #WayPointPresenter = null;

  constructor(content) {
    this.#content = content;
    this.#TripInfo = new TripInfo(this.#content);
    this.#ListOfSort = new ListOfSort(this.#content);
    this.#WayPointPresenter = new WayPointsPresenter(this.#content);
  }

  init() {
    if (this.#content.length !== 0) {
      render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
      render(new ListOfSort(), sortContainerElem, RenderPosition.AFTERBEGIN);
      this.#WayPointPresenter.init();
    } else {
      render(new ErrorDwnl(), sortContainerElem, RenderPosition.BEFOREEND);
    }
    render(
      new ListOfFilters(this.#content),
      filterContainerElem,
      RenderPosition.BEFOREEND
    );
  }
}
