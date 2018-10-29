import React from "react"
import RealEstateLead from "./RealEstateLead"
import DesignLead from "./DesignLead"

const CardView = props => {
  if (props.industry === "Real Estate") {
    return <RealEstateLead {...props} />
  } else if (props.industry === "Design") {
    return <DesignLead {...props} />
  }
}

export default CardView
