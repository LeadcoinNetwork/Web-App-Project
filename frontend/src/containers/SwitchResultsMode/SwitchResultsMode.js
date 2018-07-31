import React from "react"
import t from "../../utils/translate/translate"

const SwitchResultsMode = () => (
  <div>
    {({ cardsMode, toggleMode }) => (
      <label className="srm-selector" onClick={toggleMode}>
        {t("Switch to")} &nbsp; &nbsp;
        <i
          className={`fas fa-${cardsMode ? "table" : "bars"}`}
          style={{ fontSize: "20px", position: "relative", top: "2px" }}
        />
      </label>
    )}
  </div>
)

export default SwitchResultsMode
