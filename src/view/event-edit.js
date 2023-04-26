import { createElement } from '../render';

function createFormEdit() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

export default class FormEdit {
  getTemplate() {
    return createFormEdit();
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
