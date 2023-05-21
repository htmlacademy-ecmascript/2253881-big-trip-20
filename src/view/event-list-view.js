import AbstractView from '../framework/view/abstract-view';

function createEventListView() {
  return /*html*/ '<ul class="trip-events__list"></ul>';
}

export default class EventListView extends AbstractView {
  get template() {
    return createEventListView();
  }
}
