import Observable from '../framework/observable';
import { UPDATE_TYPE } from '../framework/consts';

export default class EventModel extends Observable {
  #events = [];
  #eventsApiServices = null;

  constructor({ eventsApiServices }) {
    super();
    this.#eventsApiServices = eventsApiServices;
  }

  get events() {
    return this.#events;
  }

  async downloadEvents() {
    try {
      const events = await this.#eventsApiServices.events;
      const destinations = await this.#eventsApiServices.destinations;
      const offers = await this.#eventsApiServices.offers;

      this.#events = this.#eventsApiServices.adaptToClient(
        events,
        destinations,
        offers
      );
    } catch (err) {
      this.#events = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  }

  updateEvent(updateType, newEvent) {
    const index = this.#events.findIndex(
      (oneEvent) => oneEvent.id === newEvent.id
    );

    if (index === -1) {
      throw new Error('Event is not defind');
    }

    this.#events = this.#events.map((oneEvent) =>
      oneEvent.id === newEvent.id ? newEvent : oneEvent
    );

    this._notify(updateType, newEvent);
  }

  addEvent(updateType, newEvent) {
    this.#events.unshift(newEvent);
    this._notify(updateType, newEvent);
  }

  deleteEvent(updateType, deletebleEvent) {
    const index = this.#events.findIndex(
      (oneEvent) => oneEvent.id === deletebleEvent.id
    );

    if (index === -1) {
      throw new Error('Event is not defind');
    }

    this.#events = this.#events.filter(
      (oneEvent) => oneEvent.id !== deletebleEvent.id
    );

    this._notify(updateType);
  }
}
