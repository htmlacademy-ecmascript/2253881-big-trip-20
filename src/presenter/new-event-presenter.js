import EventWithContentView from '../view/event-with-content-view';
import { ESC, UPDATE_TYPE, USER_ACTION } from '../framework/consts';
import { render, RenderPosition, remove } from '../framework/render';

export default class NewEventPresenter {
  #handleDataChange = null;
  #handleDestroy = null;
  #modelEvents = null;

  #eventWithContentView = null;

  constructor({ onDataChange, onDestroy, modelEvents }) {
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#modelEvents = modelEvents;
  }

  mainRender = () => {
    if (this.#eventWithContentView !== null) {
      return;
    }

    this.#eventWithContentView = new EventWithContentView({
      onClickSubmit: this.#handleFormSubmit,
      onClickArrow: this.#handleDeleteClick,
      onClickDelete: this.#handleDeleteClick,
      onEscClick: this.#escKeyDownHandler,
      modelEvents: this.#modelEvents,
    });

    const placeToRenderElem = document.querySelector('.trip-events__list');

    render(
      this.#eventWithContentView,
      placeToRenderElem,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#eventWithContentView === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventWithContentView);
    this.#eventWithContentView = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (newEvent) => {
    this.#handleDataChange(USER_ACTION.ADD_EVENT, UPDATE_TYPE.MAJOR, newEvent);
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === ESC) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
