import React from "react"
import Button from "Components/Button"
import Select from "Components/Select"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"
import papaparse from "papaparse"
import { push } from "react-router-redux"
import ConfirmationDialog from "../../components/ConfirmationDialog"
import Modal from "../../components/Modal"
import { csvUpload, csvMapping } from "../../actions"
import t from "../../utils/translate/translate"

class CSVUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showConfirmation: false,
      modalStepOne: false,
      modalStepTwo: false,
      modalStepThree: false,
    }
  }

  handleModal(state) {
    this.setState(state)
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

  process(fields) {
    this.props.setFileFields(Object.keys(fields))
    // TODO: replace mock_fields with field list from /leads/getLeadType
    let mock_fields = {
      private: ["Contact Person", "Telephone", "Email"],
      public: [
        "Industry",
        "Number of pages",
        "Content updates",
        "Functionality",
        "Mobile design",
        "SEO",
        "CMS",
        "E-commerce",
        "Blog",
        "Budget",
        "Languages",
        "Hosting",
        "Comments",
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

  listItems(fieldName) {
    const { fields_map, file_fields } = this.props.csvMapping
    if (file_fields) {
      let value = ""
      if (fields_map && fields_map[fieldName]) value = fields_map[fieldName]
      const items = file_fields.map((field, i) => {
        fields_map[fieldName] = value =
          value === "" && fieldName === field ? field : value
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

  componentWillMount() {
    this.state.modalStepOne = this.props.location.isSalesforce
  }

  componentWillUnmount() {
    this.props.clear()
    this.props.reset()
  }

  renderList(step) {
    let stepContent
    switch (step) {
      case "stepOne":
        stepContent = (
          <ol>
            <li>
              Open the{" "}
              <a
                href="https://help.salesforce.com/articleView?id=installing_the_data_loader.htm&type=5"
                target="_blank"
              >
                Data Loader
              </a>
              .
            </li>
            <li>
              Click Export. If you want to also export archived activity records
              and soft-deleted records, click Export All instead.
            </li>
            <li>
              Enter your Salesforce username and password, and click Log in.
            </li>
          </ol>
        )
        break
      case "stepTwo":
        stepContent = (
          <ol start="4">
            <li>
              When you’re logged in, click Next. (You are not asked to log in
              again until you log out or close the program.) If your
              organization restricts IP addresses, logins from untrusted IPs are
              blocked until they’re activated. Salesforce automatically sends
              you an activation email that you can use to log in. The email
              contains a security token that you must add to the end of your
              password. For example, if your password is mypassword, and your
              security token is XXXXXXXXXX, you must enter mypasswordXXXXXXXXXX
              to log in.
            </li>
            <li>
              Choose an object. For example, select the Account object. If your
              object name isn’t listed, select Show all objects to see all the
              objects that you can access. The objects are listed by localized
              label name, with the developer name in parentheses. For object
              descriptions, see the{" "}
              <a
                href="https://developer.salesforce.com/docs/atlas.en-us.218.0.api.meta/api/sforce_api_quickstart_intro.htm"
                target="_blank"
              >
                SOAP API Developer Guide
              </a>
              .
            </li>
            <li>
              Select the CSV file to export the data to. You can choose an
              existing file or create a file. If you select an existing file,
              the export replaces its contents. To confirm the action, click
              Yes, or choose another file by clicking No.
            </li>
            <li>Click Next.</li>
          </ol>
        )
        break
      case "stepThree":
        stepContent = (
          <ol start="8">
            <li>
              Create a SOQL query for the data export. For example, select Id
              and Name in the query fields, and click Finish. As you follow the
              next steps, the CSV viewer displays all the Account names and
              their IDs. SOQL is the Salesforce Object Query Language. Similar
              to the SELECT command in SQL, with SOQL, you can specify the
              source object, a list of fields to retrieve, and conditions for
              selecting rows in the source object. Choose the fields you want to
              export. Optionally, select conditions to filter your dataset. If
              you do not select any conditions, all the data to which you have
              read access is returned. Review the generated query and edit if
              necessary.For more information on SOQL, see the{" "}
              <a
                href="https://developer.salesforce.com/docs/atlas.en-us.218.0.soql_sosl.meta/soql_sosl/"
                target="_blank"
              >
                SOQL and SOSL Reference
              </a>
              .
            </li>
            <li>
              Click Finish, then click Yes to confirm. A progress information
              window reports the status of the operation. After the operation
              completes, a confirmation window summarizes your results.
            </li>
            <li>
              To view the CSV file. click View Extraction, or to close, click
              OK. For more details, see{" "}
              <a
                href="https://help.salesforce.com/articleView?id=reviewing_output_files.htm&type=5"
                target="_blank"
              >
                Review Data Loader Output Files
              </a>
              .
            </li>
          </ol>
        )
    }
    return stepContent
  }

  handleStepChangeContent(step) {
    let stepContent = this.renderList(step)

    return (
      <>
        <h3>
          {t(
            "This is step by step guide how to export your leads from salesforce in to CSV file.",
          )}
        </h3>
        <p>
          Original docs you can find{" "}
          <a
            href="https://help.salesforce.com/articleView?id=exporting_data.htm&type=5"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <div className="manual-container">
          <h2>Export Data</h2>
          <h4>
            You can use the Data Loader export wizard to extract data from a
            Salesforce object.
          </h4>
          <div>{stepContent}</div>
        </div>
      </>
    )
  }

  dropzoneWrapp() {
    const checkMobile = navigator.userAgent.match(/Android/i)

    let refDropzone

    return (
      <div className="file-pick">
        <Dropzone
          accept={checkMobile ? "image/*" : ".csv"}
          ref={node => {
            refDropzone = node
          }}
          disableClick={true}
          onDrop={acceptedFiles => {
            this.props.pickFile(acceptedFiles[0])
            this.tryReadingCsv(acceptedFiles[0])
          }}
        >
          <div className="upload-container" onClick={() => refDropzone.open()}>
            <h3>
              <br />
              {t("Drop a CSV file into this box")}
            </h3>
          </div>
        </Dropzone>
      </div>
    )
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
        <Modal
          isOpen={this.state.modalStepOne}
          modalContent={this.handleStepChangeContent("stepOne")}
          shouldCloseOnOverlayClick={true}
          isNext={true}
          onNext={async () => {
            await this.handleModal({ modalStepOne: false })
            await this.handleModal({ modalStepTwo: true })
          }}
          onRequestClose={() => this.handleModal({ modalStepOne: false })}
          onClose={() => this.handleModal({ modalStepOne: false })}
        />
        <Modal
          isOpen={this.state.modalStepTwo}
          modalContent={this.handleStepChangeContent("stepTwo")}
          shouldCloseOnOverlayClick={true}
          isPrev={true}
          onPrev={() => {
            this.handleModal({ modalStepTwo: false })
            this.handleModal({ modalStepOne: true })
          }}
          isNext={true}
          onNext={async () => {
            await this.handleModal({ modalStepTwo: false })
            await this.handleModal({ modalStepThree: true })
          }}
          onRequestClose={() => this.handleModal({ modalStepTwo: false })}
          onClose={() => this.handleModal({ modalStepTwo: false })}
        />
        <Modal
          isOpen={this.state.modalStepThree}
          modalContent={this.handleStepChangeContent("stepThree")}
          shouldCloseOnOverlayClick={true}
          isEnd={true}
          onEnd={() => this.handleModal({ modalStepThree: false })}
          isPrev={true}
          onPrev={() => {
            this.handleModal({ modalStepThree: false })
            this.handleModal({ modalStepTwo: true })
          }}
          onRequestClose={() => this.handleModal({ modalStepThree: false })}
          onClose={() => this.handleModal({ modalStepThree: false })}
        />
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
              {this.dropzoneWrapp()}
              <p className="template">
                {t("Click")}{" "}
                <a href="assets/website-building-csv-template.csv">
                  {t("here")}
                </a>
                {t(
                  " to download a template csv file for website building leads.",
                )}
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
    reset: csvUpload.csvUploadReset,
    submit: csvUpload.csvUploadSubmit,
    push,
  },
)(CSVUpload)
