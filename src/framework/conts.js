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
};

export const FILTER_TYPE = {
  EVERYTHINK: 'everythink',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const LABEL = 'LABEL';
export const INPUT = 'INPUT';
export const ESC = 'Escape';

export const placeToRenderForOneElemPresenterElem =
  document.querySelector('.trip-events__list');
