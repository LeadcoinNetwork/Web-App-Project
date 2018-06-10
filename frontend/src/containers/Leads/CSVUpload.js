import React from "react"
import axios from "axios"
import MenuItem from "material-ui/MenuItem"
import SelectField from "material-ui/SelectField"
import Button from "Components/Button"
import TextField from "Components/TextField"

class CSVUpload extends React.Component {
  state = {
    response: null,
    currentStep: "upload",
    field_map: {}
  }

  pickFile = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  submit() {
    axios.defaults.withCredentials = true

    const { file } = this.state
    const formData = new FormData()
    formData.append("file", file)
    axios
      .post(`${process.env.BACKEND}/csv/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data"
        },
        withCredentials: true
      })
      .then(response => {
        const { data, db_field_list } = response.data
        const { x, field_list, batch_id } = data
        this.setState({
          x,
          file_field_list: field_list,
          currentStep: "fieldMap",
          batch_id,
          db_field_list
        })
      })
      .catch(error => {
        if (error.response) {
          // error originated from server
          if (error.response.data.error) {
            const errors = error.response.data.error.split("; ")
            this.setState({ errors: errors })
            setTimeout(() => {
              this.setState({ errors: null })
            }, errors.length * 2250)
          }
        } else if (error.request) {
          // request made, no response though
        } else {
          // error was thrown during request setup
        }
      })
  }

  handleChange(fieldName, value) {
    const { field_map } = this.state
    field_map[fieldName] = value
    this.setState(field_map)
  }

  listItems(fieldName) {
    const { field_map, file_field_list } = this.state
    if (file_field_list) {
      let value = ""
      if (field_map && field_map[fieldName]) value = field_map[fieldName]
      const items = file_field_list.map((field, i) => {
        return <MenuItem value={field} key={i} primaryText={field} />
      })
      return (
        <SelectField
          floatingLabelText="Choose"
          value={value}
          onChange={(e, index, value) => {
            this.handleChange(fieldName, value)
          }}
        >
          <MenuItem
            value={"0"}
            key={-1}
            primaryText={"I Don't have this field"}
          />
          {items}
        </SelectField>
      )
    }
    return
  }

  field_map_submit() {
    axios.defaults.withCredentials = true
    const { field_map, batch_id, lead_price } = this.state
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.props.token
    axios
      .post(`${process.env.BACKEND}/csv/mapper/` + batch_id, {
        field_map,
        lead_price
      })
      .then(response => {
        const { done } = response.data
        console.log(done)
        //TODO: finish upload screen
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.error) {
            const errors = error.response.data.error.split("; ")
            this.setState({ errors: errors })
            setTimeout(() => {
              this.setState({ errors: null })
            }, errors.length * 2250)
          }
        }
      })
  }

  fieldMapper() {
    const { db_field_list } = this.state
    let fields
    if (db_field_list)
      fields = db_field_list.map((f, i) => {
        return (
          <div key={i} className="line flexed">
            <div className="fieldLabel">{f} </div>
            {this.listItems(f)}
          </div>
        )
      })
    return (
      <div className="fields_mapper">
        <div className="header">Map Columns in your CSV to Leads </div>
        <div className="header">Personal Identification Information </div>
        <div className="header">
          fields that will only be visible to who bought the lead
        </div>
        <div className="fields flexed">
          <div>{fields}</div>
        </div>
        <div className="price">
          <span>Lead price</span>
          <TextField
            hintText="Hint Text"
            floatingLabelText="Floating Label Text"
          />
        </div>
        <div className="field_submit flexed">
          <div>
            <input
              type="checkbox"
              name="agree_to_terms"
              id="terms_checkbox"
              value={"false"}
            />
            <label htmlFor="terms_checkbox">I AGREE THE TERMS</label>
          </div>
          {this.generalError()}
          <div>
            <Button
              onClick={() => {
                this.field_map_submit()
              }}
              containerElement="label"
              label="Submit"
            />
          </div>
        </div>
      </div>
    )
  }

  generalError() {
    const { errors } = this.state
    if (errors && errors.length > 0) {
      const errorMsgs = errors.map((e, i) => {
        return <div key={i}>{e}</div>
      })
      return <div className="error">{errorMsgs}</div>
    }
    return
  }

  file_upload() {
    const fileLabel = this.state.file ? this.state.file.name : "Choose File"
    return (
      <div className="csvUpload">
        <div className="file_pick">
          <div>
            <Button containerElement="label" label={fileLabel}>
              <input
                className="displaynone"
                type="file"
                onChange={this.pickFile}
              />
            </Button>
          </div>
        </div>
        {this.generalError()}
        <div className="submit">
          <Button
            onClick={() => {
              this.submit()
            }}
            containerElement="label"
            label="Submit"
          />
        </div>
      </div>
    )
  }

  nextStep() {}

  prevStep() {}

  render() {
    const { currentStep } = this.state
    let currentComponent = this.file_upload()
    switch (currentStep) {
      case "fieldMap":
        currentComponent = this.fieldMapper()
    }
    return (
      <div>
        {currentComponent}
        <div className="flexed">
          <Button
            onClick={() => {
              this.submit()
            }}
            label="&lt;"
          />
          <Button
            onClick={() => {
              this.submit()
            }}
            label="&gt;"
          />
        </div>
      </div>
    )
  }
}

export default CSVUpload
