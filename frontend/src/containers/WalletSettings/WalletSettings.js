import React from "react"
import Button from "Components/Button"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import t from "../../utils/translate/translate"
import ConfirmationDialog from "../../components/ConfirmationDialog"
import * as actions from "Actions"

class WalletSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false,
      wallet: props.user ? props.user.wallet : "",
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user) {
      return { ...state, wallet: state.wallet || props.user.wallet }
    }
    return state
  }

  handleChange(value) {
    this.setState({ wallet: value })
  }

  handleSubmit() {
    this.props.editWallet(this.state.wallet)
  }

  render() {
    return (
      <div>
        <div>
          <h1>{t("Edit your wallet")}</h1>
          <h3>{t("Here you can change your wallet or enter a new one.")}</h3>
        </div>

        <div className="wallet-container line flexed">
          <div className="fieldLabel">
            <span>{t("Edit wallet")}</span>
          </div>
          <div className="fieldValue">
            <TextField
              appStyle={true}
              placeholder={t("Wallet")}
              type={"text"}
              value={this.state.wallet}
              onChange={e => {
                this.handleChange(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="controls field_submit flexed">
          <div>
            <Button
              appStyle={true}
              onClick={() => {
                this.setState({ showConfirmation: true })
              }}
              label={t("Submit")}
            />
            {this.state.showConfirmation && (
              <ConfirmationDialog
                description="You are about to change your wallet. Are you sure you want to proceed?"
                onConfirm={() => {
                  this.handleSubmit()
                  this.setState({ showConfirmation: false })
                }}
                onDismiss={() => this.setState({ showConfirmation: false })}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, {
  editWallet: actions.user.editWallet,
  push,
})(WalletSettings)
