import React from "react"
import Rating from "react-rating"

const RatingCustom = props => {
  const { start = 0, stop = 5, step = 1 } = props
  return (
    <>
      <Rating
        {...props}
        start={start}
        stop={stop}
        step={step}
        emptySymbol={<i className="far fa-star" />}
        fullSymbol={<i className="fas fa-star" />}
      />
    </>
  )
}

export default RatingCustom
