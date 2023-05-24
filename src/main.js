import MainRender from './presenter/main-render-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventModel from './models/event-model';
import FilterModel from './models/filter-model';
import ButtonNewEventView from './view/buttom-new-event-view';
import EventsApiService from './events-api-sevices';
import { render, RenderPosition } from './framework/render';
import { URLS, AUTHORIZATION } from './framework/consts';

const containerForButton = document.querySelector('.trip-main');

const createEventButton = new ButtonNewEventView({
  onClick: handleNewEventButtonClick,
});

const eventsModel = new EventModel({
  eventsApiServices: new EventsApiService(URLS.MAIN, AUTHORIZATION),
});
eventsModel.downloadEvents().finally(() => {
  if (!eventsModel.destinations.length || !eventsModel.offers.length) {
    createEventButton.element.disabled = true;
  }
  render(createEventButton, containerForButton, RenderPosition.BEFOREEND);
});

const filterModel = new FilterModel();
const mainPresenter = new MainRender({
  eventsModel,
  filterModel,
  onNewEventDestroy: handleButtonNewEventClose,
});
const filterPresenter = new FilterPresenter({ filterModel, eventsModel });

function handleButtonNewEventClose() {
  createEventButton.element.disabled = false;
}

function handleNewEventButtonClick() {
  mainPresenter.createEvent();
  createEventButton.element.disabled = true;
}

filterPresenter.mainRender();
mainPresenter.renderMain();
