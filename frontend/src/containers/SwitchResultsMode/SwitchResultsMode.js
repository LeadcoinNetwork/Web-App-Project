import React from "react"
import t from "../../utils/translate/translate"

const SwitchResultsMode = ({ cardsMode, toggleMode }) => {
  return (
    <>
      <label className="srm-selector" onClick={toggleMode}>
        {t("Switch to")} &nbsp;
        <i
          className={`fas fa-${cardsMode ? "table" : "bars"}`}
          style={{ fontSize: "18px", position: "relative", top: "2px" }}
        />
      </label>
    </>
  )
}

export default SwitchResultsMode
