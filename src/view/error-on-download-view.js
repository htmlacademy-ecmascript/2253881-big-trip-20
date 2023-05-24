import AbstractView from '../framework/view/abstract-view';
import { FILTER_TYPE } from '../framework/consts';

const NO_EVENTS_TEXT_TYPE = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
  [FILTER_TYPE.PAST]: 'There are no past events now',
  [FILTER_TYPE.PRESENT]: 'There are no present events now',
};

function createError(filterType) {
  /* eslint-disable */
  return /*html*/ `<p class="trip-events__msg">${NO_EVENTS_TEXT_TYPE[filterType]}</p>`;
  /*eslint-enable*/
}

export default class ErrorOnDownloadView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createError(this.#filterType);
  }
}
