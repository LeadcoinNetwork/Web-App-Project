import React from "react"
import Button from "Components/Button"

const RealEstateLead = ({
  id = 1,
  specification = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  lead_price = 40,
  status = "live",
  date = "08/10/19",
  state = "NY",
  city = "New York",
  property_type = "top roof",
  bedrooms = 5,
  floor = 4,
  size = "50 SqFt",
  budget = "1.2m",
  name = "Meir Cohen",
  email = "meirkoen@gmail.com",
  phone = "+972-584709090",
  checked = false,
}) => {
  let temp

  const toggleCheck = () => {
    checked = !checked
    console.log(temp)

    temp.className = `ldc-real-estate-lead${checked ? " rel-checked" : ""}`
  }

  return (
    <section
      className={`ldc-real-estate-lead${checked ? " rel-checked" : ""}`}
      onClick={toggleCheck}
      ref={c => (temp = c)}
    >
      <div className="rel-specification">{specification}</div>
      <div className="rel-price">LDC {lead_price}</div>
      <div className="ldc-flex">
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
          <span>{size}</span>
          <span>${budget} budget</span>
        </div>
      </div>
      <button className="rel-buy-btn">buy</button>
    </section>
  )
}

export default RealEstateLead
