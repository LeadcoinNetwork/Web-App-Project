import React from "react"
import ResultsModeContext from "../app/resultsModeContext"
import t from "../../utils/translate/translate"

const SwitchResultsMode = () => (
  <ResultsModeContext.Consumer>
    {({ cardsMode, toggleMode }) => (
      <label className="srm-selector" onClick={toggleMode}>
        {t("Switch to")} &nbsp; &nbsp;
        <i
          className={`fas fa-${cardsMode ? "table" : "bars"}`}
          style={{ fontSize: "20px", position: "relative", top: "2px" }}
        />
      </label>
    )}
  </ResultsModeContext.Consumer>
)

export default SwitchResultsMode
