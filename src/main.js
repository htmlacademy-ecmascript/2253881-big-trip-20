import MainRender from './presenter/main-render-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventModel from './models/event-model';
import FilterModel from './models/filter-model';
import AddNewEvent from './view/buttom-new-event-view';
import { render, RenderPosition } from './framework/render';

const containerForButton = document.querySelector('.trip-main');

render(new AddNewEvent(), containerForButton, RenderPosition.BEFOREEND);

const eventsModel = new EventModel();
const filterModel = new FilterModel();
const mainPresenter = new MainRender({ eventsModel, filterModel });
const filterPresenter = new FilterPresenter({ filterModel, eventsModel });

filterPresenter.mainRender();
mainPresenter.renderMain();
