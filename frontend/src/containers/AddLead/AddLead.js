import React from "react"
import Select from "Components/Select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { addLead } from "Actions"
import t from "containers/translate"

class AddLead extends React.Component {
  renderPriceElement() {
    const errors = this.props.errors
    const error = errors["price"] ? "error" : ""
    return (
      <div className={"price " + error}>
        <span>{t("Lead Price")}</span>
        <TextField
          appStyle={true}
          value={this.props.price}
          onChange={e => {
            this.props.handleChange("price", e.target.value)
          }}
        />
      </div>
    )
  }

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
        <label htmlFor="terms_checkbox">{t("I AGREE THE TERMS")}</label>
      </div>
    )
  }

  renderFields(fields) {
    const { errors, values, loading } = this.props
    return fields.map((f, i) => {
      const isError = errors[f] ? "error" : ""
      return (
        <div key={i} className={isError + " line flexed"}>
          <div className="fieldLabel">{f} </div>
          <div className="fieldValue">
            <TextField
              disabled={loading}
              appStyle={true}
              placeholder=" "
              value={values[f]}
              onChange={e => {
                this.props.handleChange(f, e.target.value)
              }}
            />
          </div>
        </div>
      )
    })
  }

  render() {
    const { db_fields, loading } = this.props
    if (!db_fields.private) return <div> LOADING </div>
    const terms = this.renderTerms()
    return (
      <div className="add_lead">
        <div className="main_container">
          <div className="personal flexed">
            <div className="help_text">
              <div className="header">
                {t("Personal Identification Information")}
              </div>
              <div className="header">
                These fields will only be visible to who bought the lead{" "}
              </div>
            </div>
            <div className="fields">{this.renderFields(db_fields.private)}</div>
          </div>
          <div className="public flexed">
            <div className="help_text">
              <div className="header">Public Fields </div>
            </div>
            <div className="fields">{this.renderFields(db_fields.public)}</div>
          </div>
          {this.renderPriceElement()}
          <div className="controls field_submit flexed">
            {terms}
            <div>
              <Button
                loading={loading}
                appStyle={true}
                onClick={() => {
                  this.props.submit(this.props.fields_map)
                }}
                label="Submit"
              />
            </div>
            <div>
              <Button
                loading={loading}
                appStyle={true}
                secondary
                onClick={() => {
                  this.props.clear()
                }}
                label="Clear"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const fields_not_for_display = ["active"]

const mapStateToProps = state => ({
  ...state.addLead,
  db_fields: {
    private: state.fields
      .filter(field => field.private)
      .map(field => field.key)
      .filter(f => fields_not_for_display.indexOf(f) < 0),
    public: state.fields
      .filter(field => !field.private)
      .map(field => field.key)
      .filter(f => fields_not_for_display.indexOf(f) < 0),
  },
})

export default connect(
  mapStateToProps,
  {
    agreeToTerms: addLead.addLeadAgreeToTerms,
    handleChange: addLead.addLeadHandleFormChange,
    submit: addLead.addLeadSubmitForm,
    clear: addLead.addLeadClearForm,
  },
)(AddLead)
