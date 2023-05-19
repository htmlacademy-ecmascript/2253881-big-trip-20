import MainRender from './presenter/main-render-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventModel from './models/event-model';
import FilterModel from './models/filter-model';

const eventsModel = new EventModel();
const filterModel = new FilterModel();
const mainPresenter = new MainRender({ eventsModel });
const filterPresenter = new FilterPresenter({ filterModel, eventsModel });

filterPresenter.mainRender();
mainPresenter.renderMain();
