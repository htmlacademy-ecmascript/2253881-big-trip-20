import AbstractView from '../framework/view/abstract-view';
import { INPUT, ELEMENTS_LIST } from '../framework/consts';

function createNewListOfElems({ currentFilter, eventsModel }) {
  const isOffrsOrDestinationsEmpty =
    !eventsModel.offers.length || !eventsModel.destinations.length;
  const ourFilters = ELEMENTS_LIST.map(
    (el) => /*html*/ `<div class="trip-filters__filter">
      <input
        id="filter-${el}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        ${el === currentFilter ? 'checked' : ''}
        ${isOffrsOrDestinationsEmpty ? 'disabled' : ''}
        name="trip-filter"
        value="${el}"
      />
      <label class="trip-filters__filter-label" for="filter-${el}">
        ${el}
      </label>
    </div>`
  ).join('');

  return /*html*/ `<form class="trip-filters" action="#" method="get">
      ${ourFilters}
      <button class="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>`;
}

export default class ListOfFiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleChangeFilter = null;
  #eventsModel = null;

  constructor({ filters, currentFilterType, onFilterTypeChange, eventsModel }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleChangeFilter = onFilterTypeChange;
    this.#eventsModel = eventsModel;

    this.element.onchange = (evt) => {
      if (evt.target.tagName === INPUT) {
        this.#handleChangeFilter(evt.target.value);
      }
    };
  }

  get template() {
    return createNewListOfElems({
      filters: this.#filters,
      currentFilter: this.#currentFilter,
      eventsModel: this.#eventsModel,
    });
  }
}
