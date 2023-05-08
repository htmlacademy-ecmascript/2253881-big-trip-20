import { render, RenderPosition } from '../framework/render';
import { SORT_TYPES } from '../framework/conts';
import ErrorDwnl from '../view/errorDwnl';
import ListOfFilters from '../view/ListOfFilters';
import wayPointsPresenter from './wayPointsPresenter';
import headerPresenter from './headerPresenter';
import { sortTaskUp } from '../framework/utils';
import dayjs from 'dayjs';

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
        this.content.sort(sortTaskUp);
        break;
      case SORT_TYPES.event:
        this.content.sort((a, b) => {
          if (a.type.toLowerCase() < b.type.toLowerCase()) {
            return -1;
          }
          if (a.type.toLowerCase() > b.type.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        break;
      case SORT_TYPES.time:
        this.content.sort((a, b) => {
          const firstDate = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
          const secondDate = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
          return firstDate - secondDate;
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
          return first - second;
        });
        break;
      case SORT_TYPES.offers:
        this.content.sort(
          (a, b) => a.offers.offers.length - b.offers.offers.length
        );
        break;
      default:
        break;
    }
    this.#sortType = type;
    this.#WayPointPresenter.resetList();
    this.#WayPointPresenter.init(this.content);
  };

  init() {
    if (this.#WayPointPresenter !== null) {
      this.#backupContent = [...this.#WayPointPresenter.content];
    }

    this.#headerPresenter = new headerPresenter(this.content, this.#sortList);
    this.#WayPointPresenter = new wayPointsPresenter(this.content);

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
