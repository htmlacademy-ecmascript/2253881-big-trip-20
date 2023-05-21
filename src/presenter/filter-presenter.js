import ListOfFiltersView from '../view/list-of-filters-view';
import { render, replace, remove, RenderPosition } from '../framework/render';
import { filter } from '../framework/utils';
import { FILTER_TYPE, UPDATE_TYPE } from '../framework/consts';

export default class FilterPresenter {
  #containerForFiltersElem = document.querySelector('.trip-controls__filters');
  #filterModel = null;
  #eventsModel = null;

  #filterComponent = null;

  constructor({ filterModel, eventsModel }) {
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.mainRender);
    this.#filterModel.addObserver(this.mainRender);
  }

  get filters() {
    const events = this.#eventsModel.events;
    return Object.values(FILTER_TYPE).map((type) => ({
      type,
      count: filter[type](events).length,
    }));
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };

  mainRender = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new ListOfFiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(
        this.#filterComponent,
        this.#containerForFiltersElem,
        RenderPosition.BEFOREEND
      );
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };
}
