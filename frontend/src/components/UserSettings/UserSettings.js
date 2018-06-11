import React from "react"
import TextField from "../TextField"
import Button from "../Button"

function UserSettings({
  onUpdate,
  current,
  onSubmit,
  error,
  newPassword,
  confirmPassword,
  loading,
}) {
  function updateText(field_name) {
    return (e, newValue) => {
      onUpdate(field_name, newValue)
    }
  }
  return (
    <div>
      <h1 className="title">User Settings</h1>
      <h3 className="password-title">Change Your Password</h3>
      <div>
        <TextField
          label="Current Password"
          value={current}
          hintText={"Enter Your Current Password"}
          onChange={updateText("current")}
          type="password"
        />
      </div>
      <div>
        <TextField
          name="new"
          label="New Password"
          value={newPassword}
          hintText={"Enter Your New Password"}
          onChange={updateText("newPassword")}
          type="password"
        />
      </div>
      <div>
        <TextField
          name="varify"
          label="Varify Password"
          value={confirmPassword}
          hintText={"Varify Your New Password"}
          onChange={updateText}
          type="password"
        />
      </div>

      <div>
        <Button label="Submit" onClick={onSubmit} />
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default UserSettings
