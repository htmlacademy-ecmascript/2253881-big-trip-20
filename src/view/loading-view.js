import AbstractView from '../framework/view/abstract-view';

function createLoading() {
  return /*html*/ '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingView extends AbstractView {
  get template() {
    return createLoading();
  }
}
