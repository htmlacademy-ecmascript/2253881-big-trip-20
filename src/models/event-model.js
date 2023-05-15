import { generateObj } from '../mocks/mock';

export default class EventModel {
  #events = generateObj(Math.floor(Math.random() * 10));

  get points() {
    return this.#events;
  }
}
