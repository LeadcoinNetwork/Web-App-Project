import React from "react"

import ReactModal from "react-modal"
import t from "../../utils/translate/translate"
import Button from "../../components/Button"
import TextField from "../TextField"
import { toast } from "react-toastify"
import ConfirmationDialog from "../ConfirmationDialog"

class Bet extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      bet: props.value,
      showConfirm: false,
    }
  }

  handleChange = bet => {
    console.log(bet)
    this.setState({
      bet: bet,
    })
  }

  onOk = () => {
    this.props.onSuccess()
  }

  showConfirm = () => {
    this.setState({ showConfirm: true })
  }

  checkBet = () => {
    if (this.state.bet > this.props.value) {
      this.showConfirm()
    } else {
      toast.error(t("You can use only value more than current"))
      this.setState({
        bet: this.props.value,
      })
    }
  }

  render = () => {
    const { isOpen, onRequestClose, onClose } = this.props

    return (
      <>
        {this.state.showConfirm && (
          <ConfirmationDialog
            description="You are make the bet on selected auction. Are you sure you want to proceed?"
            onConfirm={() => {
              this.setState({ showConfirm: false })
              this.onOk()
            }}
            onDismiss={() => this.setState({ showConfirm: false })}
          />
        )}
        {!this.state.showConfirm && (
          <ReactModal
            isOpen={isOpen}
            contentLabel={t("Bet")}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className="modal-container"
            overlayClassName="modal-overlay"
          >
            <div className="bet">
              <div className="bet_header">
                <div className="auctionNew_headerTitle">{t("Make bet")}</div>
                <div className="close-button" onClick={onClose}>
                  <i className="fas fa-times" />
                </div>
              </div>
              <div className="bet_body">
                <div className="bet_price">
                  <TextField
                    type="number"
                    placeholder={t("Lead price")}
                    value={this.state.bet}
                    name="bet_price"
                    onChange={e => {
                      this.handleChange(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="buttons-section">
                <Button
                  className="button"
                  appStyle={true}
                  onClick={this.checkBet}
                >
                  {t("Ok")}
                </Button>
                <Button className="button" appStyle={true} onClick={onClose}>
                  {t("Cancel")}
                </Button>
              </div>
            </div>
          </ReactModal>
        )}
      </>
    )
  }
}

export default Bet
