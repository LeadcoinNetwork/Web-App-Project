import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Button from "Components/Button"
import { Numbers } from "../../utils/numbers"

const BalanceWidget = ({ loading, total, inEscrow }) => (
  <div className="balance-widget">
    {!loading && <div>
        <div className="balance-total">{"Balance: " + Numbers.priceString(total)}</div>
        {inEscrow !== 0 && (
          <div className="balance-escrow">{"(" + Numbers.priceString(inEscrow) + " in Escrow)"}</div>
        )}
        <Link to="/withdraw">Withdraw</Link>
      </div>
    }
  </div>
)

const mapStateToProps = state => state.balance

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceWidget)
