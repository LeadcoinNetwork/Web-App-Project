import React from "react"
import { connect } from "react-redux"
import t from "../../utils/translate/translate"

class HistoryLead extends React.Component {
  renderFields(fieldsObj) {
    const data = fieldsObj
    return Object.keys(data).map(f => {
      return (
        <div key={f} className="line flexed">
          <div className="fieldLabel"> {f} </div>
          <div className="fieldValue"> {fieldsObj[f]} </div>
        </div>
      )
    })
  }

  render() {
    const { ...lead_history_fields } = this.props
    if (!lead_history_fields) {
      return <div>{t("Loading...")}</div>
    }
    return (
      <div className="lead-history_main">
        <div>{t("Lead history")}</div>
        <div className="fields">{this.renderFields(lead_history_fields)}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lead_history: state.displayLeadHistory,
})

export default connect(
  mapStateToProps,
  {},
)(HistoryLead)
