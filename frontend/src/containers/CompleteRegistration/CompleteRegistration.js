import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import ReactPhoneInput from "react-phone-input-2"
import { completeRegistration } from "Actions"
import t from "Images/t.jpg"

class CompleteRegistration extends React.Component {
  handleChange = event =>
    this.props.handleChange(event.target.name, event.target.value)
  handlePhoneChange = (value, countryData) =>
    this.props.handleChange("phone", { value, ...countryData })
  getErrors = errors => (
    <ul className="ldc-error-text">
      {errors.split(";").map(e => <li>{e}</li>)}
    </ul>
  )
  render() {
    let {
      company,
      country,
      phone,
      loading,
      error,
    } = this.props.completeRegistration

    return (
      <section className="ldc-complete-registration">
        <div className="cr-main">
          <h1>Fill your Profile</h1>
          <div className="crm-form">
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
            <ReactPhoneInput
              name="phone"
              value={phone.value}
              defaultCountry={"us"}
              onChange={this.handlePhoneChange}
              inputStyle={{
                color: "#180852",
                border: "none",
                width: "100%",
                height: "50px",
                borderRadius: "25px",
                fontSize: "18px",
                paddingLeft: "80px",
              }}
              buttonStyle={{
                width: "64px",
                borderRadius: "25px 0 0 25px",
              }}
            />
            {error && this.getErrors(error)}
            <Button label="Submit" loading={loading} />
          </div>
        </div>
        <aside>
          <h3>LeadCoin is the promised land for marketers</h3>
          <q>
            Collaborating with other marketers & sharing leads is 10X more
            effcient than giving away my budget to Google & Facebook.
          </q>
          <label style={{ backgroundImage: `url(${t})` }}>
            <span>
              Meir Cohen<br />CEO of Crypto
            </span>
          </label>
        </aside>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  completeRegistration: state.completeRegistration,
})

export default connect(mapStateToProps, {
  con: console.log,
  handleChange: completeRegistration.completeRegistrationHandleChange,
  submit: completeRegistration.completeRegistrationSubmit,
})(CompleteRegistration)
