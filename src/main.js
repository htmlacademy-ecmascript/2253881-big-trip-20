import EventList from './view/eventList.js';
import { render, RenderPosition } from './framework/render';
import { generateObj } from './mocks/mock';
import MainRender from './presenter/mainRenderPresenter.js';

const infosContent = generateObj(Math.floor(Math.random() * 10));
// const infosContent = [];

const sortContainerElem = document.querySelector('.trip-events');

//общий список ul
if (infosContent.length > 0) {
  render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);
}

const mainBoard = new MainRender(infosContent);

mainBoard.init();
