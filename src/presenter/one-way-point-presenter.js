import EventWithContentView from '../view/event-with-content-view';
import EventWithOutContentView from '../view/event-with-out-content-view';
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
  #modelEvents = null;

  constructor({ handleModeChange, handleModelDataChange, modelEvents }) {
    this.#handleModeChange = handleModeChange;
    this.#handleModelDataChange = handleModelDataChange;
    this.#modelEvents = modelEvents;
  }

  #onClickSubmit = (newElem) => {
    this.#elem = { ...newElem };
    this.#handleModelDataChange(
      USER_ACTION.UPDATE_EVENT,
      UPDATE_TYPE.PATCH,
      newElem
    );
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

  setSaving() {
    if (this.#status === MODE.openened) {
      this.#evtWithContent.updateElement({ isDisabled: true, isSaving: true });
    }
  }

  setDeleting() {
    if (this.#status === MODE.openened) {
      this.#evtWithContent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
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

  setAborting() {
    if (this.#status === MODE.closed) {
      this.#evtWithOutContent.shake();
      return;
    }

    const resetFormState = () => {
      this.#evtWithContent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#evtWithContent.shake(resetFormState);
  }

  mainRender(newElem) {
    this.#elem = newElem;

    const prevEventWithOutContentViewComponent = this.#evtWithOutContent;
    const prevEventWithContentView = this.#evtWithContent;
    this.#evtWithOutContent = new EventWithOutContentView({
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

    this.#evtWithContent = new EventWithContentView({
      data: this.#elem,
      modelEvents: this.#modelEvents,
      onClickSubmit: this.#onClickSubmit,
      onEscClick: this.#escKeyDownHandlerWithContent,
      onClickDelete: this.#onClickDelete,
      onClickArrow: () => {
        this.#evtWithContent.reset(this.#elem);
        this.replaceWithContentToNoContent();
      },
    });

    if (
      prevEventWithOutContentViewComponent === null ||
      prevEventWithContentView === null
    ) {
      render(this.#evtWithOutContent, this.#placeToRenderElem);
      return;
    }

    if (this.#status === MODE.closed) {
      replace(this.#evtWithOutContent, prevEventWithOutContentViewComponent);
    }

    if (this.#status === MODE.openened) {
      replace(this.#evtWithOutContent, prevEventWithContentView);
      this.#status = MODE.closed;
    }

    remove(prevEventWithContentView);
    remove(prevEventWithOutContentViewComponent);
  }
}
