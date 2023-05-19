import AbstractView from '../framework/view/abstract-view';

const ELEMENTS_LIST = ['Everything', 'Future', 'Present', 'Past'];

function createNewListOfElems(data) {
  /* eslint-disable */
  return /*html*/ `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input
          id="filter-everything"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="everything"
        />
        <label class="trip-filters__filter-label" for="filter-everything">
          Everything
        </label>
      </div>

      <div class="trip-filters__filter">
        <input
          id="filter-future"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="future"
        />
        <label class="trip-filters__filter-label" for="filter-future">
          Future
        </label>
      </div>

      <div class="trip-filters__filter">
        <input
          id="filter-present"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="present"
        />
        <label class="trip-filters__filter-label" for="filter-present">
          Present
        </label>
      </div>

      <div class="trip-filters__filter">
        <input
          id="filter-past"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="past"
        />
        <label class="trip-filters__filter-label" for="filter-past">
          Past
        </label>
      </div>

      <button class="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>`;
}

/* eslint-enable */

export default class ListOfFilters extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleChangeFilter = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleChangeFilter = onFilterTypeChange;
    console.log(filters);
    console.log(currentFilterType);
    console.log(onFilterTypeChange);
  }

  get template() {
    return createNewListOfElems();
  }
}
