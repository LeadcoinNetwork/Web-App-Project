import React from "react"
import Select from "Components/Select"
import Button from "Components/Button"
import TextField from "Components/TextField"
import { connect } from "react-redux"
import { addLead } from "Actions"

class AddLead extends React.Component {
  renderPriceElement() {
    const errors = this.props.errors
    const error = (errors.indexOf('price') > -1) ? "error" : ""
    return (
      <div className={"price "+error}>
        <span>Lead price</span>
        <TextField
          value={this.props.price}
          onChange={ (e) => {
            this.props.handleChange('price',e.target.value)
          }}
        />
      </div>
    )

  }

  renderTerms() {
    const {errors} = this.props
    const error = errors['agree_to_terms'] ? "error" : ""
    return (
      <div className={error + " twothirds"}>
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
    const { db_fields, values, errors } = this.props
    let fields
    fields = db_fields.map((f, i) => {
      const isError = errors[f] ? 'error' : ''
      return (
        <div key={i} className={isError+" line flexed"}>
          <div className="fieldLabel">{f} </div>
          <div className="fieldValue">
            <TextField
              inverted={true}
              placeholder=" "
              value={values[f]}
              onChange={ (e) => {
                this.props.handleChange(f, e.target.value)
              }}
            />
           </div>
        </div>
      )
    })
    if (fields.length <1) {
      return (
        <div> LOADING </div>
      )
    }
    const terms = this.renderTerms()
    return (
      <div className="add_lead">
        <div className="header">Some text </div>
        <div className="header">More text </div>
        <div className="header">Even More </div>
        <div className="fields flexed">
          <div>{fields}</div>
        </div>
        <div className="field_submit flexed">
          {terms}
          <div>
            <Button
              onClick={() => { this.props.submit(values) }}
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
    )
  }
}

const mapStateToProps = state => ({
  ...state.addLead
})

export default connect(mapStateToProps, {
  agreeToTerms: addLead.addLeadAgreeToTerms,
  handleChange: addLead.addLeadHandleFormChange,
  submit: addLead.addLeadSubmitForm,
  clear: addLead.addLeadClearForm,
})(AddLead)