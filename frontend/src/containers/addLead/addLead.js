import React from "react"
import Select from "../../components/select"
import Button from "../../components/button"
import TextField from "../../components/textField"
import { connect } from "react-redux"
import { addLead } from "../../actions"
import t from "../../utils/translate/translate"

class AddLead extends React.Component {
  renderTerms() {
    const { errors } = this.props
    const error = errors["agree_to_terms"] ? "error" : ""
    return (
      <div className={error + " twothirds"}>
        <input
          type="checkbox"
          name="agree_to_terms"
          id="terms_checkbox"
          value={this.props.agree_to_terms}
          onChange={e => {
            this.props.agreeToTerms(e.target.checked)
          }}
        />
        <label htmlFor="terms_checkbox">{t("I AGREE TO THE TERMS")}</label>
      </div>
    )
  }

  renderFields(fields) {
    const { errors, values, loading } = this.props
    return fields.map(f => {
      const isError = errors[f.key] ? "error" : ""
      return (
        <div key={f.key} className={isError + " line flexed"}>
          <div className="fieldLabel">{t(f.name)}</div>
          <div className="fieldValue">
            <TextField
              disabled={loading}
              appStyle={true}
              placeholder=" "
              value={values[f.key]}
              onChange={e => {
                this.props.handleChange(f.key, e.target.value)
              }}
            />
          </div>
        </div>
      )
    })
  }

  render() {
    const { db_fields, loading } = this.props
    if (!db_fields.private.length) {
      return <div>{t("Loading...")}</div>
    }
    const terms = this.renderTerms()
    return (
      <div className="add_lead">
        <h1>{t("add lead")}</h1>
        <div className="main_container">
          <div className="personal flexed">
            <div className="help_text">
              <div className="header">
                {t("Personal Identification Information")}
              </div>
              <div className="header">
                {t("These fields will only be visible to the lead owner")}
              </div>
            </div>
            <div className="fields">{this.renderFields(db_fields.private)}</div>
          </div>
          <div className="public flexed">
            <div className="help_text">
              <div className="header">{t("Public Fields")}</div>
            </div>
            <div className="fields">{this.renderFields(db_fields.public)}</div>
          </div>
          <div className="controls field_submit flexed">
            {terms}
            <div>
              <Button
                loading={loading}
                appStyle={true}
                onClick={() => {
                  this.props.submit(this.props.fields_map)
                }}
                label={t("Submit")}
              />
            </div>
            <div>
              <Button
                appStyle={true}
                secondary
                onClick={() => {
                  this.props.clear()
                }}
                label={t("Clear")}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.addLead

export default connect(mapStateToProps, {
  agreeToTerms: addLead.addLeadAgreeToTerms,
  handleChange: addLead.addLeadHandleFormChange,
  submit: addLead.addLeadSubmitForm,
  clear: addLead.addLeadClearForm,
})(AddLead)
