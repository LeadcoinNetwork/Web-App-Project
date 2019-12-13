import React from "react"

import ReactModal from "react-modal"
import t from "../../utils/translate/translate"
import Button from "../../components/Button"
import TextField from "../TextField"
import { toast } from "react-toastify"

class Bet extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      bet: props.value,
    }
  }

  handleChange = bet => {
    console.log(bet)
    this.setState({
      bet: bet,
    })
  }

  onOk = () => {
    if (this.state.bet > this.props.value) {
      this.props.onSuccess()
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
      <ReactModal
        isOpen={isOpen}
        contentLabel={t("New auction")}
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
            <Button className="button" appStyle={true} onClick={onClose}>
              {t("Cancel")}
            </Button>
            <Button className="button" appStyle={true} onClick={this.onOk}>
              {t("Ok")}
            </Button>
          </div>
        </div>
      </ReactModal>
    )
  }
}

export default Bet
