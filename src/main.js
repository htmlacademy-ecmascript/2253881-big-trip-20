import MainRender from './presenter/main-render-presenter';
import ListOfFilters from './view/list-of-filters-view';
import EventModel from './models/event-model';
import FilterModel from './models/filter-model';
import { render, RenderPosition } from './framework/render';

const eventsModel = new EventModel();
const filterModel = new FilterModel();

const filterContainerElem = document.querySelector('.trip-controls__filters');
const mainBoard = new MainRender({ eventsModel });

render(
  new ListOfFilters({ filterModel }),
  filterContainerElem,
  RenderPosition.BEFOREEND
);

mainBoard.renderMain();
