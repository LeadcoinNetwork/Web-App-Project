import React from "react"
import Select from "Components/Select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { csvMapping } from "Actions"

class CSVMapping extends React.Component {
  listItems(fieldName) {
    const { fields_map, file_fields } = this.props
    if (file_fields) {
      let value = ""
      if (fields_map && fields_map[fieldName]) value = fields_map[fieldName]
      const items = file_fields.map((field, i) => { return field })
      items.unshift(['0', "I Don't have this field"])
      return (
        <Select
          options={items}
          value={value}
          onChange={(e) => {
            this.props.handleMapChange(fieldName, e.target.value)
          }} />
      )
    }
    return
  }

  render() {
    const { db_fields, batch_id } = this.props
    let fields
    if (!batch_id)
      return (
        <div className="fields_mapper">
          <div> LOADING </div>
        </div>
      )
    fields = db_fields.map((f, i) => {
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
            onChange={ (e) => {
              this.props.handleChange('price',e.target.value)
            }}
          />
        </div>

        <div className="field_submit flexed">
          <div>
            <input
              type="checkbox"
              name="agree_to_terms"
              id="terms_checkbox"
              value={this.props.agree_to_terms}
              onChange={(e) => {
                this.props.agreeToTerms(e.target.checked)
              }}
            />
            <label htmlFor="terms_checkbox">I AGREE THE TERMS</label>
          </div>
          <div>
            <Button
              onClick={() => { 
                this.props.submit(this.props.fields_map) 
              }}
              label="Submit"
            />
          </div>
          <div>
            <Button
              onClick={() => { this.props.clear() }}
              label="Clear"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.csvMapping
})

export default connect(mapStateToProps, {
  agreeToTerms: csvMapping.csvMappingAgreeToTerms,
  handleMapChange: csvMapping.csvMappingMapChange,
  handleChange: csvMapping.csvMappingFormChange,
  clear: csvMapping.csvMappingClearForm,
  submit: csvMapping.csvMappingSubmit,
})(CSVMapping)