import React from "react"
import Button from "../../components/Button"
import Select from "../../components/Select"
import TextField from "../../components/TextField"
import { connect } from "react-redux"
import { csvUpload, csvMapping, industry } from "../../actions"
import t from "../../utils/translate/translate"
import Dropzone from "react-dropzone"
import papaparse from "papaparse"
import ConfirmationDialog from "../../components/ConfirmationDialog"
import IndustrySelector from "../../components/IndustrySelector"
import { push } from "react-router-redux"
class CSVUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showConfirmation: false }
  }
  generalError() {
    const { errors } = this.props.csvUpload
    if (!errors) return
    if (Object.keys(errors).length > 0) {
      const msgs = Object.keys(errors).filter(e => {
        return errors[e] != ""
      })
      const errorMsgs = msgs.map((e, i) => {
        return <div key={i}>{t(errors[e])}</div>
      })
      return <div className="form_error">{errorMsgs}</div>
    }
    return
  }

  tryReadingCsv(file) {
    papaparse.parse(file, {
      dynamicTyping: true,
      header: true,
      preview: 1,
      complete: rows => {
        this.props.setFileFields(Object.keys(rows.data[0]))
      },
    })
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
    const { loading } = this.props.csvUpload

    return (
      <div className="fields_mapper">
        <div>
          {t(
            "Match the fields from your CSV file with the fields that appear in LeadCoin's Network.",
          )}{" "}
          <br />
          {t(
            "Go through and match each one of your fields with the field name that exists for the real estate category.",
          )}
        </div>
        <div className="main_container">
          <div className="titles flexed">
            <div className="help_text" />
            <div className="fieldsTitles flexed">
              <div className="ldcTitle">LeadCoin Field Names</div>
              <div className="csvTitle">Your Field Names</div>
            </div>
          </div>
          <div className="personal flexed">
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
            <div className="fields">{this.renderFields(db_fields.private)}</div>
          </div>
          <div className="public flexed">
            <div className="help_text">
              <div className="header bigger">{t("Public Fields")}</div>
            </div>
            <div className="fields">{this.renderFields(db_fields.public)}</div>
          </div>
          {price_element}
          {this.generalError()}
          <div className="controls field_submit flexed">
            {terms}
            <div className="mapSubmit">
              <Button
                loading={loading}
                appStyle
                onClick={() => {
                  this.setState({ showConfirmation: true })
                }}
                label={t("Submit")}
              />
              {this.state.showConfirmation && (
                <ConfirmationDialog
                  description="You are about to upload new leads to be publicly traded. Are you sure you want to proceed?"
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
      </div>
    )
  }

  renderFields(fields) {
    const { errors } = this.props.csvUpload
    return fields.map((f, i) => {
      let isError = Object.keys(errors).includes(f.key)
      return (
        <div key={i} className={`${isError ? "form_error" : ""} line flexed`}>
          <div className="fieldLabel">{t(f.name)} </div>
          {this.listItems(f)}
        </div>
      )
    })
  }

  listItems(fieldType) {
    const { fields_map, file_fields } = this.props.csvMapping
    if (file_fields) {
      let value = ""
      if (fields_map && fields_map[fieldType.key]) {
        value = fields_map[fieldType.key]
      }
      const items = file_fields.map((field, i) => {
        value =
          value === "" && (fieldType.key === field || fieldType.name === field)
            ? field
            : value
        if (fields_map[fieldType.key] !== value) {
          this.props.handleMapChange(fieldType.key, value)
        }
        return t(field)
      })
      items.unshift(["0", t("I Don't have this field")])
      return (
        <Select
          options={items}
          value={value}
          onChange={e => {
            this.props.handleMapChange(fieldType.key, e.target.value)
          }}
        />
      )
    }
    return
  }

  renderPriceElement() {
    const errors = this.props.csvUpload.errors
    if (!errors) return
    const error = Object.keys(errors).includes("price") ? "form_error" : ""
    return (
      <div className={"price " + error}>
        <span>
          {t("Lead price")}
          <span className="asterisk-required">*</span>
        </span>
        <TextField
          type="number"
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
    const errors = this.props.csvUpload.errors
    if (!errors) return
    const error = Object.keys(errors).includes("agree_to_terms")
      ? "form_error"
      : ""
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
        <label htmlFor="terms_checkbox">
          {t("I AGREE TO THE TERMS")}
          <span className="asterisk-required">*</span>
        </label>
      </div>
    )
  }

  componentWillUnmount() {
    this.props.clear()
    this.props.reset()
  }
  render() {
    let fileLabel = t("Choose File")
    const {
      csvUpload: { finished, file },
      push,
      industry,
      industryUpdate,
      pickFile,
    } = this.props
    if (file) fileLabel = file.name
    if (finished) {
      return (
        <div className="csvUpload">
          <h1>{t("Upload CSV File")}</h1>
          <h3>{t("Add multiple leads for sale by uploading a CSV file.")}</h3>
          <div>
            <div> Your leads are being proccessed. </div>
            <div className="ajax-loader2" />
          </div>
        </div>
      )
    }
    return (
      <div className="csvUpload">
        <div className="back-wrapper">
          <div
            className="back"
            onClick={() => {
              this.props.push("/sell-leads")
            }}
          >
            <div className="back-arrow" />
            <div className="back-text">Back</div>
          </div>
        </div>
        <h1>{t("Upload CSV File")}</h1>
        <div>
          {/* <Button appStyle secondary label={fileLabel}> */}
          {!this.maybeCsvMapper() && (
            <div>
              <h3>
                {t("Add multiple leads for sale by uploading a CSV file.")}
              </h3>
              <IndustrySelector
                className="display-block"
                industry={industry}
                industryUpdate={industryUpdate}
              />
              {industry && (
                <>
                  <div className="file-pick">
                    <Dropzone
                      className="csv-file"
                      accept=".csv"
                      onDrop={acceptedFiles => {
                        pickFile(acceptedFiles[0])
                        this.tryReadingCsv(acceptedFiles[0])
                      }}
                    >
                      <h3>Drop a CSV file into this box</h3>
                    </Dropzone>
                  </div>
                  <p className="template">
                    Click <a href="assets/real-estate-csv-template.csv">here</a>{" "}
                    to download a template csv file for real estate leads.
                  </p>
                </>
              )}
            </div>
          )}
          {/* <input
              className="displaynone"
              type="file"
              accept=".csv"
              onChange={e => {
                if (loading) return false
                if (window.FileReader) {
                  this.tryReadingCsv(e.target.files[0])
                }
                pickFile(e.target.files[0])
              }}
            /> */}
          {/* </Button> */}
        </div>
        {this.maybeCsvMapper()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  csvUpload: state.csvUpload,
  csvMapping: state.csvMapping,
  industry: state.industry,
})
export default connect(
  mapStateToProps,
  {
    industryUpdate: industry.industryUpdate,
    pickFile: csvUpload.csvUploadPickFile,
    handleChange: csvMapping.csvMappingFormChange,
    setFileFields: csvMapping.csvMappingSetFileFields,
    setDbFields: csvMapping.csvMappingSetDbFields,
    agreeToTerms: csvMapping.csvMappingAgreeToTerms,
    handleMapChange: csvMapping.csvMappingMapChange,
    handleErrors: csvMapping.csvMappingError,
    clear: csvMapping.csvMappingClearForm,
    reset: csvUpload.csvUploadReset,
    submit: csvUpload.csvUploadSubmit,
    push,
  },
)(CSVUpload)
