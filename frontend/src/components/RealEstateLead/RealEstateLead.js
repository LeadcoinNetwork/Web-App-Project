import React from "react"
import Button from "Components/Button"
import { fromNow } from "Utils/time"
import { priceString } from "../../utils/numbers"
import t from "../../utils/translate/translate"

const RealEstateLead = lead => {
  return (
    <section
      className={`ldc-real-estate-lead${lead.checked ? " rel-checked" : ""}
        ${lead.isSelectable ? " rel-selectable" : ""}
        ${
          lead.cardOpen || lead.showAllCardsDetails
            ? " rel-card-open"
            : " rel-card-closed"
        }`}
      onClick={lead.toggleCardView}
    >
      {lead.fieldsCheck.Description && (
        <div className="rel-specification">{lead.Description}</div>
      )}
      {lead.fieldsCheck.lead_price && (
        <div className="rel-price">{priceString(lead.lead_price)}</div>
      )}
      <div className="rel-details-wrapper">
        <div className="rel-details">
          {lead.fieldsCheck.Type && (
            <div className="reld-type">{lead.Type}</div>
          )}
          <div className="reld-date">{fromNow(lead.date)}</div>
          <div className="reld-location">
            {lead.State}, {lead.Location}
          </div>
          {lead.fieldsCheck["Contact Person"] && (
            <div className="rel-contact-details">
              {lead.fieldsCheck["Contact Person"] && (
                <div className="reld-contact-person">
                  {lead["Contact Person"]}
                </div>
              )}
              {lead.fieldsCheck.Email && (
                <div className="reld-email">{lead.Email}</div>
              )}
              {lead.fieldsCheck.Telephone && (
                <div className="reld-telephone">{lead.Telephone}</div>
              )}
            </div>
          )}
        </div>
        <div className="rel-features">
          {lead.fieldsCheck["Housing Type"] &&
            lead["Housing Type"].length > 0 && (
              <span>{lead["Housing Type"]}</span>
            )}
          {lead.fieldsCheck["Bedrooms/Baths"] &&
            lead["Bedrooms/Baths"].length > 0 && (
              <span>{lead["Bedrooms/Baths"]}</span>
            )}
          {lead.fieldsCheck.Size &&
            lead.Size.length > 0 && <span>{lead.Size}</span>}
          {lead.fieldsCheck.Price &&
            lead.Price && (
              <span>
                {t("Price ")}
                {priceString(lead.Price)}
              </span>
            )}
        </div>
      </div>
      {!lead.showAllCardsDetails && (
        <>
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
        </>
      )}
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
