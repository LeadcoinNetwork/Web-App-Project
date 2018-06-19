import React from "react"
import TextField from "Components/TextField"
import Button from "Components/Button"
import { connect } from "react-redux"
import { userSettings } from "../../actions"

function UserSettings({
  currentPassword,
  newPassword,
  confirmPassword,
  loading,
  error,
  onChange,
  onSubmit,
}) {
  function updateText(field_name) {
    return (e) => {
      onChange(field_name, e.target.value)
    }
  }
  
  return (
    <div className="user-settings">
      <h1 className="title">User Settings</h1>
      <h3 className="password-title">Change Your Password</h3>
      <div>
        <TextField
          label="Current Password"
          value={currentPassword}
          placeholder={"Enter Your Current Password"}
          onChange={updateText("currentPassword")}
          type="password"
        />
      </div>
      <div>
        <TextField
          label="New Password"
          value={newPassword}
          placeholder={"Enter Your New Password"}
          onChange={updateText("newPassword")}
          type="password"
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          value={confirmPassword}
          placeholder={"Confirm Your New Password"}
          onChange={updateText("confirmPassword")}
          type="password"
        />
      </div>
      <div>
        <Button
          label="submit"
          loading={loading}
          onClick={onSubmit}
        />
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

const mapStateToProps = state => state.userSettings
const mapDispatchToProps = {
  onChange: userSettings.userSettingsHandleChange,
  onSubmit: userSettings.userSettingsSubmit,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
