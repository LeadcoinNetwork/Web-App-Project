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
          lead.cardOpen || lead.constantCardOpen
            ? " rel-card-open"
            : " rel-card-closed"
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
      {lead.fieldsCheck.industry && (
        <div className="rel-industry">{lead.industry}</div>
      )}
      {lead.fieldsCheck.comments && (
        <div className="rel-description">{lead.comments}</div>
      )}
      {lead.fieldsCheck.lead_price && (
        <div className="rel-price">{lead.lead_price + " LDC"}</div>
      )}
      <div className="rel-details-wrapper">
        <div className="rel-details">
          <div className="reld-date">{fromNow(lead.date)}</div>
          {lead.fieldsCheck.contact_person && (
            <div className="rel-contact-details">
              {lead.fieldsCheck.contact_person && (
                <div className="reld-contact-person">{lead.contact_person}</div>
              )}
              {lead.fieldsCheck.email && (
                <div className="reld-email">{lead.email}</div>
              )}
              {lead.fieldsCheck.telephone && (
                <div className="reld-telephone">{lead.telephone}</div>
              )}
            </div>
          )}
        </div>
        <div className="rel-features">
          {lead.fieldsCheck.pages && (
            <span>
              {t("Number of pages: ")}
              {lead.pages}
            </span>
          )}
          {lead.fieldsCheck.content_updates && (
            <span>
              {t("Content Updates: ")}
              {lead.content_updates}
            </span>
          )}
          {lead.fieldsCheck.functionality && (
            <span>
              {t("Functionality: ")}
              {lead.functionality}
            </span>
          )}
          {lead.fieldsCheck.mobile_design && (
            <span>
              {t("Mobile Design: ")}
              {lead.mobile_design}
            </span>
          )}
          {lead.fieldsCheck.seo && (
            <span>
              {t("SEO: ")}
              {lead.seo}
            </span>
          )}
          {lead.fieldsCheck.content_management && (
            <span>
              {t("Content management: ")}
              {lead.content_management}
            </span>
          )}
          {lead.fieldsCheck.e_commerce && (
            <span>
              {t("E-commerce: ")}
              {lead.e_commerce}
            </span>
          )}
          {lead.fieldsCheck.blog && (
            <span>
              {t("Blog: ")}
              {lead.blog}
            </span>
          )}
          {lead.fieldsCheck.budget &&
            lead.budget && (
              <span>
                {t("Budget: ")}
                {priceString(Number(lead.budget))}
              </span>
            )}
          {lead.fieldsCheck.languages && (
            <span>
              {t("Languages: ")}
              {lead.languages}
            </span>
          )}
          {lead.fieldsCheck.hosting && (
            <span>
              {t("Hosting: ")}
              {lead.hosting}
            </span>
          )}
        </div>
      </div>
      {!lead.constantCardOpen && (
        <div className="rel-arrow">
          <div className="arrow-left" />
          <div className="arrow-right" />
        </div>
      )}
      {lead.isSelectable && (
        <div
          className={"rel-selector"}
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
