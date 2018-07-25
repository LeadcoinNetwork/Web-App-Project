import React from "react"
import Button from "Components/Button"
import Select from "Components/Select"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { csvUpload, csvMapping } from "Actions"
import t from "../../utils/translate/translate"

class CSVUpload extends React.Component {
  generalError() {
    const { errors } = this.props
    if (errors && errors.length > 0) {
      const errorMsgs = errors.map((e, i) => {
        return <div key={i}>{t(e)}</div>
      })
      return <div className="error">{errorMsgs}</div>
    }
    return
  }

  process(csv) {
    let txtLines = csv.split(/\r\n|\n/)
    let fields = txtLines[0].split(",")
    this.props.setFileFields(fields)
    // TODO: replace mock_fields with field list from /leads/getLeadType
    let mock_fields = {
      private: ["name", "phone"],
      public: ["floor", "size"],
    }
    this.props.setDbFields(mock_fields)
  }

  tryReadingCsv(file) {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = e => {
      this.process(e.target.result)
    }
    reader.onerror = e => {
      console.error("DANGER WILL ROBINSON!")
    }
  }

  maybeCsvMapper() {
    const { file_fields } = this.props.csvMapping
    if (!!file_fields.length) {
      return this.csvMapper()
    }
    return null
  }

  csvMapper() {
    const { db_fields } = this.props.csvMapping
    const price_element = this.renderPriceElement()
    const terms = this.renderTerms()
    return (
      <div className="fields_mapper">
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
                  this.props.submit({
                    map: this.props.fields_map,
                    file: this.props.file,
                  })
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
      </div>
    )
  }

  listItems(fieldName) {
    const { fields_map, file_fields } = this.props.csvMapping
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
    const errors = this.props.csvMapping.errors
    const error = errors.indexOf("price") > -1 ? "error" : ""
    return (
      <div className={"price " + error}>
        <span>{t("Lead price")}</span>
        <TextField
          appStyle={true}
          value={this.props.csvMapping.price}
          onChange={e => {
            this.props.handleChange("price", e.target.value)
          }}
        />
      </div>
    )
  }

  renderTerms() {
    const errors = this.props.csvMapping.errors
    const error = errors.indexOf("agree_to_terms") > -1 ? "error" : ""
    const cls = "terms " + error
    return (
      <div className={cls}>
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
    let fileLabel = t("Choose File")
    const { loading, file } = this.props.csvUpload
    if (file) fileLabel = file.name
    return (
      <div className="csvUpload">
        <div className="file-pick">
          <Button appStyle secondary label={fileLabel}>
            <input
              className="displaynone"
              type="file"
              accept=".csv"
              onChange={e => {
                if (loading) return false
                if (window.FileReader) {
                  this.tryReadingCsv(e.target.files[0])
                }
                this.props.pickFile(e.target.files[0])
              }}
            />
          </Button>
        </div>
        {this.maybeCsvMapper()}
        {this.generalError()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  csvUpload: state.csvUpload,
  csvMapping: state.csvMapping,
})
export default connect(
  mapStateToProps,
  {
    pickFile: csvUpload.csvUploadPickFile,
    handleChange: csvMapping.csvMappingFormChange,
    setFileFields: csvMapping.csvMappingGetFileFields,
    setDbFields: csvMapping.csvMappingGetDbFields,
    agreeToTerms: csvMapping.csvMappingAgreeToTerms,
    handleMapChange: csvMapping.csvMappingMapChange,
    handleErrors: csvMapping.csvMappingError,
    clear: csvMapping.csvMappingClearForm,
    submit: csvMapping.csvMappingSubmit,
  },
)(CSVUpload)
