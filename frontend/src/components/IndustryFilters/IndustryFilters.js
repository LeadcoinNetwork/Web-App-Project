import React from "react"

const IndustryFilters = ({ filters, expand, onExpandClick }) => (
  <div
    className={
      "industry-filters" +
      (!filters ? " hide" : "") +
      (expand ? " filters-expanded" : "")
    }
  >
    <div className="expand-selection" onClick={onExpandClick}>
      <span>More Filters</span>
      <div className="expand-arrow">
        <div className="arrow-left" />
        <div className="arrow-right" />
      </div>
    </div>
    {expand && <div>Here go more filters</div>}
  </div>
)

export default IndustryFilters
