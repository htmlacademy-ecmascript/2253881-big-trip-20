import ErrorOnDownloadView from '../view/error-on-download-view';
import TripInfoView from '../view/trip-info-view';
import ListOfSortView from '../view/list-of-sort-view';
import OneWayPointPresenter from './one-way-point-presenter';
import NewEventPresenter from '../presenter/new-event-presenter';
import EventListView from '../view/event-list-view';
import LoadingView from '../view/loading-view';
import { getWeightForNullDate, filter } from '../framework/utils';
import { render, RenderPosition, remove } from '../framework/render';
import {
  SORT_TYPES,
  UPDATE_TYPE,
  USER_ACTION,
  FILTER_TYPE,
} from '../framework/consts';
import dayjs from 'dayjs';

const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

export default class MainRender {
  #eventsModel = null;
  #filterModel = null;
  #sortType = SORT_TYPES.day;
  #filterType = FILTER_TYPE.EVERYTHING;
  #instsOfPresenters = new Map();
  #isLoading = true;

  #newEventPresenter = null;

  #ulListComponent = null;
  #sortComponent = null;
  #loadingComponent = null;
  #noEventsComponent = null;
  #tripInfoViewComponent = null;

  constructor({ eventsModel, filterModel, onNewEventDestroy }) {
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      onDataChange: this.#handleModelDataChange,
      onDestroy: onNewEventDestroy,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = [...this.#eventsModel.events];
    const filteredEvents = filter[this.#filterType](events);
    switch (this.#sortType) {
      case SORT_TYPES.day:
        return filteredEvents;
      case SORT_TYPES.time:
        return filteredEvents.sort((a, b) => {
          const isNull = getWeightForNullDate(a.dateTo, b.dateTo);
          const firstDate = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
          const secondDate = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
          return isNull ?? secondDate - firstDate;
        });
      case SORT_TYPES.price:
        return filteredEvents.sort((a, b) => {
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
        return filteredEvents;
    }
  }

  createEvent() {
    this.#sortType = SORT_TYPES.day;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#newEventPresenter.mainRender();
  }

  #handleModelDataChange = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
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
        this.#instsOfPresenters.get(update.id).mainRender(update);
        break;
      case UPDATE_TYPE.MINOR:
        this.#resetEventsList();
        this.#renderAllEvents(this.events);
        break;
      case UPDATE_TYPE.MAJOR:
        this.#resetAllComponents(true);
        this.renderMain();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        this.#resetAllComponents(true);
        this.renderMain();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
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
    this.#tripInfoViewComponent = new TripInfoView();
    render(
      this.#tripInfoViewComponent,
      tripMainContElem,
      RenderPosition.AFTERBEGIN
    );
  }

  #renderUlList() {
    this.#ulListComponent = new EventListView();
    render(this.#ulListComponent, sortContainerElem, RenderPosition.BEFOREEND);
  }

  #renderLoading() {
    this.#loadingComponent = new LoadingView();
    render(this.#loadingComponent, sortContainerElem, RenderPosition.BEFOREEND);
  }

  #renderSort() {
    this.#sortComponent = new ListOfSortView({
      handleSort: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, sortContainerElem, RenderPosition.AFTERBEGIN);
  }

  #renderNoEvents() {
    this.#noEventsComponent = new ErrorOnDownloadView({
      filterType: this.#filterType,
    });
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
    newWayPoint.mainRender(elem);
  }

  #renderAllEvents(events) {
    for (let i = 0; i < events.length; i++) {
      this.#renderOneEvent(events[i]);
    }
  }

  renderMain() {
    this.#renderUlList();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.events.length) {
      this.#renderNoEvents();
      return;
    }

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

  #resetAllComponents(resetSort) {
    this.#newEventPresenter.destroy();
    this.#resetEventsList();

    if (this.#renderNoEvents) {
      remove(this.#noEventsComponent);
    }
    remove(this.#loadingComponent);
    remove(this.#tripInfoViewComponent);
    remove(this.#sortComponent);
    remove(this.#ulListComponent);
    if (resetSort) {
      this.#sortType = SORT_TYPES.day;
    }
  }
}
