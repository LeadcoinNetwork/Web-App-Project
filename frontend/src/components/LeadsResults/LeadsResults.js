import React from "react"

const LeadsResults = ({ leads, render }) => (
  <section className="ldc-leads-results">
    {leads.list.map(l => render(l))}
  </section>
)

export default LeadsResults
