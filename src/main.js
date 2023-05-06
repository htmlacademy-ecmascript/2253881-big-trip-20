import EventList from './view/EventList';
import { render, RenderPosition } from './framework/render';
import { generateObj } from './mocks/mock';
import MainRenderPresenter from './presenter/MainRenderPresenter';

const infosContent = generateObj(Math.floor(Math.random() * 10));
// const infosContent = [];

const sortContainerElem = document.querySelector('.trip-events');

//общий список ul
render(new EventList(), sortContainerElem, RenderPosition.BEFOREEND);

const mainBoard = new MainRenderPresenter(infosContent);

mainBoard.init();
