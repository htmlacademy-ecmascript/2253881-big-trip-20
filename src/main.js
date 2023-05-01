import ListOfFilters from './view/ListOfFilters';
import ListOfSort from './view/ListOfSort';
import TripInfo from './view/TripInfo';
import EventList from './view/EventList';
import { render, RenderPosition } from './framework/render';
import UlListRender from './view/UlListRender';

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
