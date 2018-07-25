import React from "react"
import { connect } from "react-redux"
import { withdraw } from "../../actions"
import TextField from "Components/TextField"
import Button from "Components/Button"
import { priceString } from "Utils/numbers"
import t from "../../utils/translate/translate"

class Withdraw extends React.Component {
  handleChange = event => {
    this.props.onChange(event.target.name, event.target.value)
  }
  getErrors(errors) {
    return (
      <ul className="ldc-error-text">
        {errors.split(";").map(e => <li>{t(e)}</li>)}
      </ul>
    )
  }
  render() {
    const { withdraw, balance } = this.props
    return (
      <div className="withdraw-page">
        <h1>{t("Withdraw Funds")}</h1>
        <h3>
          {t("Withdraw the money that you’ve earned to your Paypal account.")}
        </h3>
        <p className="total">
          {t("Total balance: ") + priceString(balance.total)}
        </p>
        <p className="available">
          {t("Balance available to withdraw: ") +
            priceString(balance.total - balance.inEscrow)}
        </p>
        <p className="label">
          {t("To withdraw your funds please enter your PayPal email address")}
        </p>
        <TextField
          appStyle={true}
          placeholder={t("Enter PayPal Email")}
          name="userEmail"
          value={withdraw.userEmail}
          disabeld={withdraw.loading}
          onChange={this.handleChange}
          type="text"
        />
        <Button
          label={t("submit")}
          loading={withdraw.loading}
          onClick={this.props.onSubmit}
          appStyle={true}
        />
        {withdraw.error && this.getErrors(withdraw.error)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  withdraw: state.withdraw,
  balance: state.balance,
})

export default connect(
  mapStateToProps,
  {
    onChange: withdraw.withdrawPageFormUpdate,
    onSubmit: withdraw.withdrawPageSubmit,
  },
)(Withdraw)
