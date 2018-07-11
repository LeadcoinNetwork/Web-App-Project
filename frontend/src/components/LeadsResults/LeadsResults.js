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
        label={button.value}
        onClick={button.onClick}
        disabled={button.actionPerSelected && !leads.selected.size}
        appStyle
      />
    ))}
    <div className="lr-check-all">
      <label onClick={toggleAll}>
        {isNotAllSelected ? "check all" : "uncheck all"}
      </label>
    </div>
    <div className="lr-main">{leads.list.map(l => render(l))}</div>
  </section>
)

export default withInfiniteScroll()(LeadsResults)
