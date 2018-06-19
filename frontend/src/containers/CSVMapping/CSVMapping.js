import React from "react"
import Select from "Components/Select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { csvMapping } from "Actions"

class CSVMapping extends React.Component {
  handleChange(fieldName, value) {
    const { field_map } = this.state
    field_map[fieldName] = value
  }

  listItems(fieldName) {
    const { field_map, file_field_list } = this.props
    if (file_field_list) {
      let value = ""
      if (field_map && field_map[fieldName]) value = field_map[fieldName]
      const items = file_field_list.map((field, i) => {
        return <option value={field} key={i} primaryText={field} />
      })
      return (
        <Select
          options={file_field_list}
          value={value}
          onChange={(e, index, value) => {
            this.props.handleChange(fieldName, value)
          }}
        >
          <option value={"0"}> I Don't have this field </option>
          />
          {items}
        </Select>
      )
    }
    return
  }

  field_map_submit() {
    /*
    axios.defaults.withCredentials = true
    const { field_map, batch_id, lead_price } = this.state
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.props.token
    axios
      .post(`${process.env.BACKEND}/csv/mapper/` + batch_id, {
        field_map,
        lead_price,
      })
      .then(response => {
        //TODO: finish upload screen
      })
      */
  }

  render() {
    const { db_field_list } = this.props
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
            placeholder="Hint Text"
            floatingLabelText="Floating Label Text"
            value={this.props.price}
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
}

const mapStateToProps = state => ({
  csvMap: state.csvMap,
})

export default connect(mapStateToProps, {
  handleChange: csvMapping.csvMappingFormChange,
  submit: csvMapping.csvMappingSubmit,
})(CSVMapping)