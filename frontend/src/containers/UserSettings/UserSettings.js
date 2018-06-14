import React from "react"
import ReactLoading from "react-loading"
import TextField from "Components/TextField"
import Button from "Components/Button"
import { connect } from "react-redux"
import { types } from "actions"

function UserSettings({
  currentPassword,
  newPassword,
  confirmPassword,
  loading,
  success,
  error,
  onUpdate,
  onSubmit,
}) {
  function updateText(field_name) {
    return (e, newValue) => {
      onUpdate(field_name, newValue)
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
        <Button onClick={onSubmit} disabled={loading}>
          <div className="submit-content">
            {loading ? "SUBMITING..." : "SUBMIT"}
            {loading && (
              <ReactLoading
                type="spin"
                color="#000000"
                height={23}
                width={23}
              />
            )}
          </div>
        </Button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

const mapStateToProps = state => state.userSettings
const mapDispatchToProps = {
  handleChange: types.us,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSettings)
