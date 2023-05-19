import { render, RenderPosition, remove } from '../framework/render';
import { SORT_TYPES, UPDATE_TYPE, USER_ACTION } from '../framework/conts';
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
  #instsOfPresenters = new Map();

  #sortComponent = null;
  #noEventsComponent = null;
  #listFiltersComponent = null;
  #tripInfoComponent = null;
  #ulListComponent = null;

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

  #handleModelDataChange = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_EVENT:
        this.#eventsModel.updateEvents(updateType, update);
        break;
      case USER_ACTION.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case USER_ACTION.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (undateType, update) => {
    switch (undateType) {
      case UPDATE_TYPE.PATCH:
        this.#instsOfPresenters.get(update.id).init(update);
        break;
      case UPDATE_TYPE.MINOR:
        this.#resetEventsList();
        this.#renderAllEvents(this.events);
        break;
      case UPDATE_TYPE.MAJOR:
        this.#resetAllComponents();
        this.renderMain();
        break;
    }
  };

  #handleModeChange = () => {
    this.#instsOfPresenters.forEach((elem) => {
      elem.resetView();
    });
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortType === sortType) {
      return;
    }
    this.#sortType = sortType;
    this.#handleModelEvent(UPDATE_TYPE.MINOR);
  };

  #renderTrip() {
    this.#tripInfoComponent = new TripInfo();
    render(
      this.#tripInfoComponent,
      tripMainContElem,
      RenderPosition.AFTERBEGIN
    );
  }

  #renderFilters() {
    this.#listFiltersComponent = new ListOfFilters(this.events);
    render(
      this.#listFiltersComponent,
      filterContainerElem,
      RenderPosition.BEFOREEND
    );
  }

  #renderSort() {
    this.#sortComponent = new ListOfSort({
      handleSort: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, sortContainerElem, RenderPosition.AFTERBEGIN);
  }

  #renderUlList() {
    this.#ulListComponent = new EventList();
    render(this.#ulListComponent, sortContainerElem, RenderPosition.BEFOREEND);
  }

  #renderNoEvents() {
    this.#noEventsComponent = new ErrorDwnl();
    render(
      this.#noEventsComponent,
      sortContainerElem,
      RenderPosition.BEFOREEND
    );
  }

  #renderOneEvent(elem) {
    const newWayPoint = new OneWayPointPresenter({
      data: elem,
      handleModeChange: this.#handleModeChange,
      handleModelDataChange: this.#handleModelDataChange,
    });
    this.#instsOfPresenters.set(elem.id, newWayPoint);
    newWayPoint.init(elem);
  }

  #renderAllEvents(events) {
    for (let i = 0; i < events.length; i++) {
      this.#renderOneEvent(events[i]);
    }
  }

  renderMain() {
    this.#renderFilters();
    if (!this.events.length) {
      this.#renderNoEvents();
      return;
    }

    this.#renderUlList();
    this.#renderTrip();
    this.#renderSort();
    this.#renderAllEvents(this.events);
  }

  #resetEventsList() {
    this.#instsOfPresenters.forEach((elem) => {
      elem.destroy();
    });
    this.#instsOfPresenters.clear();
  }

  #resetAllComponents({ resetSort = false }) {
    this.#resetEventsList();
    remove(this.#renderFilters);

    if (this.#renderNoEvents) {
      remove(this.#renderNoEvents);
    }

    remove(this.#ulListComponent);
    remove(this.#renderTrip);
    remove(this.#renderSort);

    if (resetSort) {
      this.#sortType = SORT_TYPES.day;
    }
  }
}
