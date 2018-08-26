import React from "react"
import Button from "Components/Button"
import Select from "Components/Select"
import withInfiniteScroll from "HOC/withInfiniteScroll"
import t from "../../utils/translate/translate"

const LeadsResults = ({
  leads,
  renderLead,
  renderResultsHead,
  buttons = [],
  isSelectable,
  isNotAllSelected,
  isSearchResults,
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
    {false &&
      isSelectable && (
        <label className="lr-check-all" onClick={toggleAll}>
          {isNotAllSelected ? t("select all") : t("unselect all")}
        </label>
      )}
    {renderResultsHead(isSearchResults)}
    <div className="lr-main">
      {leads.list.map((l, index) => renderLead(l, index))}
    </div>
  </section>
)

export default withInfiniteScroll()(LeadsResults)
