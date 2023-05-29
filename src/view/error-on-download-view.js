import AbstractView from '../framework/view/abstract-view';
import { FILTER_TYPE } from '../framework/consts';

const NO_EVENTS_TEXT_TYPE = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
  [FILTER_TYPE.PAST]: 'There are no past events now',
  [FILTER_TYPE.PRESENT]: 'There are no present events now',
};

function createError(filterType, eventsModel) {
  const isOffrsOrDestinationsEmpty =
    !eventsModel.offers.length || !eventsModel.destinations.length;

  return /*html*/ isOffrsOrDestinationsEmpty
    ? '<p class="trip-events__msg">Error on download events</p>'
    : `<p class="trip-events__msg">${NO_EVENTS_TEXT_TYPE[filterType]}</p>`;
}

export default class ErrorOnDownloadView extends AbstractView {
  #filterType = null;
  #eventsModel = null;

  constructor({ filterType, eventsModel }) {
    super();
    this.#filterType = filterType;
    this.#eventsModel = eventsModel;
  }

  get template() {
    return createError(this.#filterType, this.#eventsModel);
  }
}
