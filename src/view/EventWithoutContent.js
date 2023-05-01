import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';
/* eslint-disable */
function createEvent(data) {
  return `<li class="trip-events__item"><div class="event">
  <time class="event__date" datetime="2019-03-18">${dayjs(data.dateFrom).format(
    'MMM DD'
  )}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${
      data.type
    }.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${data.type} ${data.destination.cityName} </h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="2019-03-18T10:30">${dayjs(
        data.dateFrom
      ).format('HH:mm')}</time>
      &mdash;
      <time class="event__end-time" datetime="2019-03-18T11:00">${dayjs(
        data.dateTo
      ).format('HH:mm')}</time>
    </p>
    <p class="event__duration">${dayjs(
      new Date(data.dateTo) - new Date(data.dateFrom)
    ).format('mm')}M</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${data.offers.offers.reduce(
      (acc, elem) => (acc += elem.price),
      0
    )}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">

    ${data.offers.offers
      .map(
        (elem) => `<li class="event__offer">
    <span class="event__offer-title">${elem.title}</span>
    &plus;&euro;
    <span class="event__offer-price">${elem.price}</span>
  </li>`
      )
      .join('')}
  </ul>
  <button class="event__favorite-btn ${
    data.isFavorite ? 'event__favorite-btn--active' : ''
  }" type="button">
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
export default class EventWithoutContent extends AbstractView {
  #data;
  #onClick;
  constructor({ data, onClick }) {
    super();
    this.#data = data;
    this.#onClick = onClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onClickEvent);
  }

  #onClickEvent = (evt) => {
    evt.preventDefault();
    this.#onClick();
  };

  get template() {
    return createEvent(this.#data);
  }
}
