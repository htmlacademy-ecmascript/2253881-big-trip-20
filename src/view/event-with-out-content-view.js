import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getDiffDates } from '../framework/utils';
import dayjs from 'dayjs';

/* eslint-disable */
function createEvent(data) {
  const isFavourite = data.isFavourite ? 'event__favorite-btn--active' : '';
  //   const offersList = data.offers
  //     .map(
  //       (elem) => /*html*/ `<li class="event__offer">
  //   <span class="event__offer-title">${elem.title}</span>
  //   &plus;&euro;
  //   <span class="event__offer-price">${elem.price}</span>
  // </li>`
  //     )
  //     .join('');
  const offersList = 'dasdsa';
  // const price = data?.offers.reduce((acc, elem) => (acc += elem.price), 0);
  const baseDate = dayjs(data.dateFrom).format('MMM DD');
  const dateFiffs = getDiffDates(data.dateFrom, data.dateTo);
  const dateFrom = dayjs(data.dateFrom).format('HH:mm');
  const dateEnd = dayjs(data.dateTo).format('HH:mm');

  return `<li class="trip-events__item"><div class="event">
  <time class="event__date" datetime="2019-03-18">${baseDate}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${data.type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${data.type} ${data.destination?.cityName}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="2019-03-18T10:30">${dateFrom}</time>
      &mdash;
      <time class="event__end-time" datetime="2019-03-18T11:00">${dateEnd}</time>
    </p>
    <p class="event__duration">${dateFiffs}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${data.basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
   ${offersList}
  </ul>
  <button class="event__favorite-btn ${isFavourite}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div></li>`;
}
/* eslint-enable */
export default class EventWithOutContentView extends AbstractStatefulView {
  #onClickArrow = null;
  #onClickStar = null;

  constructor({ data, onClickArrow, onClickStar }) {
    super();

    this._setState(data);
    this.#onClickArrow = onClickArrow;
    this.#onClickStar = onClickStar;

    this._restoreHandlers();
  }

  reset(data) {
    this.updateElement(data);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').onclick = (evt) => {
      evt.preventDefault();
      this.#onClickArrow();
    };

    this.element.querySelector('.event__favorite-btn').onclick = (evt) => {
      evt.preventDefault();
      this.#onClickStar();
    };
  }

  get template() {
    return createEvent(this._state);
  }
}
