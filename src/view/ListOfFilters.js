import AbstractView from '../framework/view/abstract-view';

const ELEMENTS_LIST = ['Everything', 'Future', 'Present', 'Past'];
/* eslint-disable */
function createNewListOfElems() {
  return `<form class="trip-filters" action="#" method="get">


  ${ELEMENTS_LIST.map(
    (elem) => `<div class="trip-filters__filter">
  <input id="filter-${
    elem.toLocaleLowerCase
  }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${
      elem.toLocaleLowerCase
    } ${elem.toLocaleLowerCase === 'past' ? 'checked' : ''}">
  <label class="trip-filters__filter-label" for="filter-everything">${elem}</label>
</div>`
  ).join('')}


  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}
/* eslint-enable */

export default class ListOfFilters extends AbstractView {
  get template() {
    return createNewListOfElems();
  }
}
