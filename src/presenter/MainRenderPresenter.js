import { render, RenderPosition } from '../framework/render';
import { SORT_TYPES } from '../framework/conts';
import ErrorDwnl from '../view/errorDwnl';
import ListOfFilters from '../view/listOfFilters';
import WayPointsPresenter from './wayPointsPresenter';
import HeaderPresenter from './headerPresenter';
import dayjs from 'dayjs';

import { getWeightForNullDate } from '../framework/utils';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');

export default class MainRender {
  content = null;
  #backupContent;
  #WayPointPresenter = null;
  #headerPresenter = null;
  #sortType = SORT_TYPES.day;

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
    this.#WayPointPresenter.resetList();
    this.#WayPointPresenter.init(this.content);
  };

  changingIsFavourite = (id) => {
    this.content = this.content.map((elem) => {
      if (elem.id === id) {
        elem.isFavourite = !elem.isFavourite;
        return elem;
      }
      return elem;
    });

    this.#WayPointPresenter.arrayOfInst.forEach((elem) => {
      elem.destroy();
    });
    this.#WayPointPresenter.init(this.content);
  };

  init() {
    this.#headerPresenter = new HeaderPresenter(this.content, this.#sortList);
    this.#WayPointPresenter = new WayPointsPresenter(
      this.content,
      this.changingIsFavourite
    );
    this.#backupContent = [...this.#WayPointPresenter.content];

    if (this.content.length) {
      this.#headerPresenter.init();
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
