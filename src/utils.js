const CITIES_COUNT = 6;

export const getActualCities = (offers) => {
  const cities = [];

  offers.forEach((item) => {
    cities.push(item.city);
  });

  let uniqCities = cities.filter((item, index) => cities.indexOf(item) === index);

  return uniqCities.slice(0, CITIES_COUNT);
};
