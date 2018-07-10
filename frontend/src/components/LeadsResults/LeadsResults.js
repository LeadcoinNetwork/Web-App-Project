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
    {buttons.map(button => (
      <Button
        label={button.value}
        onClick={button.onClick}
        disabled={button.actionPerSelected && !leads.selected.size}
        appStyle
      />
    ))}
    <Button
      label={isNotAllSelected ? "check all" : "uncheck all"}
      onClick={toggleAll}
      appStyle
    />
    <div className="lr-main">{leads.list.map(l => render(l))}</div>
  </section>
)

export default LeadsResults
