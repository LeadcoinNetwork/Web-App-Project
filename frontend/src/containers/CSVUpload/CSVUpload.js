import React from "react"
import Button from "Components/Button"
import { connect } from "react-redux"
import { csvUpload } from "Actions"

class CSVUpload extends React.Component {

  generalError() {
    const { errors } = this.props
    if (errors && errors.length > 0) {
      const errorMsgs = errors.map((e, i) => {
        return <div key={i}>{e}</div>
      })
      return <div className="error">{errorMsgs}</div>
    }
    return
  }

  render() {
    let fileLabel = "Choose File"
    const {loading, file} = this.props
    if (file) fileLabel = file.name
    return (
      <div className="csvUpload">
        <div className="file_pick">
          <div>
            <Button 
              className="container_button"
              loading={loading}
              label={fileLabel} >
              <input
                className="displaynone"
                type="file"
                onChange= {(e) => {
                  if (loading) return false
                  this.props.pickFile(e.target.files[0])
                }}
              />
            </Button>
          </div>
        </div>
        <div className="submit">
          <Button
            loading={loading}
            onClick={() => {
              if (loading) return false
              this.props.submit()
            }}
            containerElement="label"
            label="Submit"
          />
        </div>
        {this.generalError()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.csvUpload
})

export default connect(mapStateToProps, {
  pickFile: csvUpload.csvUploadPickFile,
  submit: csvUpload.csvUploadSubmit,
})(CSVUpload)
