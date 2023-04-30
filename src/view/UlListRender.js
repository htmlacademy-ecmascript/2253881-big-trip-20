import EventWithContent from './EventWithContent';
import Event from './EventWithoutContent';
import { render, replace } from '../framework/render';
import AbstractView from '../framework/view/abstract-view';
import { generateObj } from '../mocks/mock';

const ESC = 'Escape';

export default class UlListRender extends AbstractView {
  #content = generateObj(Math.floor(Math.random() * 10));
  #placeToRender = document.querySelector('.trip-events__list');

  #renderOneElem(elem) {
    const escKeyDownHandler = (evt) => {
      evt.preventDefault();
      if (evt.key === ESC && document.querySelector('.event--edit')) {
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
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onClickArrow: () => {
        replaceWithContentToNoContent();
        document.removeEventListener('keydown', escKeyDownHandler);
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
