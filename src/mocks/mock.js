import { nanoid } from 'nanoid';
import { getRandomArbitrary } from '../framework/utils';

export const FLIGHT_POINTS = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'New York',
  'Moskow',
  'Tokyo',
];

export const MOVING_ELEMENTS = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const getRandomElem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const mapCitys = new Map();
export const mapOffers = new Map();

FLIGHT_POINTS.forEach((elem) => {
  mapCitys.set(elem, {
    cityName: elem,
    description: `${elem}, is a beautiful city, a true asian pearl, with crowded streets.',
    sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus`,
    pictures: Array.from({ length: Math.floor(Math.random() * 10) }, () => ({
      src: `https://loremflickr.com/248/152?random=${Math.floor(
        Math.random() * 10000
      )}`,
      description: `${elem} parliament building`,
    })),
  });
});

MOVING_ELEMENTS.forEach((elem) => {
  mapOffers.set(elem, {
    type: elem,
    offers: Array.from({ length: Math.floor(Math.random() * 10) }, () => ({
      title: 'Upgrade class',
      price: Math.floor(Math.random() * 10000),
    })),
  });
});

export const generateObj = (count) => {
  if (count > 20 || count < 0) {
    count = 5;
  }
  let i = 0;
  let typeOfMoving;
  const data = [];
  while (i <= count) {
    i++;
    typeOfMoving = getRandomElem(MOVING_ELEMENTS);

    data.push({
      id: nanoid(),
      basePrice: Math.floor(Math.random() * 100000),
      dateFrom: new Date(
        getRandomArbitrary(2022, 2022),
        5,
        getRandomArbitrary(2, 3),
        getRandomArbitrary(2, 15),
        getRandomArbitrary(5, 50)
      ),
      dateTo: new Date(
        getRandomArbitrary(2022, 2022),
        5,
        getRandomArbitrary(4, 5),
        getRandomArbitrary(2, 15),
        getRandomArbitrary(2, 50)
      ),
      destination: mapCitys.get(getRandomElem(FLIGHT_POINTS)),
      isFavourite: [true, false][Math.floor(Math.random() * 2)],
      offers: mapOffers.get(typeOfMoving),
      type: typeOfMoving,
    });
  }

  return data;
};
