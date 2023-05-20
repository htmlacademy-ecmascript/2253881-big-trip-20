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
  get template() {
    return createNewEventButton();
  }
}
