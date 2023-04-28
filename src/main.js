import ListOfFilters from './view/list-filter';
import ListOfSort from './view/sort-list';
import TripInfo from './view/trip-info';
import EventList from './view/trip-event-list';
import Event from './view/event';
import EventWithContent from './view/event-with-content';
import { render, RenderPosition } from './render';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
render(new ListOfFilters(), filterContainerElem, RenderPosition.BEFOREEND);
render(new ListOfSort(), sortContainerElem, RenderPosition.AFTERBEGIN);

//общий список ul
render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);

const tripEventsListElem = document.querySelector('.trip-events__list');

render(new EventWithContent(), tripEventsListElem, RenderPosition.AFTERBEGIN);

render(new Event(), tripEventsListElem, RenderPosition.BEFOREEND);
render(new Event(), tripEventsListElem, RenderPosition.BEFOREEND);
render(new Event(), tripEventsListElem, RenderPosition.BEFOREEND);
