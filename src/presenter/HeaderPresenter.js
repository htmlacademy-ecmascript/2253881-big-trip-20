import { render, RenderPosition } from '../framework/render';
import TripInfo from '../view/TripInfo';
import ListOfSort from '../view/listOfSort';
import ErrorDwnl from '../view/ErrorDwnl';

const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

export default class headerPresenter {
  #data = null;
  #sortList = null;

  constructor(data, sortList) {
    this.#data = data;
    this.#sortList = sortList;
  }

  init() {
    if (this.#data.length !== 0) {
      render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
      render(
        new ListOfSort({ handleSort: this.#sortList }),
        sortContainerElem,
        RenderPosition.AFTERBEGIN
      );
    } else {
      render(new ErrorDwnl(), sortContainerElem, RenderPosition.BEFOREEND);
    }
  }
}
