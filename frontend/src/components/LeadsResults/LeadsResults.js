import React from "react"
import RealEstateLead from "Components/RealEstateLead"

const leadTypes = {
  RealEstateLead: RealEstateLead,
}

const LeadsResults = ({ leads, leadType }) => {
  const Lead = leadTypes[leadType]

  return (
    <section className="ldc-leads-results">
      {leads.list.map(l => <Lead key={l.id} lead={l} />)}
      <RealEstateLead />
      <RealEstateLead />
      <RealEstateLead />
      <RealEstateLead />
      <RealEstateLead />
      <RealEstateLead />
      <RealEstateLead />
      <RealEstateLead />
      <RealEstateLead />
    </section>
  )
}

export default LeadsResults
