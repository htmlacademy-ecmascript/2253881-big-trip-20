import EventWithContent from './event-with-content';
import Event from './event';
import { render, RenderPosition } from '../render';
import { generateObj } from '../mocks/mock';

export default class UlListRender {
  content = generateObj(7);

  init() {
    const ulList = document.querySelector('.trip-events__list');

    render(
      new EventWithContent(this.content[0]),
      ulList,
      RenderPosition.AFTERBEGIN
    );

    for (let i = 1; i < 5; i++) {
      render(new Event(), ulList, RenderPosition.BEFOREEND);
    }
  }
}
