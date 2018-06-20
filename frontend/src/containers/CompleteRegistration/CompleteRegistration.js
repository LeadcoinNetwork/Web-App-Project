import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import ReactPhoneInput from "react-phone-input-2"
import { completeRegistration } from "Actions"

class CompleteRegistration extends React.Component {
  handleChange = event => {
    this.handleChange(event.target.name, event.target.value)
  }
  render() {
    let { company, country, phone } = this.props.completeRegistration

    return (
      <section className="ldc-complete-registration">
        <div className="cr-main">
          <h1>fill your profile</h1>
          <TextField
            placeholder="Company Name"
            name="company"
            value={company}
            onChange={this.handleChange}
            type="text"
          />
          <TextField
            placeholder="Country"
            name="country"
            value={country}
            onChange={this.handleChange}
            type="text"
          />
          <TextField
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={this.handleChange}
            type="text"
          />
          <ReactPhoneInput defaultCountry={"us"} onChange={console.log} />
          <Button label="Submit" />
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  completeRegistration: state.completeRegistration,
})

export default connect(mapStateToProps, {
  handleChange: completeRegistration.handleChange,
  submit: completeRegistration.submit,
})(CompleteRegistration)
