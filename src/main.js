import ListOfFilters from './view/ListOfFilters';
import ListOfSort from './view/ListOfSort';
import TripInfo from './view/TripInfo';
import EventList from './view/EventList';
import { render, RenderPosition } from './framework/render';
import UlListRender from './view/UlListRender';
import ErrorDwnl from './view/ErrorDwnl';
import { generateObj } from './mocks/mock';

const infosContent = generateObj(Math.floor(Math.random() * 10));
// const infosContent = [];

const filterContainerElem = document.querySelector('.trip-controls__filters');
const sortContainerElem = document.querySelector('.trip-events');
const tripMainContElem = document.querySelector('.trip-main');

if (infosContent.length !== 0) {
  render(new TripInfo(), tripMainContElem, RenderPosition.AFTERBEGIN);
  render(new ListOfSort(), sortContainerElem, RenderPosition.AFTERBEGIN);

  //общий список ul
  render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);
  const contentList = new UlListRender(infosContent);
  contentList.init();
} else {
  render(new ErrorDwnl(), sortContainerElem, RenderPosition.BEFOREEND);
}
render(
  new ListOfFilters(infosContent),
  filterContainerElem,
  RenderPosition.BEFOREEND
);
