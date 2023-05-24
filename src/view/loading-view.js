import AbstractView from '../framework/view/abstract-view';

function createLoading() {
  /* eslint-disable */
  return /*html*/ `<p class="trip-events__msg">Loading...</p>`;
  /*eslint-enable*/
}

export default class LoadingView extends AbstractView {
  get template() {
    return createLoading();
  }
}
