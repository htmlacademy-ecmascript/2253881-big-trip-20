import Observable from '../framework/observable';
import { UPDATE_TYPE } from '../framework/consts';

export default class EventModel extends Observable {
  #events = [];
  #destinations = [];
  #offers = [];
  #eventsApiServices = null;

  constructor({ eventsApiServices }) {
    super();
    this.#eventsApiServices = eventsApiServices;
  }

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async downloadEvents() {
    try {
      const events = await this.#eventsApiServices.events;
      this.#destinations = await this.#eventsApiServices.destinations;
      this.#offers = await this.#eventsApiServices.offers;

      this.#events = this.#eventsApiServices.adaptToClient(
        events,
        this.#destinations,
        this.#offers
      );
    } catch (err) {
      this.#events = [];
    }
    this._notify(UPDATE_TYPE.INIT);
  }

  async updateEvent(updateType, newEvent) {
    const index = this.#events.findIndex(
      (oneEvent) => oneEvent.id === newEvent.id
    );

    if (index === -1) {
      throw new Error('Event is not defind');
    }
    try {
      const response = await this.#eventsApiServices.updateEvent(newEvent);

      const updatedEvent = this.#eventsApiServices.adaptToClientOneEvent(
        response,
        this.#destinations,
        this.#events
      );

      this.#events = this.#events.map((oneEvent) =>
        oneEvent.id === updatedEvent.id ? newEvent : oneEvent
      );

      this._notify(updateType, newEvent);
    } catch (e) {
      throw new Error('Cant update event');
    }
  }

  async addEvent(updateType, newEvent) {
    try {
      const response = await this.#eventsApiServices.addEvent(newEvent);

      const ansEvent = this.#eventsApiServices.adaptToClientOneEvent(
        response,
        this.#destinations,
        this.#offers
      );

      this.#events.unshift(ansEvent);

      this._notify(updateType, ansEvent);
    } catch (e) {
      throw new Error('some KEK');
    }
  }

  async deleteEvent(updateType, deletebleEvent) {
    const index = this.#events.findIndex(
      (oneEvent) => oneEvent.id === deletebleEvent.id
    );

    if (index === -1) {
      throw new Error('Event is not defind');
    }
    try {
      await this.#eventsApiServices.deleteEvent(deletebleEvent);

      this.#events = this.#events.filter(
        (oneEvent) => oneEvent.id !== deletebleEvent.id
      );

      this._notify(updateType);
    } catch (e) {
      throw new Error('Some ne kek');
    }
  }
}
