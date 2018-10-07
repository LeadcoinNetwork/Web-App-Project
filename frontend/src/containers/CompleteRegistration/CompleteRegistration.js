import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import ReactPhoneInput from "react-phone-input-2"
import { completeRegistration } from "Actions"
import yossiPerez from "Images/yossi-peretz.png"
import t from "../../utils/translate/translate"

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
          <h1>{t("Fill your Profile")}</h1>
          <div className="crm-form">
            <TextField
              placeholder={t("Company Name")}
              name="company"
              value={company}
              onChange={this.handleChange}
              type="text"
            />
            <TextField
              placeholder={t("Country")}
              name="country"
              value={country}
              onChange={this.handleChange}
              type="text"
            />
            <ReactPhoneInput
              containerClass="react-tel-input ldc-react-phone-input"
              name="phone"
              value={phone.value}
              defaultCountry={"us"}
              onChange={this.handlePhoneChange}
            />
            {error && this.getErrors(error)}
            <Button
              label={t("Submit")}
              onClick={this.props.submit}
              loading={loading}
            />
          </div>
        </div>
        <aside>
          <h3>{t("A True Alternative to Google & Facebook")}</h3>
          <q>
            {t(
              `LeadCoin is going to change the way blockchain and crypto companies find their leads. With Google banning advertising for crypto companies, LeadCoin offers the alternative that all of these companies need.`,
            )}
          </q>
          <label
            className="floating_head"
            style={{ backgroundImage: `url(${yossiPeretz})` }}
          />
        </aside>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  completeRegistration: state.completeRegistration,
})

export default connect(
  mapStateToProps,
  {
    con: console.log,
    handleChange: completeRegistration.completeRegistrationHandleChange,
    submit: completeRegistration.completeRegistrationSubmit,
  },
)(CompleteRegistration)
