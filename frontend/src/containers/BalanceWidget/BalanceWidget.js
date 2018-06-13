import React from "react"
import Button from "Components/Button"
import { connect } from "react-redux"

const BalanceWidget = ({ total, inEscrow }) => (
  <div className="balance-widget">
    <div className="balance-total">{total}</div>
    {inEscrow !== "$0.00" && (
      <div className="balance-escrow">{"(" + inEscrow + " in Escrow)"}</div>
    )}
  </div>
)

const mapStateToProps = state => state.balance

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceWidget)
