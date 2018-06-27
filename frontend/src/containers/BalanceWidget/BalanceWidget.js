import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Numbers } from "../../utils/numbers"

const BalanceWidget = ({ balance }) => (
  <>
    {balance.loading ? null : (
      <div className="ldc-balance-widget">
        Balance: {Numbers.priceString(balance.total)}
        <Link to="/withdraw">Withdraw</Link>
      </div>
    )}
  </>
)

const mapStateToProps = state => ({
  balance: state.balance,
})

export default connect(mapStateToProps)(BalanceWidget)
