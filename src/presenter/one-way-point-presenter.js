import EventWithContent from '../view/event-with-content-view';
import EventWithOutContent from '../view/event-with-out-content-view';
import { replace, render, remove } from '../framework/render';
import { MODE, ESC } from '../framework/consts';
import { USER_ACTION, UPDATE_TYPE } from '../framework/consts';

export default class OneWayPointPresenter {
  #placeToRenderElem = document.querySelector('.trip-events__list');
  #elem = null;
  #evtWithOutContent = null;
  #evtWithContent = null;
  #status = MODE.closed;

  #handleModelDataChange = null;
  #handleModeChange = null;

  constructor({ handleModeChange, handleModelDataChange }) {
    this.#handleModeChange = handleModeChange;
    this.#handleModelDataChange = handleModelDataChange;
  }

  #onClickSubmit = (newElem) => {
    this.#elem = { ...newElem };
    this.#handleModelDataChange(
      USER_ACTION.UPDATE_EVENT,
      UPDATE_TYPE.PATCH,
      newElem
    );
    this.replaceWithContentToNoContent();
  };

  #onClickDelete = () => {
    this.#handleModelDataChange(
      USER_ACTION.DELETE_EVENT,
      UPDATE_TYPE.MAJOR,
      this.#elem
    );
  };

  #isFavouriteChanging = () => {
    const newEvent = { ...this.#elem, isFavourite: !this.#elem.isFavourite };
    this.#handleModelDataChange(
      USER_ACTION.UPDATE_EVENT,
      UPDATE_TYPE.PATCH,
      newEvent
    );
  };

  #escKeyDownHandlerWithContent = (evt) => {
    if (
      evt.key === ESC &&
      document.querySelector('.event--edit') &&
      this.#status === MODE.openened
    ) {
      evt.preventDefault();
      this.#evtWithContent.reset(this.#elem);
      this.replaceWithContentToNoContent();
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

  mainRender(newElem) {
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
        this.#isFavouriteChanging();
      },
    });

    this.#evtWithContent = new EventWithContent({
      data: this.#elem,
      onClickSubmit: this.#onClickSubmit,
      onEscClick: this.#escKeyDownHandlerWithContent,
      onClickDelete: this.#onClickDelete,
      onClickArrow: () => {
        this.#evtWithContent.reset(this.#elem);
        this.replaceWithContentToNoContent();
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
