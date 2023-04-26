import { createElement } from '../render';

function createEventDetails() {
  return '<section class="event__details"></section>';
}

export default class EventDetails {
  getTemplate() {
    return createEventDetails();
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
