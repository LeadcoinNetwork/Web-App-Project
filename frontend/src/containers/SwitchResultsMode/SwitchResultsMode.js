import React from "react"
import ResultsModeContext from "Containers/App/ResultsModeContext"

const SwitchResultsMode = () => (
  <ResultsModeContext.Consumer>
    {({ cardsMode, toggleMode }) => (
      <label
        onClick={toggleMode}
        style={{
          float: "right", // TODO @noam move to class name
          cursor: "pointer",
          padding: "10px 3px 0 0",
        }}
      >
        Switch to &nbsp; &nbsp;
        <i
          className={`fas fa-${cardsMode ? "table" : "bars"}`}
          style={{ fontSize: "20px", position: "relative", top: "2px" }}
        />
      </label>
    )}
  </ResultsModeContext.Consumer>
)

export default SwitchResultsMode
