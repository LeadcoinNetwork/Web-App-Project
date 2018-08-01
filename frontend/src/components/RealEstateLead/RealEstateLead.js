import React from "react"
import Button from "Components/Button"
import { fromNow } from "Utils/time"

const RealEstateLead = ({
  id,
  date,
  description,
  bedrooms_baths,
  type,
  price,
  size,
  state,
  location,
  housing_type,
  name,
  phone,
  lead_price,
  buttons,
  checked,
  toggleCheck,
}) => {
  return (
    <section
      className={`ldc-real-estate-lead${checked ? " rel-checked" : ""}`}
      onClick={toggleCheck}
    >
      <div className="rel-specification">{description}</div>
      <div className="rel-price">${lead_price}</div>
      <div className="rel-details-wrapper">
        <div className="rel-details">
          <div className="reld-type">{type}</div>
          <div className="reld-date">{fromNow(Date(date))}</div>
          <div className="reld-location">
            {state}, {location}
          </div>
        </div>
        <div className="rel-features">
          <span>{housing_type}</span>
          <span>{bedrooms_baths}</span>
          <span>{size} SqFt</span>
          <span>Price ${price}</span>
        </div>
      </div>
      <div className="rel-buttons">
        {buttons.map(button => (
          <button
            key={button.value}
            className="relb-btn"
            onClick={() => button.onClick(id)}
          >
            {button.value}
          </button>
        ))}
      </div>
    </section>
  )
}

export default RealEstateLead
