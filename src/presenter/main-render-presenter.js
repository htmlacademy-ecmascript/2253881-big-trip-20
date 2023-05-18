import { render, RenderPosition } from '../framework/render';
import { SORT_TYPES } from '../framework/conts';
import ErrorDwnl from '../view/error-on-download-view';
import ListOfFilters from '../view/list-of-filters-view';
import TripInfo from '../view/trip-info-view';
import ListOfSort from '../view/list-of-sort-view';
import EventList from '../view/event-list-view';
import OneWayPointPresenter from './one-way-point-presenter';
import { getWeightForNullDate } from '../framework/utils';
import dayjs from 'dayjs';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

export default class MainRender {
  #eventsList = null;
  #eventsModel = null;
  #backupContent = [];
  #sortType = SORT_TYPES.day;
  #arrayOfInst = new Map();

  constructor({ eventsModel }) {
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver();
  }

  #sortList = (type) => {
    if (this.#sortType === type) {
      return;
    }

    switch (type) {
      case SORT_TYPES.day:
        this.#eventsList = [...this.#backupContent];
        break;
      case SORT_TYPES.time:
        this.#eventsList.sort((a, b) => {
          const isNull = getWeightForNullDate(a.dateTo, b.dateTo);
          const firstDate = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
          const secondDate = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
          return isNull ?? secondDate - firstDate;
        });
        break;
      case SORT_TYPES.price:
        this.#eventsList.sort((a, b) => {
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
    this.#resetList();
    this.#renderAllElems();
  };

  init() {
    this.#eventsList = this.#eventsModel.events;
    // this.#eventsList = [];
    this.#backupContent = [...this.#eventsList];

    render(
      new ListOfFilters(this.#eventsList),
      filterContainerElem,
      RenderPosition.BEFOREEND
    );

    if (!this.#eventsList.length) {
      render(new ErrorDwnl(), sortContainerElem, RenderPosition.BEFOREEND);
      return;
    }
    //ul list
    render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);
    render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
    render(
      new ListOfSort({ handleSort: this.#sortList }),
      sortContainerElem,
      RenderPosition.AFTERBEGIN
    );
    this.#renderAllElems();
  }

  #handleEventChange = (newEvent) => {
    this.#eventsList = this.#eventsList.map((el) =>
      el.id === newEvent.id ? newEvent : el
    );

    this.#arrayOfInst.get(newEvent.id).init(newEvent);
  };

  #updateBackup = (newEvent) => {
    this.#backupContent = this.#backupContent.map((el) =>
      el.id === newEvent.id ? newEvent : el
    );
  };

  #resetList() {
    this.#arrayOfInst.forEach((elem) => {
      elem.destroy();
    });
    this.#arrayOfInst.clear();
  }

  #handleModeChange = () => {
    this.#arrayOfInst.forEach((elem) => {
      elem.resetView();
    });
  };

  #renderOneElem(elem) {
    const newWayPoint = new OneWayPointPresenter({
      data: elem,
      handleModeChange: this.#handleModeChange,
      handleEventChange: this.#handleEventChange,
      updateBackup: this.#updateBackup,
    });
    this.#arrayOfInst.set(elem.id, newWayPoint);
    newWayPoint.init(elem);
  }

  #renderAllElems() {
    for (let i = 0; i < this.#eventsList.length; i++) {
      this.#renderOneElem(this.#eventsList[i]);
    }
  }
}
