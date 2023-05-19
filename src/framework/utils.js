import { FILTER_TYPE } from './consts';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const ZERO = 0;
const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

export function getDiffDates(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDur = 0;

  switch (true) {
    case diff >= MSEC_IN_DAY:
      pointDur = dayjs.duration(diff).format('DD[D] HH[H] mm[M]');
      break;
    case diff >= MIN_IN_HOUR:
      pointDur = dayjs.duration(diff).format('HH[H] mm[M]');
      break;
    case diff < MSEC_IN_HOUR:
      pointDur = dayjs.duration(diff).format('mm[M]');
      break;
  }

  return pointDur;
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

export const filter = {
  [FILTER_TYPE.EVERYTHINK]: (events) => events,
  [FILTER_TYPE.FUTURE]: (events) =>
    events.filter(
      (oneEvent) => dayjs(oneEvent.dateFrom).diff(new Date()) > ZERO
    ),
  [FILTER_TYPE.PRESENT]: (events) =>
    events.filter(
      (oneEvent) =>
        dayjs(oneEvent.dateFrom).diff(new Date()) <= ZERO &&
        dayjs(oneEvent.dateTo).diff(new Date()) >= ZERO
    ),
  [FILTER_TYPE.PAST]: (events) =>
    events.filter((oneEvent) => dayjs(oneEvent.dateTo).diff(new Date()) < ZERO),
};
