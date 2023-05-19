import MainRender from './presenter/main-render-presenter';
import EventModel from './models/event-model';

const eventsModel = new EventModel();
// const infosContent = [];

const mainBoard = new MainRender({ eventsModel });

mainBoard.renderMain();
