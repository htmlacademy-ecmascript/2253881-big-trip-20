import { RenderPosition, createElement } from '../framework/render';
import { MOVING_ELEMENTS, mapCitys, mapOffers } from '../mocks/mock';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { INPUT } from '../framework/conts';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

/* eslint-disable */
function createEventWithContent() {
  return '<li class="trip-events__item"></li>';
}

function createFormForContent() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

function createContentHeader(data) {
  const eventTypesList = MOVING_ELEMENTS.map(
    (elem) => /*html*/ `<div class="event__type-item">
  <input id="event-type-${elem.toLocaleLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${elem.toLocaleLowerCase()}">
  <label class="event__type-label  event__type-label--${elem.toLocaleLowerCase()}" for="event-type-${elem.toLocaleLowerCase()}-1">${elem}</label>
</div>`
  ).join('');

  return /*html*/ `<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${data.type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
          ${eventTypesList}
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${data.type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.destination.cityName}" list="destination-list-1">
    <datalist id="destination-list-1">
      <option value="Amsterdam"></option>
      <option value="Geneva"></option>
      <option value="Chamonix"></option>
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Cancel</button>
  <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
</header>`;
}

function createEventDetailsWrapper() {
  return '<section class="event__details"></section>';
}

function createEventSectionOffers(data) {
  const offersList =
    data.offers.offers &&
    `<div class="event__available-offers">${data.offers.offers
      .map(
        (elem) => `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
<label class="event__offer-label" for="event-offer-luggage-1">
  <span class="event__offer-title">${elem.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${elem.price}</span>
</label>
</div>`
      )
      .join('')}</div>`;

  return `<section class="event__section  event__section--offers">


  ${
    data.offers.offers.length > 0
      ? '<h3 class="event__section-title  event__section-title--offers">Offers</h3>'
      : ''
  }
  ${offersList}
</section>`;
}

function createContentEventSectionDestination(data) {
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${data.destination.description}</p>



  ${
    data.destination.pictures.length > 0
      ? `<div class="event__photos-container"><div class="event__photos-tape">
      ${data.destination.pictures.map(
        (elem) => `<img class="event__photo" src=${elem.src} alt="Event photo">`
      )}
      </div></div>`
      : ''
  }


</section>`;
}
/* eslint-enable */
export default class EventWithContent extends AbstractStatefulView {
  #onClickSubmit = null;
  #onClickArrow = null;
  #datePickerFrom = null;
  #datePickerTo = null;
  #onEscClick = null;

  constructor({ data, onClickSubmit, onClickArrow, onEscClick }) {
    super();

    this._setState(EventWithContent.parseTaskToState(data));
    this.#onClickSubmit = onClickSubmit;
    this.#onClickArrow = onClickArrow;
    this.#onEscClick = onEscClick;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event__save-btn').onclick = (evt) => {
      evt.preventDefault();
      this.#onClickSubmit(EventWithContent.parseStateToTask(this._state));
    };

    this.element.querySelector('.event__rollup-btn').onclick = (evt) => {
      evt.preventDefault();
      this.#onClickArrow();
    };

    this.element.querySelector('.event__type-group').onchange = (evt) => {
      if (evt.target.tagName === INPUT) {
        const typeEvent =
          evt.target.value[0].toUpperCase() + evt.target.value.slice(1);

        this.updateElement({
          type: typeEvent,
          offers: mapOffers.get(typeEvent),
        });
      }
    };

    this.element.querySelector('#event-destination-1').onchange = (evt) => {
      const prevDestination = this._state.destination.cityName;

      this.updateElement({
        destination: mapCitys.get(evt.target.value)
          ? mapCitys.get(evt.target.value)
          : mapCitys.get(prevDestination),
      });
    };

    this.element.querySelector('#event-destination-1').onfocus = () => {
      document.removeEventListener('keydown', this.#onEscClick);
    };

    this.element.querySelector('#event-destination-1').onblur = () => {
      document.addEventListener('keydown', this.#onEscClick);
    };

    this.#setDatepickers();
  }

  #dueDateChangeHandlerFrom = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom,
    });
  };

  #dueDateChangeHandlerTo = ([userDataTo]) => {
    this.updateElement({
      dateTo: userDataTo,
    });
  };

  #setDatepickers() {
    if (this._state.dateFrom) {
      this.#datePickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          // eslint-disable-next-line
          time_24hr: true,
          defaultDate: this._state.dateFrom,
          onChange: this.#dueDateChangeHandlerFrom,
        }
      );
    }

    if (this._state.dateTo) {
      this.#datePickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          minDate: this._state.dateFrom,
          // eslint-disable-next-line
          time_24hr: true,
          defaultDate: this._state.dateTo,
          onChange: this.#dueDateChangeHandlerTo,
        }
      );
    }
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }
  }

  reset(data) {
    this.updateElement(EventWithContent.parseTaskToState(data));
  }

  static parseTaskToState(data) {
    return { ...data };
  }

  static parseStateToTask(state) {
    const eventDestination = { ...state };

    return eventDestination;
  }

  get template() {
    const liElem = createElement(createEventWithContent());
    const formWrapperElem = createElement(createFormForContent());
    const headerContent = createElement(createContentHeader(this._state));
    const sectionWrapperElem = createElement(createEventDetailsWrapper());
    const eventSectionOffers = createElement(
      createEventSectionOffers(this._state)
    );
    const eventSectionDestination = createElement(
      createContentEventSectionDestination(this._state)
    );
    sectionWrapperElem.insertAdjacentElement(
      RenderPosition.AFTERBEGIN,
      eventSectionOffers
    );
    sectionWrapperElem.insertAdjacentElement(
      RenderPosition.BEFOREEND,
      eventSectionDestination
    );
    formWrapperElem.insertAdjacentElement(
      RenderPosition.AFTERBEGIN,
      headerContent
    );
    formWrapperElem.insertAdjacentElement(
      RenderPosition.BEFOREEND,
      sectionWrapperElem
    );
    //обертка ли с контентом
    liElem.insertAdjacentElement(RenderPosition.AFTERBEGIN, formWrapperElem);
    const wrapperElem = document.createElement('div');
    wrapperElem.append(liElem);
    const stringedLiElem = wrapperElem.innerHTML;
    return stringedLiElem;
  }
}
