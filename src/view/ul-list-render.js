import EventWithContent from './event-with-content';
import Event from './event';
import { render, replace } from '../framework/render';
import AbstractView from '../framework/view/abstract-view';
import { generateObj } from '../mocks/mock';

export default class UlListRender extends AbstractView {
  #content = generateObj(7);
  #placeToRender = document.querySelector('.trip-events__list');

  #renderOneElem(elem) {
    const escKeyDownHandler = (evt) => {
      evt.preventDefault();
      if (evt.key === 'Escape' && document.querySelector('.event--edit')) {
        replaceWithContentToNoContent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const listWithoutContentElem = new Event({
      data: elem,
      onClick: () => {
        replaceNoContentToWithContent();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });
    const listWithContentElem = new EventWithContent({
      data: elem,
      onClickSubmit: () => {
        replaceWithContentToNoContent();
      },
      onClickArrow: () => {
        replaceWithContentToNoContent();
      },
    });

    function replaceWithContentToNoContent() {
      replace(listWithoutContentElem, listWithContentElem);
    }

    function replaceNoContentToWithContent() {
      replace(listWithContentElem, listWithoutContentElem);
    }

    render(listWithoutContentElem, this.#placeToRender);
  }

  init() {
    for (let i = 0; i < this.#content.length; i++) {
      this.#renderOneElem(this.#content[i]);
    }
  }
}
