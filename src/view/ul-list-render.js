import EventWithContent from './event-with-content';
import Event from './event';
import { render, RenderPosition, replace } from '../framework/render';
import AbstractView from '../framework/view/abstract-view';
import { generateObj } from '../mocks/mock';

const COUNT = 4;

export default class UlListRender extends AbstractView {
  #content = generateObj(7);

  init() {
    const ulList = document.querySelector('.trip-events__list');

    for (let i = 0; i < COUNT; i++) {
      /* eslint-disable */
      function replaceFromNoContentToWithContent() {
        replace(listWithContentElem, eventWithoutContentElem);
      }

      function replaceFromWithContentToNoContent() {
        replace(eventWithoutContentElem, listWithContentElem);
      }
      /* eslint-enable */
      const listWithContentElem = new EventWithContent(this.#content[i], () => {
        replaceFromWithContentToNoContent();
      });
      const eventWithoutContentElem = new Event(this.#content[i], () => {
        replaceFromNoContentToWithContent();
      });

      render(eventWithoutContentElem, ulList, RenderPosition.BEFOREEND);
    }
  }
}
