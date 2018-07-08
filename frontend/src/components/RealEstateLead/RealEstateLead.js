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
}) => {
  return (
    <section className="ldc-real-estate-lead">
      <div className="rel-specification">{specification}</div>
      <div className="rel-price">LDC {lead_price}</div>
      <div className="rel-status">{status}</div>
      <div className="rel-date">{date}</div>
      <div className="rel-location">
        {state}, {city}
      </div>
      <ul className="rel-fetchers">
        <li>{property_type}</li>
        <li>{bedrooms} rooms</li>
        <li>{floor}th floor</li>
        <li>{size}</li>
        <li>{budget}</li>
      </ul>
      <Button label="Buy Lead" appStyle />
    </section>
  )
}

export default RealEstateLead
