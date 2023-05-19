import { generateObj } from '../mocks/mock';
import Observable from '../framework/observable';

export default class EventModel extends Observable {
  #events = generateObj(Math.floor(Math.random() * 10));

  get events() {
    return this.#events;
  }

  updateEvents(updateType, newEvent) {
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
