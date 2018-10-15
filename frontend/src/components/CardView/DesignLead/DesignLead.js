import React from "react"
import Button from "../../../components/Button"
import { fromNow } from "../../../utils/time"
import { priceString } from "../../../utils/numbers"
import t from "../../../utils/translate/translate"

const DesignLead = lead => {
  let fieldsCheck = {}
  fields.forEach(element => {
    fieldsCheck[element.key] = element.key
  })

  return (
    <section
      className={`ldc-design-lead${lead.checked ? " card-checked" : ""}
        ${lead.isSelectable ? " card-selectable" : ""}
        ${
          lead.cardOpen || lead.constantCardOpen ? " card-open" : " card-closed"
        }
        ${lead.constantCardOpen ? " constant-card-open" : ""}`}
      onClick={lead.toggleCardView}
    >
      {lead.editLead && (
        <div className="lead_ops">
          <div className="edit op">
            <div
              className="pencil-ldc"
              onClick={() => {
                lead.push("/edit-lead-" + lead.id)
              }}
            />
          </div>
        </div>
      )}
      {fieldsCheck.Industry && (
        <div className="card-industry">{lead.Industry}</div>
      )}
      {fieldsCheck.Description && (
        <div className="card-description">{lead.Description}</div>
      )}
      {fieldsCheck.lead_price && (
        <div className="card-price">{priceString(lead.lead_price)}</div>
      )}
      <div className="card-details-wrapper">
        <div className="card-details">
          {fieldsCheck.Category && (
            <div className="card-details-category">{lead.Category}</div>
          )}
          <div className="card-details-date">{fromNow(lead.date)}</div>
          <div className="card-details-location">
            {lead.State}, {lead.Location}
          </div>
          {fieldsCheck["Contact Person"] && (
            <div className="card-contact-details">
              {fieldsCheck["Contact Person"] && (
                <div className="card-details-contact-person">
                  {lead["Contact Person"]}
                </div>
              )}
              {fieldsCheck.Email && (
                <div className="card-details-email">{lead.Email}</div>
              )}
              {fieldsCheck.Telephone && (
                <div className="card-details-telephone">{lead.Telephone}</div>
              )}
            </div>
          )}
        </div>
        <div className="card-features">
          {fieldsCheck["Housing Type"] &&
            lead["Housing Type"].length > 0 && (
              <span>{lead["Housing Type"]}</span>
            )}
          {fieldsCheck["Bedrooms/Baths"] &&
            lead["Bedrooms/Baths"].length > 0 && (
              <span>{lead["Bedrooms/Baths"]}</span>
            )}
          {fieldsCheck.Size && lead.Size.length > 0 && areaSpanEl(lead.Size)}
          {fieldsCheck.Price &&
            lead.Price && (
              <span>
                {t("Price ")}
                {priceString(lead.Price)}
              </span>
            )}
        </div>
      </div>
      {!lead.constantCardOpen && (
        <div className="card-arrow">
          <div className="arrow-left" />
          <div className="arrow-right" />
        </div>
      )}
      {lead.isSelectable && (
        <div
          className={"card-selector"}
          onClick={e => {
            e.stopPropagation()
            lead.toggleCheck(e, lead.id)
          }}
        >
          <div className="select-icon">
            <div className="up-down" />
            <div className="left-right" />
          </div>
        </div>
      )}
      {/* <div className="card-buttons">
        {lead.buttons &&
          lead.buttons.map(button => (
            <button
              key={button.value}
              className="card-btn"
              onClick={() => button.onClick(lead.id)}
            >
              {button.value}
            </button>
          ))}
      </div> */}
    </section>
  )
}

export default DesignLead
