import { render, RenderPosition, remove } from '../framework/render';
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
  #eventsModel = null;
  #sortType = SORT_TYPES.day;
  #arrayOfInst = new Map();

  #sortComponent = null;
  #noEventsComponent = new ErrorDwnl();
  #listFiltersComponent = null;
  #tripInfoComponent = null;
  #ulListComponent = new EventList();

  constructor({ eventsModel }) {
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch (this.#sortType) {
      case SORT_TYPES.day:
        return this.#eventsModel.events;
      case SORT_TYPES.time:
        return [...this.#eventsModel.events].sort((a, b) => {
          const isNull = getWeightForNullDate(a.dateTo, b.dateTo);
          const firstDate = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
          const secondDate = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
          return isNull ?? secondDate - firstDate;
        });

      case SORT_TYPES.price:
        return [...this.#eventsModel.events].sort((a, b) => {
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
      default:
        return this.#eventsModel.events;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
  };

  #handleModelEvent = (undateType, update) => {
    console.log(undateType, update);
  };

  #handleSortTypeChange(sortType) {
    if (this.#sortType === sortType) {
      return;
    }

    this.#sortType = sortType;
    this.#resetList();
    this.#renderAllEvents(this.events);
  }

  #handleEventChange = (newEvent) => {
    this.#arrayOfInst.get(newEvent.id).init(newEvent);
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

  #renderSort() {
    this.#sortComponent = new ListOfSort({
      handleSort: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, sortContainerElem, RenderPosition.AFTERBEGIN);
  }

  #noEventsRender() {
    render(new ErrorDwnl(), sortContainerElem, RenderPosition.BEFOREEND);
  }

  #renderOneEvent(elem) {
    const newWayPoint = new OneWayPointPresenter({
      data: elem,
      handleModeChange: this.#handleModeChange,
      handleEventChange: this.#handleViewAction,
    });
    this.#arrayOfInst.set(elem.id, newWayPoint);
    newWayPoint.init(elem);
  }

  #renderAllEvents(events) {
    for (let i = 0; i < events.length; i++) {
      this.#renderOneEvent(events[i]);
    }
  }

  #mainRender() {
    if (!this.events.length) {
      this.#noEventsRender();
    }
  }
}
