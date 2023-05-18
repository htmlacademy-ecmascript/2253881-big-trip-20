import EventWithContent from '../view/event-with-content-view';
import EventWithOutContent from '../view/event-with-out-content-view';
import { replace, render, remove } from '../framework/render';
import { MODE, ESC } from '../framework/conts';

export default class OneWayPointPresenter {
  #placeToRenderElem = document.querySelector('.trip-events__list');
  #elem = null;
  #evtWithOutContent = null;
  #evtWithContent = null;
  #status = MODE.closed;

  #handleEventChange = null;
  #handleModeChange = null;
  #updateBackup = null;

  constructor({ data, handleModeChange, handleEventChange, updateBackup }) {
    this.#elem = data;
    this.#handleModeChange = handleModeChange;
    this.#handleEventChange = handleEventChange;
    this.#updateBackup = updateBackup;
  }

  #onClickSubmit = (newElem) => {
    this.#elem = { ...newElem };
    this.#updateBackup(newElem);
    this.#handleEventChange(this.#elem);
    this.replaceWithContentToNoContent();
  };

  isFavouriteChanging() {
    this.#elem.isFavourite = !this.#elem.isFavourite;
    this.#handleEventChange(this.#elem);
  }

  #escKeyDownHandlerWithContent = (evt) => {
    if (
      evt.key === ESC &&
      document.querySelector('.event--edit') &&
      this.#status === MODE.openened
    ) {
      evt.preventDefault();
      this.#evtWithContent.reset(this.#elem);
      this.replaceWithContentToNoContent();
      this.#status = MODE.closed;
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
    document.removeEventListener('keydown', this.#escKeyDownHandlerWithContent);
    replace(this.#evtWithOutContent, this.#evtWithContent);
    this.#status = MODE.closed;
  }

  replaceNoContentToWithContent() {
    document.addEventListener('keydown', this.#escKeyDownHandlerWithContent);
    replace(this.#evtWithContent, this.#evtWithOutContent);
    this.#status = MODE.openened;
  }

  init(newElem) {
    this.#elem = newElem;

    const prevEventWithOutContentComponent = this.#evtWithOutContent;
    const prevEventWithContent = this.#evtWithContent;

    this.#evtWithOutContent = new EventWithOutContent({
      data: this.#elem,
      onClickArrow: () => {
        this.#handleModeChange();
        this.replaceNoContentToWithContent();
        document.addEventListener(
          'keydown',
          this.#escKeyDownHandlerWithContent
        );
      },
      onClickStar: () => {
        this.isFavouriteChanging();
      },
    });

    this.#evtWithContent = new EventWithContent({
      data: this.#elem,
      onClickSubmit: this.#onClickSubmit,
      onClickArrow: () => {
        this.#evtWithContent.reset(this.#elem);
        this.replaceWithContentToNoContent();
        document.removeEventListener(
          'keydown',
          this.#escKeyDownHandlerWithContent
        );
      },
    });

    if (
      prevEventWithOutContentComponent === null ||
      prevEventWithContent === null
    ) {
      render(this.#evtWithOutContent, this.#placeToRenderElem);
      return;
    }

    if (this.#status === MODE.closed) {
      replace(this.#evtWithOutContent, prevEventWithOutContentComponent);
    }

    if (this.#status === MODE.openened) {
      replace(this.#evtWithContent, prevEventWithContent);
    }

    remove(prevEventWithContent);
    remove(prevEventWithOutContentComponent);
  }
}
