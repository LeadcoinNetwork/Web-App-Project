import React from "react"
import Button from "../button"
import Select from "../select"
import withInfiniteScroll from "../../hoc/withInfiniteScroll"
import t from "../../utils/translate/translate"

const LeadsResults = ({
  leads,
  renderLead,
  renderFilters,
  renderResultsHead,
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
      {isNotAllSelected ? t("check all") : t("uncheck all")}
    </label>
    {renderFilters()}
    {renderResultsHead()}
    <div className="lr-main">{leads.list.map(l => renderLead(l))}</div>
  </section>
)

export default withInfiniteScroll()(LeadsResults)
