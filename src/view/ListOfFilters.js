import AbstractView from '../framework/view/abstract-view';

const ELEMENTS_LIST = ['Everything', 'Future', 'Present', 'Past'];
/* eslint-disable */
function createNewListOfElems(data) {
  const isEmpty = data.length === 0;

  return `<form class="trip-filters" action="#" method="get">


  ${ELEMENTS_LIST.map((elem) => {
    let isDisabled = false;
    if (elem === ELEMENTS_LIST[1] || elem === ELEMENTS_LIST[3]) {
      if (isEmpty) {
        isDisabled = true;
      }
    }
    return `<div class="trip-filters__filter">
      <input id="filter-${elem.toLocaleLowerCase()}" ${
      isDisabled && 'disabled'
    } class="trip-filters__filter-input  visually-hidden"  type="radio" name="trip-filter" value="${elem.toLocaleLowerCase()} ${
      elem.toLocaleLowerCase === 'past' ? 'checked' : ''
    }">
      <label class="trip-filters__filter-label" for="filter-everything">${elem}</label>
    </div>`;
  }).join('')}


  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}
/* eslint-enable */

export default class ListOfFilters extends AbstractView {
  #infosContent = null;

  constructor(infosContent) {
    super();
    this.#infosContent = infosContent;
  }

  get template() {
    return createNewListOfElems(this.#infosContent);
  }
}
