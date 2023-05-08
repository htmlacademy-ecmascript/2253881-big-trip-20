import { render, RenderPosition } from '../framework/render';
import TripInfo from '../view/TripInfo';
import ListOfSort from '../view/ListOfSort';
import ErrorDwnl from '../view/ErrorDwnl';

const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

export default class HeaderPresenter {
  #data = null;

  constructor(data) {
    this.#data = data;
  }

  init() {
    if (this.#data.length !== 0) {
      render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
      render(new ListOfSort(), sortContainerElem, RenderPosition.AFTERBEGIN);
    } else {
      render(new ErrorDwnl(), sortContainerElem, RenderPosition.BEFOREEND);
    }
  }
}
