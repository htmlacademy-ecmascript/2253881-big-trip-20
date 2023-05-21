import EventWithContentView from '../view/event-with-content-view';
import { ESC, UPDATE_TYPE, USER_ACTION } from '../framework/consts';
import { render, RenderPosition, remove } from '../framework/render';
import { nanoid } from 'nanoid';

export default class NewEventPresenter {
  #ulListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #eventWithContentView = null;

  constructor({ onDataChange, onDestroy }) {
    this.#ulListContainer = document.querySelector('.trip-events__list');
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
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
    });

    render(
      this.#eventWithContentView,
      this.#ulListContainer,
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
    this.#handleDataChange(USER_ACTION.ADD_EVENT, UPDATE_TYPE.MAJOR, {
      id: nanoid(),
      ...newEvent,
    });
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
