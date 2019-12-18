import React from "react"
import { connect } from "react-redux"
import t from "../../utils/translate/translate"
import { historyLead } from "Actions"
import { localeString } from "Utils/time"
import HistoryLeadStyle from "./HistoryLead.scss"

class HistoryLead extends React.Component {
  componentDidMount() {
    this.props.historyLeadStart()
  }

  renderValue(value) {
    if (typeof value === "number" || typeof value === "string") {
      return value
    }
    console.log(value)
    if (Array.isArray(value)) {
      return value.reduce((accumulator, current, index) => {
        return accumulator + (accumulator.length ? ", " : "") + current
      }, "")
    }
  }

  renderDescription(description) {
    if (description && description.changed) {
      return description.changed.map((v, index) => {
        return (
          <div key={index} className="history-lead-details">
            <div className="history-lead-detail-key">{v.key}</div>
            <div>
              <div>{t("old ")}:</div>
              <div className="history-lead-detail-values">
                {this.renderValue(v.oldValue)}
              </div>
            </div>
            <div>
              <div>{t("new ")}:</div>
              <div className="history-lead-detail-values">
                {this.renderValue(v.newValue)}
              </div>
            </div>
          </div>
        )
      })
    }
  }

  renderFields(fieldsObj) {
    const data = fieldsObj
    return data.map((v, index) => {
      return (
        <div key={index} className="history-lead-item">
          <div className="history-lead-label"> {v.event} </div>
          <div className="history-lead-value">
            <div className="history-lead-date">{localeString(v.date)} </div>
            {v.description &&
              v.description.changed &&
              this.renderDescription(v.description)}
          </div>
        </div>
      )
    })
  }

  render() {
    const { history, loading } = this.props
    if (!history || loading) {
      return <div>{t("Loading...")}</div>
    }
    if (history.length === 0) return <div> {t("This lead has no history")}</div>
    return (
      <div className="history-lead">
        <div className="history-lead-title">{t("Lead history")}</div>
        <div className="history-lead-fields">{this.renderFields(history)}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  history: state.historyLead.history,
})

export default connect(
  mapStateToProps,
  {
    historyLeadStart: historyLead.historyLeadStart,
  },
)(HistoryLead)
