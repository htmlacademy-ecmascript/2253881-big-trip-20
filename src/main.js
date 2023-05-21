import MainRender from './presenter/main-render-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventModel from './models/event-model';
import FilterModel from './models/filter-model';
import ButtonNewEventView from './view/buttom-new-event-view';
import EventListView from './view/event-list-view';
import { render, RenderPosition } from './framework/render';

const containerForButton = document.querySelector('.trip-main');
const sortContainerElem = document.querySelector('.trip-events');

const ulListContainer = new EventListView();
render(ulListContainer, sortContainerElem, RenderPosition.BEFOREEND);

const createEventButton = new ButtonNewEventView({
  onClick: handleNewEventButtonClick,
});

const eventsModel = new EventModel();
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

render(createEventButton, containerForButton, RenderPosition.BEFOREEND);

filterPresenter.mainRender();
mainPresenter.renderMain();
