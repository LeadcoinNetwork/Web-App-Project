export const Numbers = {
  format: number => number.toLocaleString(),
  localeString: (number, currency) => number.toLocaleString('en-US', {style: 'currency', currency: currency ? currency : 'USD'}),
}