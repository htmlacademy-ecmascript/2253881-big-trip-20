import { Observable } from '../framework/observable';
import { FilterType } from '../framework/consts';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, newFilter) {
    this.#filter = newFilter;

    this._notify(updateType, newFilter);
  }
}
