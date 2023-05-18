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

export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const LABEL = 'LABEL';
export const INPUT = 'INPUT';
export const ESC = 'Escape';

export const placeToRenderForOneElemPresenterElem =
  document.querySelector('.trip-events__list');
