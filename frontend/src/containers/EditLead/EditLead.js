import React from "react"
import Select from "react-select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import Checkbox from "Components/Checkbox"
import { connect } from "react-redux"
import { editLead } from "Actions"
import ReactTooltip from "react-tooltip"
import { push } from "react-router-redux"
import t from "../../utils/translate/translate"
import ConfirmationDialog from "../../components/ConfirmationDialog"

const customStyles = {
  option: (styles, state) => {
    return {
      ...styles,
      color: "#000",
      "font-weight": "300",
    }
  },
  container: styles => {
    return {
      ...styles,
      color: "white",
      "font-weight": "300",
    }
  },
  multiValueRemove: styles => ({
    ...styles,
    width: "27px",
    height: "27px",
    color: "#000",
  }),
  multiValue: styles => ({
    ...styles,
    margin: "3px",
    "font-size": "20px",
  }),
  dropdownIndicator: styles => ({
    ...styles,
    color: "#000",
  }),
}

class EditLead extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showConfirmation: false }
  }

  handleSelectChange = (selected, payload) => {
    this.props.handleSelectChange(payload.name, selected)
  }

  handleMultiSelectChange = (selected, payload) => {
    payload.action === "select-option"
      ? this.props.handleMultiSelectChange(payload.option)
      : this.props.removeMultiSelectValue(payload.removedValue)
  }

  renderTerms() {
    const { errors, agree_to_terms } = this.props.editLead
    const error = errors["agree_to_terms"] ? "error" : ""
    return (
      <div className={error + " agree_to_terms twothirds"}>
        <Checkbox
          label={t("I AGREE TO THE TERMS")}
          name="agree_to_terms"
          id="terms_checkbox"
          checked={agree_to_terms}
          onClick={e => {
            this.props.agreeToTerms(e.target.checked)
          }}
        />
        <span className="asterisk-required">*</span>
      </div>
    )
  }

  renderFields(fields) {
    const { errors, values, loading } = this.props.editLead
    return fields.map(f => {
      const isError = errors[f] ? "error" : ""
      return (
        <div key={f.name} className={isError + " flexed line"}>
          <div className="fieldLabel">
            <span
              className="field-tooltip-web"
              data-for="field-tooltip"
              data-tip={f.tooltip}
            >
              {t(f.name)}
            </span>
            <span className="field-tooltip-mobile">
              {t(f.name)}{" "}
              {f.tooltip && (
                <i
                  data-for="field-tooltip-mob"
                  data-tip={f.tooltip}
                  className="fas fa-question-circle"
                />
              )}
            </span>
            {f.key === "lead_price" && (
              <span className="asterisk-required">*</span>
            )}
          </div>
          <div className="fieldValue">
            {f.type === "input" ? (
              <TextField
                disabled={loading}
                appStyle={true}
                placeholder={t(f.name)}
                value={values[f.key]}
                onChange={e => {
                  this.props.handleChange(f.key, e.target.value)
                }}
              />
            ) : f.type === "select" ? (
              <Select
                className="multiselect"
                value={values[f.key]}
                options={f.options}
                name={f.key}
                styles={customStyles}
                onChange={this.handleSelectChange}
              />
            ) : (
              <Select
                value={values[f.key]}
                isMulti
                options={f.options}
                className={"multiselect"}
                styles={customStyles}
                isClearable={false}
                onChange={this.handleMultiSelectChange}
              />
            )}
          </div>
        </div>
      )
    })
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      this.props.getLead(id)
    }
  }

  render() {
    const { fields, loading, errors } = this.props.editLead

    return (
      <div className="edit_lead">
        <div className="back-wrapper">
          <div
            className="back"
            onClick={() => {
              this.props.clear()
              this.props.push("/my-leads")
            }}
          >
            <div className="back-arrow" />
            <div className="back-text">Back</div>
          </div>
        </div>
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
            <div className="fields">{this.renderFields(fields.private)}</div>
          </div>
          <div className="public">
            <div className="help_text">
              <div className="header bigger">{t("Public Fields")}</div>
            </div>
            <div className="fields">{this.renderFields(fields.public)}</div>
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
                    this.props.submit()
                  }}
                  onDismiss={() => this.setState({ showConfirmation: false })}
                />
              )}
            </div>
          </div>
        </div>
        <ReactTooltip id="field-tooltip" getContent={dataTip => dataTip} />
        <ReactTooltip
          id="field-tooltip-mob"
          className="tooltip-mobile"
          getContent={dataTip => dataTip}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  editLead: state.editLead,
})

export default connect(
  mapStateToProps,
  {
    getLead: editLead.editLeadLoadLeadForEdit,
    loadLead: editLead.editLead,
    agreeToTerms: editLead.editLeadAgreeToTerms,
    handleChange: editLead.editLeadHandleFormChange,
    handleSelectChange: editLead.editLeadHandleSelectChange,
    handleMultiSelectChange: editLead.editLeadHandleMultiSelectChange,
    removeMultiSelectValue: editLead.editLeadHandleMultiSelectDeleteValue,
    submit: editLead.editLeadSubmitForm,
    clear: editLead.editLeadClearForm,
    push,
  },
)(EditLead)
