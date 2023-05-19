import { Observable } from '../framework/observable';
import { FILTER_TYPE } from '../framework/consts';

export default class FilterModel extends Observable {
  #filter = FILTER_TYPE.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, newFilter) {
    this.#filter = newFilter;

    this._notify(updateType, newFilter);
  }
}
