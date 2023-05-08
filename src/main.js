import EventList from './view/EventList';
import { render, RenderPosition } from './framework/render';
import { generateObj } from './mocks/mock';
import mainRenderPresenter from './presenter/mainRenderPresenter';

const infosContent = generateObj(Math.floor(Math.random() * 10));
// const infosContent = [];

const sortContainerElem = document.querySelector('.trip-events');

//общий список ul
if (infosContent.length > 0) {
  render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);
}

const mainBoard = new mainRenderPresenter(infosContent);

mainBoard.init();
