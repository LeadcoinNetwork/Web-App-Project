import React from "react"

const IndustryFilters = ({ filters, expand, onExpandClick }) => (
  <div
    className={"industry-filters" + (!filters ? " hide" : "")}
    onClick={onExpandClick}
  >
    More Filters ^
    {expand && <div>Here go more filters</div>}
  </div>
)

export default IndustryFilters
