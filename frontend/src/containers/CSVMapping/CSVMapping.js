import React from "react"
import Select from "Components/Select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { csvMapping } from "Actions"
import t from "../../utils/translate/translate"

class CSVMapping extends React.Component {
  listItems(fieldName) {
    const { fields_map, file_fields } = this.props
    if (file_fields) {
      let value = ""
      if (fields_map && fields_map[fieldName]) value = fields_map[fieldName]
      const items = file_fields.map((field, i) => {
        return t(field)
      })
      items.unshift(["0", t("I Don't have this field")])
      return (
        <Select
          options={items}
          value={value}
          onChange={e => {
            this.props.handleMapChange(fieldName, e.target.value)
          }}
        />
      )
    }
    return
  }

  renderPriceElement() {
    const errors = this.props.errors
    const error = errors.indexOf("price") > -1 ? "error" : ""
    return (
      <div className={"price " + error}>
        <span>{t("Lead price")}</span>
        <TextField
          appStyle={true}
          value={this.props.lead_price}
          onChange={e => {
            this.props.handleChange("price", e.target.value)
          }}
        />
      </div>
    )
  }

  renderTerms() {
    const errors = this.props.errors
    const error = errors.indexOf("agree_to_terms") > -1 ? "error" : ""
    return (
      <div className={error}>
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
    return fields.map((f, i) => {
      return (
        <div key={i} className="line flexed">
          <div className="fieldLabel">{t(f)} </div>
          {this.listItems(f)}
        </div>
      )
    })
  }

  render() {
    const { db_fields, batch_id } = this.props
    if (!batch_id)
      return (
        <div className="fields_mapper">
          <div>{t("LOADING")}</div>
        </div>
      )
    const price_element = this.renderPriceElement()
    const terms = this.renderTerms()
    return (
      <div className="fields_mapper">
        <h1>{t("CSV File Mapping")}</h1>
        <h3>
          {t(
            "Match the fields in your CSV with ours by utilizing our CSV mapping feature.",
          )}
        </h3>
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
          {price_element}
          <div className="controls field_submit flexed">
            {terms}
            <div>
              <Button
                appStyle
                onClick={() => {
                  this.props.submit(this.props.fields_map)
                }}
                label={t("Submit")}
              />
            </div>
            <div>
              <Button
                appStyle
                secondary
                onClick={() => {
                  this.props.clear()
                }}
                label={t("Clear")}
              />
            </div>
          </div>
        </div>
        <div className="field_submit flexed" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.csvMapping,
})

export default connect(
  mapStateToProps,
  {
    agreeToTerms: csvMapping.csvMappingAgreeToTerms,
    handleMapChange: csvMapping.csvMappingMapChange,
    handleChange: csvMapping.csvMappingFormChange,
    handleErrors: csvMapping.csvMappingError,
    clear: csvMapping.csvMappingClearForm,
    submit: csvMapping.csvMappingSubmit,
  },
)(CSVMapping)
