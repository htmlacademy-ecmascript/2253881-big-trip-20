import EventWithContent from './EventWithContent';
import EventWithoutContent from './EventWithoutContent';
import { render, replace } from '../framework/render';
import AbstractView from '../framework/view/abstract-view';

const ESC = 'Escape';

export default class UlListRender extends AbstractView {
  #infosContent = null;
  #placeToRender = document.querySelector('.trip-events__list');

  constructor(infosContent) {
    super();
    this.#infosContent = infosContent;
  }

  #renderOneElem(elem) {
    const escKeyDownHandler = (evt) => {
      evt.preventDefault();
      if (evt.key === ESC && document.querySelector('.event--edit')) {
        replaceWithContentToNoContent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const listWithoutContentElem = new EventWithoutContent({
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
    for (let i = 0; i < this.#infosContent.length; i++) {
      this.#renderOneElem(this.#infosContent[i]);
    }
  }
}
