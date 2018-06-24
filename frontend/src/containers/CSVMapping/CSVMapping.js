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

  renderPriceElement() {
    const errors = this.props.errors
    const error = (errors.indexOf('price') > -1) ? "error" : ""
    return (
      <div className={"price "+error}>
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
    )

  }

  renderTerms() {
    const errors = this.props.errors
    const error = (errors.indexOf('agree_to_terms') > -1) ? "error" : ""
    return (
      <div className={error}>
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
    )
  }

  private_fields() {
    const {db_fields} = this.props
    const fields = db_fields.private
    return fields.map((f, i) => {
      return (
        <div key={i} className="line flexed">
          <div className="fieldLabel">{f} </div>
          {this.listItems(f)}
        </div>
      )
    })
  }

  public_fields() {
    const {db_fields} = this.props
    const fields = db_fields.public
    return fields.map((f, i) => {
      return (
        <div key={i} className="line flexed">
          <div className="fieldLabel">{f} </div>
          {this.listItems(f)}
        </div>
      )
    })
  }

  render() {
    const { batch_id } = this.props
    if (!batch_id)
      return (
        <div className="fields_mapper">
          <div> LOADING </div>
        </div>
      )
    const price_element = this.renderPriceElement()
    const terms = this.renderTerms()
    return (
      <div className="fields_mapper">
        <div className="main_container">
          <div className="personal flexed">
            <div className="help_text">
              <div className="header">Personal Identification Information </div>
              <div className="header">These fields will only be visible to who bought the lead </div>
            </div>
            <div className="fields">
              {this.private_fields()}
            </div>
          </div>
          <div className="public flexed">
            <div className="help_text">
              <div className="header">Public Fields </div>
            </div>
            <div className="fields">
              {this.public_fields()}
            </div>
          </div>
        {price_element}
          <div className="controls field_submit flexed">
          {terms}
          <div>
            <Button
              onClick={() => { this.props.submit(this.props.fields_map) }}
              label="Submit"
            />
          </div>
          <div>
            <Button
              inverted={true}
              onClick={() => { this.props.clear() }}
              label="Clear"
            />
          </div>
          </div>

        </div>
        <div className="field_submit flexed">
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
  handleErrors: csvMapping.csvMappingError,
  clear: csvMapping.csvMappingClearForm,
  submit: csvMapping.csvMappingSubmit,
})(CSVMapping)