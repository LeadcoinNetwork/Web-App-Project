import React from "react"
import Select from "Components/Select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { addLead } from "Actions"
import t from "../../utils/translate/translate"

class AddLead extends React.Component {
  renderTerms() {
    const { errors } = this.props
    const error = errors["agree_to_terms"] ? "error" : ""
    return (
      <div className={error + " agree_to_terms twothirds"}>
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
        <div key={f.key} className={isError + " line"}>
          <div className="fieldValue">
            <TextField
              disabled={loading}
              appStyle={true}
              placeholder={t(f.name)}
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
    const { db_fields, loading, errors } = this.props
    if (!db_fields.private.length) {
      return <div>{t("Loading...")}</div>
    }
    return (
      <div className="add_lead">
        <h1>{t("add lead")}</h1>
        <h3>
          {t("Add a new lead for sale by filling out a simple web form.")}
        </h3>
        <div className="main_container">
          <div className="personal">
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
          <div className="public">
            <div className="help_text">
              <div className="header">{t("Public Fields")}</div>
            </div>
            <div className="fields">{this.renderFields(db_fields.public)}</div>
          </div>
          {this.renderTerms()}
          {errors && (
            <div className="errors">
              {Object.keys(errors).map((error, index) => (
                <div key={index}>{errors[error]}</div>
              ))}
            </div>
          )}
          <div className="controls field_submit flexed">
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.addLead

export default connect(
  mapStateToProps,
  {
    agreeToTerms: addLead.addLeadAgreeToTerms,
    handleChange: addLead.addLeadHandleFormChange,
    submit: addLead.addLeadSubmitForm,
    clear: addLead.addLeadClearForm,
  },
)(AddLead)
