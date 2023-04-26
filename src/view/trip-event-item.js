import { createElement } from '../render';

function createEventItem() {
  return '<li class="trip-events__item"></li>';
}

export default class EventItem {
  getTemplate() {
    return createEventItem();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
