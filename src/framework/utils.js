import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

export function sortTaskUp(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dateFrom, taskB.dateFrom);

  return weight ?? dayjs(taskA.dateFrom).diff(dayjs(taskB.dateFrom));
}

export function sortTaskDown(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dateFrom, taskB.dateFrom);

  return weight ?? dayjs(taskB.dateFrom).diff(dayjs(taskA.dateFrom));
}
