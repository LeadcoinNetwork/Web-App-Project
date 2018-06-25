export const Numbers = {
  localeFormat: number => number.toLocaleString(),
  priceString: (number, currency) => number.toLocaleString('en-US', {style: 'currency', currency: currency ? currency : 'USD'}),
}