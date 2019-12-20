import React from "react"

import ReactModal from "react-modal"
import DatePicker from "react-datepicker"
import t from "../../utils/translate/translate"
import Button from "../../components/Button"

class AuctionNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      endDate: this.initDate(),
    }
  }

  initDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date
  }

  handleChangeData = date => {
    console.log(date)
    this.setState({
      endDate: date,
    })
  }

  onOk = () => {
    this.props.onOk && this.props.onOk({ ...this.state })
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
        <div className="auctionNew">
          <div className="auctionNew_header">
            <div className="auctionNew_headerTitle">{t("New auction")}</div>
            <div className="close-button" onClick={onClose}>
              <i className="fas fa-times" />
            </div>
          </div>
          <div className="auctionNew_body">
            <div>
              <span className="auctionNew_endDateTitle">
                {t("End date auction")}
              </span>
              <DatePicker
                showTimeSelect
                minDate={this.initDate()}
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                selected={this.state.endDate}
                onChange={this.handleChangeData}
              />
            </div>
          </div>
          <div className="buttons-section">
            <Button className="button" appStyle={true} onClick={this.onOk}>
              {t("Ok")}
            </Button>
            <Button className="button" appStyle={true} onClick={onClose}>
              {t("Cancel")}
            </Button>
          </div>
        </div>
      </ReactModal>
    )
  }
}

export default AuctionNew
