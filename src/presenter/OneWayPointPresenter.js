import EventWithContent from '../view/EventWithContent';
import EventWithoutContent from '../view/EventWithoutContent';
import { replace, render, remove } from '../framework/render';

const ESC = 'Escape';

const MODE = {
  closed: 'closed',
  openened: 'opened',
};

export default class OneWayPointPresenter {
  #placeToRenderElem = document.querySelector('.trip-events__list');
  elem = null;
  #evtWithOutContent = null;
  #evtWithContent = null;
  #status = MODE.closed;

  constructor(elem, changingIsFavourite, resetToClose) {
    this.elem = elem;
    this.changingIsFavourite = changingIsFavourite;
    this.resetToClose = resetToClose;

    const escKeyDownHandlerWithContent = (evt) => {
      evt.preventDefault();
      if (evt.key === ESC && document.querySelector('.event--edit')) {
        this.replaceWithContentToNoContent();
        document.removeEventListener('keydown', escKeyDownHandlerWithContent);
      }
    };

    this.#evtWithContent = new EventWithContent({
      data: this.elem,
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
      data: this.elem,
      onClickArrow: () => {
        this.resetToClose(this.elem.id);
        this.replaceNoContentToWithContent();
        document.addEventListener('keydown', escKeyDownHandlerWithContent);
      },
      onClickStar: () => {
        this.changingIsFavourite(this.elem.id);
      },
    });
  }

  destroy() {
    remove(this.#evtWithOutContent);
    remove(this.#evtWithContent);
  }

  resetView() {
    if (this.#status !== MODE.closed) {
      this.replaceWithContentToNoContent();
    }
  }

  replaceWithContentToNoContent() {
    replace(this.#evtWithOutContent, this.#evtWithContent);
    this.#status = MODE.closed;
  }

  replaceNoContentToWithContent() {
    replace(this.#evtWithContent, this.#evtWithOutContent);
    this.#status = MODE.openened;
  }

  init() {
    render(this.#evtWithOutContent, this.#placeToRenderElem);
  }
}
