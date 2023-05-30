import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { getWeightForNullDate } from '../framework/utils';

function createTripInfoView(events) {
  if (events.length) {
    const sortedByDateFromEvents = [...events].sort((a, b) => {
      const isNull = getWeightForNullDate(a.dateFrom, b.dateFrom);
      const diff = dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
      return isNull ?? diff;
    });

    const sortedByDateToEvents = [...events].sort((a, b) => {
      const isNull = getWeightForNullDate(a.dateTo, b.dateTo);
      const diff = dayjs(a.dateTo).diff(dayjs(b.dateTo));
      return isNull ?? diff;
    });

    const startDate = dayjs(sortedByDateFromEvents[0].dateFrom).format(
      'MMM DD'
    );

    const isEqualMonths =
      dayjs(sortedByDateFromEvents[0].dateFrom).format('MMM') ===
      dayjs(
        sortedByDateToEvents[sortedByDateToEvents.length - 1].dateTo
      ).format('MMM');

    const endDate = dayjs(
      sortedByDateToEvents[sortedByDateToEvents.length - 1].dateTo
    ).format(`${isEqualMonths ? 'DD' : 'MMM DD'}`);

    let tripInfoPath;

    if (sortedByDateFromEvents.length <= 3) {
      tripInfoPath = sortedByDateFromEvents
        .map((el) => el.destination.name)
        .join(' &mdash; ');
    } else {
      tripInfoPath = `${
        sortedByDateFromEvents[0].destination.name
      } &mdash; .... &mdash; ${
        sortedByDateFromEvents[sortedByDateFromEvents.length - 1].destination
          .name
      }`;
    }

    const sumBase = events.reduce((acc, el) => (acc += el.basePrice), 0);

    const totalOffersPrice = events.reduce((accumulator, currentValue) => {
      const sum = currentValue.offers.reduce(
        (acc, current) => (acc += current.price),
        0
      );
      accumulator += sum;
      return accumulator;
    }, 0);
    /* eslint-disable */
    return /*html*/ `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">

    <h1 class="trip-info__title">${tripInfoPath}</h1>

    <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${
      sumBase + totalOffersPrice
    }</span>
  </p>
</section>`;
  }
  /* eslint-enable */
  return /*html*/ `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">

    <h1 class="trip-info__title"></h1>

    <p class="trip-info__dates">&nbsp;&mdash;&nbsp;</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value"></span>
  </p>
  </section>`;
}

export default class TripInfoView extends AbstractView {
  #eventsModel = null;

  constructor({ eventsModel }) {
    super();
    this.#eventsModel = eventsModel;
  }

  get template() {
    return createTripInfoView(this.#eventsModel.events);
  }
}
