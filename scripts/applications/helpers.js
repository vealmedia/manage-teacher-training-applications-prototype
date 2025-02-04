const faker = require('faker');
const { DateTime } = require('luxon');

const SystemHelper = require('../../app/data/helpers/system');

const randomNumber = ( min, max ) => faker.datatype.number({ min, max });
const dateFrom = (date, days) => DateTime.fromISO(date).minus({days}).toISO();
const randomDateFrom = (date, min, max) => dateFrom(date, randomNumber(min, max));
const randomDateTo = exports.randomDateFrom = (date, min, max) => (date, days) => DateTime.fromISO(date).plus({days}).toISO();

exports.randomDateFrom = randomDateFrom;
exports.randomNumber = randomNumber;
exports.dateFrom = dateFrom;
exports.randomDate = (min, max) => SystemHelper.now().minus({ days: randomNumber(min, max) }).toISO();
exports.generateDatesFrom = ({ startDate, days, totalDates }) => {
  const maxInterval = Math.floor(days / totalDates);
  const endDate = dateFrom(startDate, days);
  const dates = [];

  for(let i = 0; i < totalDates - 1; i++){
    const dateFrom = i == 0 ? startDate : dates[ i - 1];
    dates.push(randomDateFrom(dateFrom, 0, maxInterval));
  }

  dates.push(endDate);

  return dates;
}
