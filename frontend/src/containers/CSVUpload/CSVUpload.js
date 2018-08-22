import React from "react"
import Button from "Components/Button"
import Select from "Components/Select"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { csvUpload, csvMapping } from "Actions"
import t from "../../utils/translate/translate"
import Dropzone from "react-dropzone"
import papaparse from "papaparse"
class CSVUpload extends React.Component {
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

  process(fields) {
    this.props.setFileFields(Object.keys(fields))
    // TODO: replace mock_fields with field list from /leads/getLeadType
    let mock_fields = {
      private: ["Contact Person", "Telephone", "Email"],
      public: [
        "Description",
        "Bedrooms/Baths",
        "Type",
        "Price",
        "Size",
        "State",
        "Location",
        "Housing Type",
      ],
    }
    this.props.setDbFields(mock_fields)
  }

  tryReadingCsv(file) {
    papaparse.parse(file, {
      dynamicTyping: true,
      header: true,
      preview: 1,
      complete: rows => {
        this.process(rows.data[0])
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
                  this.props.submit()
                }}
                label={t("Submit")}
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
        fields_map[fieldName] = value =
          value === "" && fieldName == field ? field : value
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
    const errors = this.props.csvUpload.errors
    if (!errors) return
    const error = Object.keys(errors).includes("price") ? "form_error" : ""
    return (
      <div className={"price " + error}>
        <span>
          {t("Lead price")}
          <span className="astrik-required">*</span>
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
          <span className="astrik-required">*</span>
        </label>
      </div>
    )
  }

  renderFields(fields) {
    const { errors } = this.props.csvUpload
    return fields.map((f, i) => {
      let isError = Object.keys(errors).includes(f)
      return (
        <div key={i} className={`${isError ? "form_error" : ""} line flexed`}>
          <div className="fieldLabel">{t(f)} </div>
          {this.listItems(f)}
        </div>
      )
    })
  }

  render() {
    let fileLabel = t("Choose File")
    const { finished, file } = this.props.csvUpload
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
        <h1>{t("Upload CSV File")}</h1>
        <div>
          {/* <Button appStyle secondary label={fileLabel}> */}
          {!this.maybeCsvMapper() && (
            <div>
              <h3>
                {t("Add multiple leads for sale by uploading a CSV file.")}
              </h3>
              <div className="file-pick">
                <Dropzone
                  accept=".csv"
                  onDrop={acceptedFiles => {
                    this.props.pickFile(acceptedFiles[0])
                    this.tryReadingCsv(acceptedFiles[0])
                  }}
                >
                  <center>
                    <h3>
                      <br />Drop a CSV file into this box
                    </h3>
                  </center>
                </Dropzone>
              </div>
              <p className="template">
                Click <a href="assets/real-estate-csv-template.csv">here</a> to
                download a template csv file for real estate leads.
              </p>
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
                this.props.pickFile(e.target.files[0])
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
    submit: csvUpload.csvUploadSubmit,
  },
)(CSVUpload)
