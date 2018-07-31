import React from "react"
import TextField from "Components/TextField"
import Button from "Components/Button"
import { connect } from "react-redux"
import { userSettings } from "../../actions"
import t from "../../utils/translate/translate"

class UserSettings extends React.Component {
  handleChange = event => {
    this.props.onChange(event.target.name, event.target.value)
  }
  getErrors(errors) {
    return (
      <ul className="ldc-error-text">
        {errors.split(";").map(e => <li>{t(e)}</li>)}
      </ul>
    )
  }
  render() {
    let {
      currentPassword,
      newPassword,
      confirmPassword,
      loading,
      error,
    } = this.props.userSettings

    return (
      <section className="ldc-user-settings">
        <h1>{t("User Settings")}</h1>
        {/* <h3>{t("Update your profile, username or password.")}</h3> */}
        <div className="us-password">
          <h3>{t("change your password")}</h3>
          <TextField
            appStyle={true}
            placeholder={t("Current Password")}
            name="currentPassword"
            value={currentPassword}
            onChange={this.handleChange}
            type="password"
          />
          <TextField
            appStyle={true}
            placeholder={t("New Password")}
            name="newPassword"
            value={newPassword}
            onChange={this.handleChange}
            type="password"
          />
          <TextField
            appStyle={true}
            placeholder={t("Confirm New Password")}
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
          {error && this.getErrors(error)}
          <Button
            label={t("submit")}
            loading={loading}
            onClick={this.props.onSubmit}
            appStyle={true}
          />
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  userSettings: state.userSettings,
})

export default connect(
  mapStateToProps,
  {
    onChange: userSettings.userSettingsHandleChange,
    onSubmit: userSettings.userSettingsSubmit,
  },
)(UserSettings)
