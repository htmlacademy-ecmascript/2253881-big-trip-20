import AbstractView from '../framework/view/abstract-view';

function createNewEventButton() {
  return /*html*/ ` <button
  class="trip-main__event-add-btn btn btn--big btn--yellow"
  type="button"
>
  New event
</button>`;
}

export default class AddNewEvent extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;

    this.element.onclick = (evt) => {
      evt.preventDefault();
      this.#handleClick();
    };
  }

  get template() {
    return createNewEventButton();
  }
}
