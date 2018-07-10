import React from "react"
import Button from "Components/Button"

const LeadsResults = ({ leads, render, toggleAll }) => (
  <section className="ldc-leads-results">
    <Button label="select all" onClick={toggleAll} appStyle />
    <div className="lr-main">{leads.list.map(l => render(l))}</div>
  </section>
)

export default LeadsResults
