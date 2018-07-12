import React from "react"
import Button from "Components/Button"
import Select from "Components/Select"
import withInfiniteScroll from "HOC/withInfiniteScroll"
import t from "../../utils/translate/translate"

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
      {isNotAllSelected ? t("check all") : t("uncheck all")}
    </label>
    <div className="lr-results-head">
      <label className="lr-results-count">
        {leads.list.length} {t("of")} {leads.total} {t("results")}
      </label>
      <Select>
        <option>{t("Sort By")}</option>
        <option>{t("size")}</option>
        <option>{t("budget")}</option>
      </Select>
    </div>
    <div className="lr-main">{leads.list.map(l => render(l))}</div>
  </section>
)

export default withInfiniteScroll()(LeadsResults)
