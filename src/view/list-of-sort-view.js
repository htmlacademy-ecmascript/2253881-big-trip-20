import AbstractView from '../framework/view/abstract-view';
import { SORT_TYPES, LABEL } from '../framework/conts';

/* eslint-disable */
function createSortList() {
  return /*html*/ `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" data-sort-type=${SORT_TYPES.day} for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn"  data-sort-type=${SORT_TYPES.event} for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label class="trip-sort__btn"  data-sort-type=${SORT_TYPES.time} for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn"  data-sort-type=${SORT_TYPES.price} for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn"  data-sort-type=${SORT_TYPES.offers} for="sort-offer">Offers</label>
  </div>
</form>`;
}

export default class ListOfSort extends AbstractView {
  #handleSort = null;

  constructor({ handleSort }) {
    super();
    this.#handleSort = handleSort;

    this.element.onclick = (evt) => {
      if (evt.target.tagName !== LABEL) {
        return;
      }

      const notOurSort =
        evt.target.dataset.sortType === SORT_TYPES.event ||
        evt.target.dataset.sortType === SORT_TYPES.offers;

      if (notOurSort) {
        return;
      }
      this.#handleSort(evt.target.dataset.sortType);
    };
  }

  get template() {
    return createSortList();
  }
}
