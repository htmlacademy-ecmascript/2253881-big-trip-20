export const SORT_TYPES = {
  day: 'day',
  event: 'event',
  time: 'time',
  price: 'price',
  offers: 'offers',
};

export const MODE = {
  closed: 'closed',
  openened: 'opened',
};

export const USER_ACTION = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const AUTHORIZATION = 'Basic jkahsdsasdasda7816381724dsf';

export const URLS = {
  MAIN: 'https://20.objects.pages.academy/big-trip',
  EVENTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export const METODS = {
  GET: 'GET',
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT',
};

export const TIME_LIMITS = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export const ELEMENTS_LIST = ['everything', 'future', 'present', 'past'];

export const LABEL = 'LABEL';
export const INPUT = 'INPUT';
export const ESC = 'Escape';
export const SPAN = 'SPAN';

export const placeToRenderForOneElemPresenterElem =
  document.querySelector('.trip-events__list');
