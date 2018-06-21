import React from "react"
import Select from "Components/Select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { csvMapping } from "Actions"

class AddLead extends React.Component {
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

  render() {
    const { db_fields } = this.props
    let fields
    fields = db_fields.map((f, i) => {
      return (
        <div key={i} className="line flexed">
          <div className="fieldLabel">{f} </div>
        </div>
      )
    })

    const price_element = this.renderPriceElement()
    const terms = this.renderTerms()
    return (
      <div className="fields_mapper">
        <div className="header">Some text </div>
        <div className="header">More text </div>
        <div className="header">Even More </div>
        <div className="fields flexed">
          <div>{fields}</div>
        </div>
        {price_element}

        <div className="field_submit flexed">
          {terms}
          <div>
            <Button
              onClick={() => { this.props.submit(this.props.fields_map) }}
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
  price: csvMapping.csvMappingClearForm,
  submit: csvMapping.csvMappingSubmit,
})(AddLead)