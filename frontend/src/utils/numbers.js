import React from "react"

const storage = window.localStorage

export const localeFormat = number => number.toLocaleString()

export const priceString = (number = 0, currency = "USD") => {
  if (typeof number === "string") {
    number[0] === "$" ? (number = number.slice(1)) : undefined
    number = parseInt(number)
  }
  if (isNaN(number)) {
    return ""
  }
  return number.toLocaleString(
    "en-US",
    {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    },
  )
}

export const areaSpanEl = number => {
  if (!number) {
    return <span />
  }
  switch (storage.getItem("current")) {
    case "en":
      return (
        <span>
          {number + " ft"}
          <sup>2</sup>
        </span>
      )
    default:
      return (
        <span>
          {number + " m"}
          <sup>2</sup>
        </span>
      )
  }
}
