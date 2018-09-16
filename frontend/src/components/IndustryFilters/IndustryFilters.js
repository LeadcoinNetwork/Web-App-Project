import React from "react"
import Filter from "./Filter"

const IndustryFilters = ({ filters, expand, onExpandClick, handleFilter }) => (
  <div
    className={
      "industry-filters" +
      (!filters ? " hide" : "") +
      (expand ? " filters-expanded" : "")
    }
  >
    <div className="expand-selection" onClick={onExpandClick}>
      <span>Advanced Filters</span>
      <div className="expand-arrow">
        <div className="arrow-left" />
        <div className="arrow-right" />
      </div>
    </div>
    {expand &&
      filters.map((f, index) => (
        <Filter
          key={index}
          index={index}
          filter={f}
          filters={filters}
          handleFilter={handleFilter}
        />
      ))}
  </div>
)

export default IndustryFilters
