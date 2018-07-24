import React from "react"
import Button from "Components/Button"
import { connect } from "react-redux"
import { csvUpload, csvMapping } from "Actions"
import t from "../../utils/translate/translate"
import CSVMapper from "../CSVMapping"

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
    this.setState({ fields })
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
    if (this.state) {
      const { fields } = this.state
      if (fields) {
        this.props.handleChange("batch_id", "00")
        setImmediate(() => {
          this.props.setFileFields(fields)
          // TODO: replace this mock with field list from /leads/getLeadType
          let mock_fields = {
            private: ["name", "phone"],
            public: ["floor", "size"],
          }
          this.props.setDbFields(mock_fields)
        })
        return <CSVMapper />
        return
      }
    }
    return null
  }

  render() {
    let fileLabel = t("Choose File")
    const { loading, file } = this.props
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
                  console.log("defering to file reader")
                  return this.tryReadingCsv(e.target.files[0])
                }
                this.props.pickFile(e.target.files[0])
              }}
            />
          </Button>
        </div>
        <div className="csvMapper">{this.maybeCsvMapper()}</div>
        <div className="submit">
          <Button
            appStyle
            loading={loading}
            onClick={() => {
              if (loading) return false
              this.props.submit()
            }}
            containerElement="label"
            label={t("Submit")}
          />
        </div>
        {this.generalError()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.csvUpload,
})
// actions.csvMapping.csvMappingGetFileFields([
export default connect(
  mapStateToProps,
  {
    pickFile: csvUpload.csvUploadPickFile,
    submit: csvUpload.csvUploadSubmit,
    handleChange: csvMapping.csvMappingFormChange,
    setFileFields: csvMapping.csvMappingGetFileFields,
    setDbFields: csvMapping.csvMappingGetDbFields,
  },
)(CSVUpload)
