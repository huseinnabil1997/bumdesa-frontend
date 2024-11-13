import moment from 'moment';

export const yearFoundedOptions = (foundedAt) => {
  const currentYear = moment().year();
  const startYear = moment(foundedAt).year();
  const options = [];

  for (let year = startYear; year <= currentYear; year++) {
    options.push({ value: year.toString(), label: year.toString() });
  }

  return options;
};
