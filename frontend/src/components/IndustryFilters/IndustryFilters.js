import React from "react"

const IndustryFilters = ({ filters, show, onShowClick }) => (
  <div
    className={"industry-filters" + (!filters ? " hide" : "")}
    onClick={onShowClick}
  >
    More Filters ^
    {show && <div>Here go more filters</div>}
  </div>
)

export default IndustryFilters
