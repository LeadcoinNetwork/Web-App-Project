import React from "react"
import Button from "Components/Button"
import withInfiniteScroll from "HOC/withInfiniteScroll"

const LeadsResults = ({
  leads,
  render,
  buttons,
  isNotAllSelected,
  toggleAll,
}) => (
  <section className="ldc-leads-results">
    {buttons.map(button => (
      <Button
        key={button.value}
        label={button.value}
        onClick={button.onClick}
        disabled={button.actionPerSelected && !leads.selected.size}
        appStyle
      />
    ))}
    <label className="lr-check-all" onClick={toggleAll}>
      {isNotAllSelected ? "check all" : "uncheck all"}
    </label>
    <div className="lr-results-head">
      <label className="lr-results-count">
        {leads.list.length} of {leads.total} results
      </label>
      <select>
        <option>Sort By</option>
        <option>size</option>
        <option>budget</option>
      </select>
    </div>
    <div className="lr-main">{leads.list.map(l => render(l))}</div>
  </section>
)

export default withInfiniteScroll()(LeadsResults)
