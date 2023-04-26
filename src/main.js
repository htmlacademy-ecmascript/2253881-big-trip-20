import ListOfFilters from './view/list-filter';
import ListOfSort from './view/sort-list';
import TripInfo from './view/trip-info';
import EventHeader from './view/event-header';
import EventList from './view/trip-event-list';
import EventItem from './view/trip-event-item';
import FormEdit from './view/event-edit';
import EventDetails from './view/event-details';
import EventSectionOffers from './view/event-section-offers';
import EventSectionDestination from './view/event-section-destination';
import Event from './view/event';
import { render, RenderPosition } from './render';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
render(new ListOfFilters(), filterContainerElem, RenderPosition.BEFOREEND);
render(new ListOfSort(), sortContainerElem, RenderPosition.AFTERBEGIN);
render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);

const tripEventsListElem = document.querySelector('.trip-events__list');

render(new EventItem(), tripEventsListElem, RenderPosition.AFTERBEGIN);

const liContainerElem = document.querySelector('.trip-events__item');

render(new FormEdit(), liContainerElem, RenderPosition.AFTERBEGIN);

const formEditElem = document.querySelector('.event--edit');

render(new EventHeader(), formEditElem, RenderPosition.AFTERBEGIN);

render(new EventDetails(), formEditElem, RenderPosition.BEFOREEND);

const eventDetailsContainerElem = document.querySelector('.event__details');

render(
  new EventSectionOffers(),
  eventDetailsContainerElem,
  RenderPosition.AFTERBEGIN
);

render(
  new EventSectionDestination(),
  eventDetailsContainerElem,
  RenderPosition.BEFOREEND
);

render(new Event(), tripEventsListElem, RenderPosition.BEFOREEND);
render(new Event(), tripEventsListElem, RenderPosition.BEFOREEND);
render(new Event(), tripEventsListElem, RenderPosition.BEFOREEND);
