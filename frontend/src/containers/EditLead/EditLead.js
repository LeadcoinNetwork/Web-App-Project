import React from "react"
import Select from "Components/Select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import Checkbox from "Components/Checkbox"
import { connect } from "react-redux"
import { editLead } from "Actions"
import t from "../../utils/translate/translate"
import ConfirmationDialog from "../../components/ConfirmationDialog"

class EditLead extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showConfirmation: false }
  }
  renderTerms() {
    const { errors } = this.props
    const error = errors["agree_to_terms"] ? "error" : ""
    return (
      <div className={error + " agree_to_terms twothirds"}>
        <Checkbox
          label={t("I AGREE TO THE TERMS")}
          name="agree_to_terms"
          id="terms_checkbox"
          checked={this.props.agree_to_terms}
          onClick={e => {
            this.props.agreeToTerms(e.target.checked)
          }}
        />
        <span className="asterisk-required">*</span>
      </div>
    )
  }

  renderFields(fields) {
    const { errors, values, loading } = this.props
    return Object.keys(fields).map(f => {
      const isError = errors[f] ? "error" : ""
      return (
        <div key={f} className={isError + " flexed line"}>
          <div className="fieldLabel">
            {t(f)}
            {f === "lead_price" && <span className="asterisk-required">*</span>}
          </div>
          <div className="fieldValue">
            <TextField
              disabled={loading}
              appStyle={true}
              placeholder={t(f)}
              value={fields[f]}
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
    const { private_fields, public_fields, loading, errors } = this.props
    console.log({ private_fields, public_fields })
    if (Object.keys(private_fields) === 0) {
      return <div>{t("Loading...")}</div>
    }
    return (
      <div className="edit_lead">
        <h1>{t("edit lead")}</h1>
        <h3>
          {t("Add a new lead for sale by filling out a simple web form.")}
        </h3>
        <div className="main_container">
          <div className="personal">
            <div className="help_text">
              <div className="header bigger">
                {t("Personal Identification Information")}
              </div>
              <div className="header smaller">
                {t(
                  "This information will remain hidden until a buyer purchases the lead.",
                )}
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
                loading={loading}
                appStyle={true}
                onClick={() => {
                  this.setState({ showConfirmation: true })
                }}
                label={t("Submit")}
              />
              {this.state.showConfirmation && (
                <ConfirmationDialog
                  description="Are you sure you want to proceed?"
                  onConfirm={() => {
                    this.setState({ showConfirmation: false })
                    this.props.submit(this.props.fields_map)
                  }}
                  onDismiss={() => this.setState({ showConfirmation: false })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.editLead

export default connect(
  mapStateToProps,
  {
    agreeToTerms: editLead.editLeadgreeToTerms,
    handleChange: editLead.editLeadHandleFormChange,
    submit: editLead.editLeadSubmitForm,
    clear: editLead.editLeadClearForm,
  },
)(EditLead)
