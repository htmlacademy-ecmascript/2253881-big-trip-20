import ApiService from './framework/api-service';
import { URLS, METODS } from './framework/consts';

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({ url: URLS.EVENTS }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: URLS.DESTINATIONS }).then(
      ApiService.parseResponse
    );
  }

  get offers() {
    return this._load({ url: URLS.OFFERS }).then(ApiService.parseResponse);
  }

  async updateEvent(newEvent) {
    const response = await this._load({
      url: `${URLS.EVENTS}/${newEvent.id}`,
      method: METODS.PUT,
      body: JSON.stringify(this.adaptToServer(newEvent)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const answer = await ApiService.parseResponse(response);

    return answer;
  }

  adaptToClient(events, destinations, offers) {
    const editedEvents = events.map((el) => {
      const editedEl = {
        ...el,
        basePrice: el['base_price'],
        dateFrom:
          el['date_from'] !== null
            ? new Date(el['date_from'])
            : el['date_from'],
        dateTo:
          el['date_to'] !== null ? new Date(el['date_to']) : el['date_to'],
        isFavourite: el['is_favorite'],
      };

      delete editedEl['base_price'];
      delete editedEl['date_from'];
      delete editedEl['date_to'];
      delete editedEl['is_favorite'];

      editedEl.destination = destinations.find(
        (point) => point.id === editedEl.destination
      );

      if (editedEl.offers.length) {
        const typeOffers = offers.find(
          (typeOffer) => typeOffer.type === editedEl.type
        );

        editedEl.offers = editedEl.offers.map((idOfEditedEl) =>
          typeOffers.offers.find((elOfOffers) => elOfOffers.id === idOfEditedEl)
        );
      }
      return editedEl;
    });
    return editedEvents;
  }

  adaptToServer(eventTosend) {
    /* eslint-disable */
    const anyEvent = {
      ...eventTosend,
      base_price: eventTosend.basePrice,
      date_from:
        eventTosend.dateFrom instanceof Date
          ? eventTosend.dateFrom.toISOString()
          : null,
      date_to:
        eventTosend.dateTo instanceof Date
          ? eventTosend.dateTo.toISOString()
          : null,
      is_favorite: eventTosend.isFavourite,
    };
    /* eslint-enable */
    anyEvent.destionation = anyEvent.destination.id;

    if (anyEvent.offers.length) {
      anyEvent.offers = anyEvent.offers.map((el) => el.id);
    }

    delete anyEvent.isFavourite;
    delete anyEvent.dateTo;
    delete anyEvent.dateFrom;
    delete anyEvent.basePrice;

    return anyEvent;
  }
}
