import React from "react"
import { connect } from "react-redux"
import { displayLead } from "Actions"
import t from "../../utils/translate/translate"

class DisplayLead extends React.Component {
  renderFields(fieldsObj) {
    return Object.keys(fieldsObj).map(f => {
      return (
        <div key={f} className="line">
          <div className="fieldLabel"> {f} </div>
          <div className="fieldValue"> {fieldsObj[f]} </div>
        </div>
      )
    })
  }

  render() {
    const { private_fields, public_fields } = this.props
    if (!private_fields) {
      return <div>{t("Loading...")}</div>
    }
    return (
      <div className="display_lead">
        <h1>{t("Lead Details")}</h1>
        <div className="main_container">
          <div className="personal">
            <div className="help_text">
              <div className="header bigger">
                {t("Personal Identification Information")}
              </div>
              <div className="header smaller">
                {t("This information will remain hidden from other users.")}
              </div>
            </div>
            <div className="fields">{this.renderFields(private_fields)}</div>
          </div>
          <div className="public">
            <div className="help_text">
              <div className="header bigger">{t("Public Fields")}</div>
            </div>
            <div className="fields">{this.renderFields(public_fields)}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.displayLead

export default connect(
  mapStateToProps,
  {},
)(DisplayLead)
