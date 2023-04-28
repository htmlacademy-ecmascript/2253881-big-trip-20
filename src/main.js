import ListOfFilters from './view/list-filter';
import ListOfSort from './view/sort-list';
import TripInfo from './view/trip-info';
import EventList from './view/trip-event-list';
import { render, RenderPosition } from './render';
import UlListRender from './view/ul-list-render';

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
render(new ListOfFilters(), filterContainerElem, RenderPosition.BEFOREEND);
render(new ListOfSort(), sortContainerElem, RenderPosition.AFTERBEGIN);

//общий список ul
render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);

const contentList = new UlListRender();
contentList.init();
