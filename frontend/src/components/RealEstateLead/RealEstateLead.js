import React from "react"
import Button from "Components/Button"
import { fromNow } from "Utils/time"
import { priceString } from "../../utils/numbers"

const RealEstateLead = lead => {
  return (
    <section
      className={`ldc-real-estate-lead${lead.checked ? " rel-checked" : ""}
        ${lead.isSelectable ? " rel-selectable" : ""}
        ${lead.cardOpen ? " rel-card-open" : " rel-card-closed"}`}
      onClick={lead.toggleCardView}
      // onClick={lead.isSelectable && lead.toggleCheck}
    >
      <div className="rel-specification">{lead.Description}</div>
      {lead.lead_price && <div className="rel-price">${lead.lead_price}</div>}
      <div className="rel-details-wrapper">
        <div className="rel-details">
          <div className="reld-type">{lead.Type}</div>
          {/* <div className="reld-date">{fromNow(Date(lead.date))}</div> */}
          <div className="reld-location">
            {lead.State}, {lead.Location}
          </div>
        </div>
        <div className="rel-features">
          <span>{lead["Housing Type"]}</span>
          <span>{lead["Bedrooms/Baths"]}</span>
          <span>{lead.Size}</span>
          <span>Price {priceString(lead.Price)}</span>
        </div>
      </div>
      <div className="rel-arrow">
        <div className="arrow-left" />
        <div className="arrow-right" />
      </div>
      <div
        className={"rel-selector"}
        onClick={
          lead.isSelectable &&
          (e => {
            e.stopPropagation()
            lead.toggleCheck(e, lead.id)
          })
        }
      >
        <div className="select-icon">
          <div className="up-down" />
          <div className="left-right" />
        </div>
      </div>
      {/* <div className="rel-buttons">
        {lead.buttons &&
          lead.buttons.map(button => (
            <button
              key={button.value}
              className="relb-btn"
              onClick={() => button.onClick(lead.id)}
            >
              {button.value}
            </button>
          ))}
      </div> */}
    </section>
  )
}

export default RealEstateLead
