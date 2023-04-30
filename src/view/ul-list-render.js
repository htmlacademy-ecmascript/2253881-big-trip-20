import EventWithContent from './event-with-content';
import Event from './event';
import { render, RenderPosition } from '../framework/render';
import AbstractView from '../framework/view/abstract-view';
import { generateObj } from '../mocks/mock';

const COUNT = 4;

export default class UlListRender extends AbstractView {
  #content = generateObj(7);

  init() {
    const ulList = document.querySelector('.trip-events__list');

    render(
      new EventWithContent(this.#content[0]),
      ulList,
      RenderPosition.AFTERBEGIN
    );

    for (let i = 1; i < COUNT; i++) {
      render(new Event(this.#content[i]), ulList, RenderPosition.BEFOREEND);
    }
  }
}
