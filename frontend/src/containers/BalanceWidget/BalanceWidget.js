import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Numbers } from "../../utils/numbers"
import t from "../../utils/translate/translate"


const BalanceWidget = ({ balance }) => (
  <>
    {balance.loading ? null : (
      <div className="ldc-balance-widget">
        {t("Balance")}: {Numbers.priceString(balance.total)}
        <Link to="/withdraw">{t("Withdraw")}</Link>
      </div>
    )}
  </>
)

const mapStateToProps = state => ({
  balance: state.balance,
})

export default connect(mapStateToProps)(BalanceWidget)
