import { RenderPosition, createElement } from '../framework/render';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { INPUT, LABEL } from '../framework/consts';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';

const SPAN = 'SPAN';

/* eslint-disable */
function createEventWithContentView() {
  return '<li class="trip-events__item"></li>';
}

function createFormForContent() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

function createContentHeader(data, destinations, offers) {
  const listOfDestinations = destinations.map(
    (el) => `<option name="${el.id}" value="${el.name}"></option>`
  );
  const isButtonNew = data.isButtonNewEventView
    ? ''
    : `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

  const eventTypesList = offers
    .map(
      (elem) => /*html*/ `<div class="event__type-item">
  <input ${
    data.isDisabled ? 'disabled' : ''
  } id="event-type-${elem.type.toLocaleLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${elem.type.toLocaleLowerCase()}">
  <label class="event__type-label  event__type-label--${elem.type.toLocaleLowerCase()}" for="event-type-${elem.type.toLocaleLowerCase()}-1">${
        elem.type[0].toUpperCase() + elem.type.slice(1)
      }</label>
</div>`
    )
    .join('');

  return /*html*/ `<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${
        data.type
      }.png" alt="Event type icon">
    </label>
    <input ${
      data.isDisabled ? 'disabled' : ''
    } class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
    <input class="event__input ${
      data.isDisabled ? 'disabled' : ''
    }  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(
    data.destination?.name
  )}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${listOfDestinations}
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
    <input ${
      data.isDisabled ? 'disabled' : ''
    } class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(
    `${data.basePrice}`
  )}">
  </div>

  <button ${
    data.isDisabled ? 'disabled' : ''
  } class="event__save-btn  btn  btn--blue" type="submit">${
    data.isSaving ? 'Saving...' : 'Save'
  }</button>
  <button class="event__reset-btn" ${
    data.isDisabled ? 'disabled' : ''
  } type="reset">${
    data.isButtonNewEventView
      ? 'Cancel'
      : data.isDeleting
      ? 'Deleting...'
      : 'Delete'
  }</button>
  ${isButtonNew}
</header>`;
}

function createEventDetailsWrapper() {
  return '<section class="event__details"></section>';
}

function createEventSectionOffers(data) {
  const offersList = data.offers.length
    ? `<div class="event__available-offers">${data?.offers
        .map(
          (elem) => `<div class="event__offer-selector">
<input ${elem.checked ? 'checked' : ''}
 class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
<label data-id="${
            elem.id
          }" class="event__offer-label" for="event-offer-luggage-1">
  <span class="event__offer-title">${elem.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${elem.price}</span>
</label>
</div>`
        )
        .join('')}</div>`
    : '';

  return `<section class="event__section  event__section--offers">


  ${
    data.offers.length
      ? '<h3 class="event__section-title  event__section-title--offers">Offers</h3>'
      : ''
  }
  ${offersList}
</section>`;
}

function createContentEventSectionDestination(data) {
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${data?.destination.description}</p>



  ${
    data.destination.pictures.length
      ? `<div class="event__photos-container"><div class="event__photos-tape">
      ${data.destination.pictures
        .map(
          (elem) =>
            `<img class="event__photo" src=${elem.src} alt="Event photo">`
        )
        .join('')}
     </div>`
      : ''
  }


</section>`;
}
/* eslint-enable */
export default class EventWithContentView extends AbstractStatefulView {
  #onClickSubmit = null;
  #onClickArrow = null;
  #onClickDelete = null;
  #datePickerFrom = null;
  #datePickerTo = null;
  #onEscClick = null;
  #modelEvents = null;

  constructor({
    data,
    onClickSubmit,
    onClickArrow,
    onEscClick,
    onClickDelete,
    modelEvents,
  }) {
    super();
    this.#modelEvents = modelEvents;
    if (data) {
      this._setState(EventWithContentView.parseEventToState(data));
    } else {
      const dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - 2);

      const anyEventsPlaceholder = {
        basePrice: 500,
        dateFrom: dateFrom,
        dateTo: new Date(),
        destination: { ...this.#modelEvents.destinations[0] },
        isFavourite: false,
        offers: [...this.#modelEvents.offers[0].offers],
        type: this.#modelEvents.offers[0].type,
      };

      this._setState(
        EventWithContentView.parseEventToState(anyEventsPlaceholder)
      );
    }

    this.#onClickSubmit = onClickSubmit;
    this.#onClickArrow = onClickArrow;
    this.#onEscClick = onEscClick;
    this.#onClickDelete = onClickDelete;
    this._restoreHandlers();
  }

  _restoreHandlers = () => {
    this.element.querySelector('.event__save-btn').onclick = (evt) => {
      evt.preventDefault();
      this.#onClickSubmit(EventWithContentView.parseStateToEvent(this._state));
    };

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').onclick = (evt) => {
        evt.preventDefault();
        this.#onClickArrow();
      };
    }

    this.element.querySelector('.event__type-group').onchange = (evt) => {
      if (evt.target.tagName === INPUT) {
        this.updateElement({
          type: evt.target.value,
        });
      }
    };

    this.element.querySelector('#event-price-1').onchange = (evt) => {
      const sumOfCheckedOffers = this._state.offers.reduce((acc, el) => {
        if (el.checked) {
          acc += el.price;
        }
        return acc;
      }, 0);

      if (evt.target.value > sumOfCheckedOffers) {
        this.updateElement({ basePrice: Number(evt.target.value) });
      } else {
        this.updateElement({
          basePrice: sumOfCheckedOffers > 0 ? sumOfCheckedOffers : 1,
        });
      }
    };

    this.element.querySelector('#event-price-1').onfocus = () => {
      document.removeEventListener('keydown', this.#onEscClick);
    };

    this.element.querySelector('#event-price-1').onblur = () => {
      document.addEventListener('keydown', this.#onEscClick);
    };

    this.element.querySelector('#event-destination-1').onchange = (evt) => {
      const prevDestination = this._state.destination.name;

      /* eslint-disable */
      const newDestination = this.#modelEvents.destinations.find(
        (el) => el.name === evt.target.value
      )
        ? this.#modelEvents.destinations.find(
            (el) => el.name === evt.target.value
          )
        : this.#modelEvents.destinations.find(
            (el) => el.name === prevDestination
          );

      /* eslint-enable */
      this.updateElement({
        destination: newDestination,
      });
    };

    this.element.querySelector('#event-destination-1').onfocus = () => {
      document.removeEventListener('keydown', this.#onEscClick);
    };

    this.element.querySelector('#event-destination-1').onblur = () => {
      document.addEventListener('keydown', this.#onEscClick);
    };

    this.element.querySelector('.event__reset-btn').onclick = () => {
      this.#onClickDelete();
    };

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').onclick = (
        evt
      ) => {
        if (evt.target.tagName === SPAN) {
          const idOffer = evt.target.parentElement.dataset.id;

          const price = Number(
            evt.target.parentElement.querySelector('.event__offer-price')
              .textContent
          );

          const offerToMutate = {
            ...this._state.offers.find((el) => el.id === idOffer),
          };

          const newOffersArr = this._state.offers.map((el) => {
            if (el.id === idOffer) {
              if (el.checked) {
                el.checked = false;
              } else if (!el.checked) {
                el.checked = true;
              }
              return el;
            }
            return el;
          });

          if (!offerToMutate.checked) {
            this.updateElement({
              basePrice: this._state.basePrice + price,
              offers: newOffersArr,
            });
          } else if (offerToMutate.checked) {
            this.updateElement({
              basePrice: this._state.basePrice - price,
              offers: newOffersArr,
            });
          }
        }
        if (evt.target.tagName === LABEL) {
          const idOffer = evt.target.dataset.id;

          const price = Number(
            evt.target.querySelector('.event__offer-price').textContent
          );

          const offerToMutate = {
            ...this._state.offers.find((el) => el.id === idOffer),
          };

          const newOffersArr = this._state.offers.map((el) => {
            if (el.id === idOffer) {
              if (el.checked) {
                el.checked = false;
              } else if (!el.checked) {
                el.checked = true;
              }
              return el;
            }
            return el;
          });

          if (!offerToMutate.checked) {
            this.updateElement({
              basePrice: this._state.basePrice + price,
              offers: newOffersArr,
            });
          } else if (offerToMutate.checked) {
            this.updateElement({
              basePrice: this._state.basePrice - price,
              offers: newOffersArr,
            });
          }
        }
      };
    }

    this.#setDatepickers();
  };

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

  #setDatepickers = () => {
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
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }
  };

  reset = (data) => {
    this.updateElement(EventWithContentView.parseEventToState(data));
  };

  static parseEventToState(data) {
    if (!data.id) {
      return {
        isButtonNewEventView: true,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
        ...data,
      };
    }
    return { isDisabled: false, isSaving: false, isDeleting: false, ...data };
  }

  static parseStateToEvent(state) {
    const eventDestination = { ...state };

    if (eventDestination.isButtonNewEventView) {
      delete eventDestination.isButtonNewEventView;
    }
    delete eventDestination.isDeleting;
    delete eventDestination.isSaving;
    delete eventDestination.isDisabled;

    return eventDestination;
  }

  get template() {
    const liElem = createElement(createEventWithContentView());
    const formWrapperElem = createElement(createFormForContent());
    const headerContent = createElement(
      createContentHeader(
        this._state,
        this.#modelEvents.destinations,
        this.#modelEvents.offers
      )
    );
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
