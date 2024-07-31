import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  const value = Math.round(number);
  return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format().replace(',', '.');
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}

export const fBumdesId = (val) => {
  const cleaned = `${val}`.replace(/\D/g, '');
  const match = cleaned.match(/(\d{0,10})?(\d{0,1})?(\d{0,6})$/);

  if (match) {
    const value = [match[1], match[2] ? '-' : '', match[2], match[3] ? '-' : '', match[3]].join('');
    return value;
  }
  return '';
};
