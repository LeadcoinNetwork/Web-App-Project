import React from "react"
import Button from "Components/Button"

const LeadsResults = ({
  leads,
  render,
  buttons,
  isNotAllSelected,
  toggleAll,
}) => (
  <section className="ldc-leads-results">
    <Button
      label={isNotAllSelected ? "select all" : "unselect all"}
      onClick={toggleAll}
      appStyle
    />
    {buttons.map(button => (
      <Button
        label={button.value}
        onClick={button.onClick}
        disabled={button.actionPerSelected && !leads.selected.size}
        appStyle
      />
    ))}
    <div className="lr-main">{leads.list.map(l => render(l))}</div>
  </section>
)

export default LeadsResults
