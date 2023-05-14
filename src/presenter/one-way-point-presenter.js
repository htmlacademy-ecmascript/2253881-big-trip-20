import EventWithContent from '../view/EventWithContent';
import EventWithoutContent from '../view/EventWithoutContent';
import { replace, render, remove } from '../framework/render';
import { MODE, ESC } from '../framework/conts';

export default class OneWayPointPresenter {
  #placeToRenderElem = document.querySelector('.trip-events__list');
  elem = null;
  #evtWithOutContent = null;
  #evtWithContent = null;
  #status = MODE.closed;

  constructor(elem, resetToClose) {
    this.elem = elem;
    this.resetToClose = resetToClose;

    this.#evtWithContent = new EventWithContent({
      data: this.elem,
      onClickSubmit: () => {
        this.replaceWithContentToNoContent();

        this.#evtWithOutContent.updateElement(this.#evtWithContent._state);
        this.elem = this.#evtWithOutContent._state;

        document.removeEventListener(
          'keydown',
          this.escKeyDownHandlerWithContent
        );
      },
      onClickArrow: () => {
        this.#evtWithContent.reset(this.elem);
        this.replaceWithContentToNoContent();
        document.removeEventListener(
          'keydown',
          this.escKeyDownHandlerWithContent
        );
      },
    });

    this.#evtWithOutContent = new EventWithoutContent({
      data: this.elem,
      onClickArrow: () => {
        this.resetToClose();
        this.replaceNoContentToWithContent();
        document.addEventListener('keydown', this.escKeyDownHandlerWithContent);
      },
      onClickStar: () => {
        this.isFavouriteChanging();
      },
    });
  }

  isFavouriteChanging() {
    this.#evtWithOutContent.updateElement({
      ...this.#evtWithOutContent._state,
      isFavourite: !this.#evtWithOutContent._state.isFavourite,
    });
    this.elem.isFavourite = !this.elem.isFavourite;
  }

  escKeyDownHandlerWithContent = (evt) => {
    evt.preventDefault();
    if (
      evt.key === ESC &&
      document.querySelector('.event--edit') &&
      this.#status === MODE.openened
    ) {
      this.#evtWithContent.reset(this.elem);
      this.replaceWithContentToNoContent();
      this.#status = MODE.closed;

      document.removeEventListener(
        'keydown',
        this.escKeyDownHandlerWithContent
      );
    }
  };

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
