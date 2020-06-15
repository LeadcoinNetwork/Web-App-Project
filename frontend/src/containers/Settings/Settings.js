import React from "react"
import UserProfileSettings from "../UserProfileSettings/UserProfileSettings"
import UserSettings from "../UserSettings/UserSettings"
import WalletSettings from "../WalletSettings/WalletSettings"
import t from "../../utils/translate/translate"

const Settings = () => (
  <div className="ldc-settings">
    <h1>{t("Settings")}</h1>
    <div className="ldc-settings-container">
      <div className="ldc-settings-item">
        <UserProfileSettings />
      </div>
      <div className="ldc-settings-item">
        <div className="ldc-settings-item-inner">
          <WalletSettings />
        </div>
        <div className="ldc-settings-item-inner">
          <UserSettings />
        </div>
      </div>
    </div>
  </div>
)

export default Settings
