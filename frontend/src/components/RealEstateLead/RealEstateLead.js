import React from "react"
import Button from "Components/Button"

const RealEstateLead = ({
  id,
  specification,
  lead_price,
  status,
  date,
  state,
  city,
  property_type,
  bedrooms,
  floor,
  size,
  budget,
  name,
  email,
  phone,
  buttons,
  checked,
  toggleCheck,
}) => {
  return (
    <section
      className={`ldc-real-estate-lead${checked ? " rel-checked" : ""}`}
      onClick={toggleCheck}
    >
      <div className="rel-specification">{specification}</div>
      <div className="rel-price">LDC {lead_price}</div>
      <div className="rel-details-wrapper">
        <div className="rel-details">
          <div className="reld-status">{status}</div>
          <div className="reld-date">{date}</div>
          <div className="reld-location">
            {state}, {city}
          </div>
        </div>
        <div className="rel-features">
          <span>{property_type}</span>
          <span>{bedrooms} rooms</span>
          <span>{floor}th floor</span>
          <span>{size} SqFt</span>
          <span>${budget} budget</span>
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
