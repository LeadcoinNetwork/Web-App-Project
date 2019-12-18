import React from "react"
import TextField from "Components/TextField"
import Button from "Components/Button"
import { connect } from "react-redux"
import { userProfileSettings } from "../../actions"
import t from "../../utils/translate/translate"
import ReactPhoneInput from "react-phone-input-2"
import Checkbox from "../../components/Checkbox"

class UserProfileSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: props.user && props.user.fname ? props.user.fname : "",
      lname: props.user && props.user.lname ? props.user.lname : "",
      country: props.user && props.user.country ? props.user.country : "",
      phone: props.user && props.user.phone ? props.user.phone : "",
      company: props.user && props.user.company ? props.user.company : "",
      getNotifications:
        props.user && props.user.getNotifications
          ? props.user.getNotifications
          : false,
      getEmails:
        props.user && props.user.getEmails ? props.user.getEmails : false,
    }
    console.log(this.state)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    this.props.onChange(event.target.name, event.target.value)
  }

  handleChangeCheckbox = event => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
    this.props.onChange(event.target.name, event.target.checked)
  }

  handlePhoneChange = (value, countryData) => {
    this.setState({
      phone: value,
    })
    this.props.onChange("phone", value)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user) {
      return {
        ...state,
        fname: state.fname || props.user.fname || "",
        lname: state.lname || props.user.lname || "",
        country: state.country || props.user.country || "",
        phone: state.phone || props.user.phone || "",
        company: state.company || props.user.company || "",
        getNotifications:
          (typeof state.getNotifications !== "undefined" &&
            state.getNotifications) ||
          (typeof props.user.getNotifications !== "undefined" &&
            props.user.getNotifications) ||
          false,
        getEmails:
          (typeof state.getEmails !== "undefined" && state.getEmails) ||
          (typeof props.user.getEmails !== "undefined" &&
            props.user.getEmails) ||
          false,
      }
    }
    return state
  }

  getErrors(errors) {
    return (
      <ul className="ldc-error-text">
        {errors.split(";").map(e => <li>{t(e)}</li>)}
      </ul>
    )
  }

  onSubmit = () => {
    for (let key in this.state) {
      this.props.onChange(key, this.state[key])
    }
    this.props.onSubmit()
  }

  render() {
    let { loading, error } = this.props.userProfileSettings

    return (
      <section className="ldc-user-profile-settings test-settings">
        <h1>{t("Profile Settings")}</h1>
        <div className="ldc-user-profile-settings__item">
          <Checkbox
            onChange={this.handleChangeCheckbox}
            checked={this.state.getNotifications}
            name="getNotifications"
            label={t("Receive notification about lead favorites")}
          />
        </div>
        <div className="ldc-user-profile-settings__item">
          <Checkbox
            onChange={this.handleChangeCheckbox}
            checked={this.state.getEmails}
            name="getEmails"
            label={t("Receive e-mail about lead favorites")}
          />
        </div>
        <div />
        <div>
          <TextField
            placeholder={t("First Name")}
            value={this.state.fname}
            name="fname"
            onChange={this.handleChange}
          />
          <TextField
            placeholder={t("Last Name")}
            value={this.state.lname}
            name="lname"
            onChange={this.handleChange}
          />
          <TextField
            placeholder={t("Company")}
            value={this.state.company}
            name="company"
            onChange={this.handleChange}
          />
          <TextField
            placeholder={t("Country")}
            value={this.state.country}
            name="country"
            onChange={this.handleChange}
          />
          <ReactPhoneInput
            containerClass="react-tel-input ldc-react-phone-input"
            name="phone"
            value={this.state.phone}
            defaultCountry={"us"}
            onChange={this.handlePhoneChange}
          />
          {error && this.getErrors(error)}
          <div className="ldc-user-profile-settings-submit">
            <Button
              label={t("submit")}
              onClick={this.onSubmit}
              loading={loading}
              appStyle={true}
            />
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  userProfileSettings: state.userProfileSettings,
  user: state.user,
})

export default connect(
  mapStateToProps,
  {
    onChange: userProfileSettings.userProfileSettingsHandleChange,
    onSubmit: userProfileSettings.userProfileSettingsSubmit,
  },
)(UserProfileSettings)
