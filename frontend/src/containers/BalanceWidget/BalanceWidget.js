import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { priceString } from "Utils/numbers"

const BalanceWidget = ({ balance }) => (
  <>
    {balance.loading ? null : (
      <div className="ldc-balance-widget">{priceString(balance.total)}</div>
    )}
  </>
)

const mapStateToProps = state => ({
  balance: state.balance,
})

export default connect(mapStateToProps)(BalanceWidget)
