export const localeFormat = number => number.toLocaleString()

export const priceString = (number = 0, currency = "USD") =>
  number.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  })
