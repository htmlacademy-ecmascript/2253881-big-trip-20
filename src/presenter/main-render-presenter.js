import { render, RenderPosition } from '../framework/render';
import { SORT_TYPES } from '../framework/conts';
import ErrorDwnl from '../view/ErrorDwnl';
import ListOfFilters from '../view/ListOfFilters';
import TripInfo from '../view/TripInfo';
import ListOfSort from '../view/ListOfSort';
import OneWayPointPresenter from './one-way-point-presenter';
import dayjs from 'dayjs';

import { getWeightForNullDate } from '../framework/utils';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

export default class MainRender {
  content = null;
  #backupContent;
  #sortType = SORT_TYPES.day;
  #arrayOfInst = new Map();

  constructor(content) {
    this.content = content;
  }

  #sortList = (type) => {
    if (this.#sortType === type) {
      return;
    }

    switch (type) {
      case SORT_TYPES.day:
        this.content = [...this.#backupContent];
        break;
      case SORT_TYPES.time:
        this.content.sort((a, b) => {
          const isNull = getWeightForNullDate(a.dateTo, b.dateTo);
          const firstDate = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
          const secondDate = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
          return isNull ?? secondDate - firstDate;
        });
        break;
      case SORT_TYPES.price:
        this.content.sort((a, b) => {
          const first = a.offers.offers.reduce(
            (acc, elem) => (acc += elem.price),
            0
          );
          const second = b.offers.offers.reduce(
            (acc, elem) => (acc += elem.price),
            0
          );
          return second - first;
        });
        break;
      default:
        return;
    }
    this.#sortType = type;
    this.resetList();
    this.#renderAllElems(this.content);
  };

  changingIsFavourite = (id) => {
    this.content = this.content.map((elem) => {
      if (elem.id === id) {
        elem.isFavourite = !elem.isFavourite;
        return elem;
      }
      return elem;
    });

    this.#arrayOfInst.forEach((elem) => {
      elem.destroy();
    });
    this.#renderAllElems(this.content);
  };

  init() {
    this.#backupContent = [...this.content];

    if (this.content.length) {
      render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
      render(
        new ListOfSort({ handleSort: this.#sortList }),
        sortContainerElem,
        RenderPosition.AFTERBEGIN
      );

      this.#renderAllElems(this.content);
    } else {
      render(new ErrorDwnl(), sortContainerElem, RenderPosition.BEFOREEND);
    }
    render(
      new ListOfFilters(this.content),
      filterContainerElem,
      RenderPosition.BEFOREEND
    );
  }

  resetList() {
    this.#arrayOfInst.forEach((elem) => {
      elem.destroy();
    });
    this.#arrayOfInst.clear();
  }

  resetToClose = () => {
    this.#arrayOfInst.forEach((elem) => {
      elem.resetView();
    });
  };

  #renderOneElem(elem) {
    const newWayPoint = new OneWayPointPresenter(
      elem,
      this.changingIsFavourite,
      this.resetToClose
    );
    this.#arrayOfInst.set(elem.id, newWayPoint);
    newWayPoint.init();
  }

  #renderAllElems() {
    for (let i = 0; i < this.content.length; i++) {
      this.#renderOneElem(this.content[i]);
    }
  }
}
