import EventWithContent from '../view/EventWithContent';
import EventWithoutContent from '../view/EventWithoutContent';
import { replace, render } from '../framework/render';

const ESC = 'Escape';

export default class OneWayPointPresenter {
  #placeToRenderElem = document.querySelector('.trip-events__list');
  #elem = null;
  #evtWithOutContent = null;
  #evtWithContent = null;

  constructor(elem) {
    this.elem = elem;

    const escKeyDownHandlerWithContent = (evt) => {
      evt.preventDefault();
      if (evt.key === ESC && document.querySelector('.event--edit')) {
        this.replaceWithContentToNoContent();
        document.removeEventListener('keydown', escKeyDownHandlerWithContent);
      }
    };

    this.#evtWithContent = new EventWithContent({
      data: elem,
      onClickSubmit: () => {
        this.replaceWithContentToNoContent();
        document.removeEventListener('keydown', escKeyDownHandlerWithContent);
      },
      onClickArrow: () => {
        this.replaceWithContentToNoContent();
        document.removeEventListener('keydown', escKeyDownHandlerWithContent);
      },
    });

    this.#evtWithOutContent = new EventWithoutContent({
      data: elem,
      onClickArrow: () => {
        this.replaceNoContentToWithContent();
        document.addEventListener('keydown', escKeyDownHandlerWithContent);
      },
      onClickStar: () => {},
    });
  }

  replaceWithContentToNoContent() {
    replace(this.#evtWithOutContent, this.#evtWithContent);
  }

  replaceNoContentToWithContent() {
    replace(this.#evtWithContent, this.#evtWithOutContent);
  }

  init() {
    render(this.#evtWithOutContent, this.#placeToRenderElem);
  }
}
