import React from "react"
import { connect } from "react-redux"
import * as actions from "Actions"

const list = require("./languagesList.json")

class LanguageSelector extends React.Component {
  handleClick = () => {
    if (this.props.isOpen) {
      this.props.languageSelectorClick()
    }
  }

  selectLanguage = countryCode => this.props.languageSelectorUpdate(countryCode)

  componentDidMount() {
    window.addEventListener("click", this.handleClick)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick)
  }

  render() {
    const {
      country,
      isOpen,
      languageSelectorClick,
      languageSelectorUpdate,
    } = this.props
    return (
      <div
        className="ldc-language-selector"
        onClick={e => {
          e.stopPropagation()
          return languageSelectorClick()
        }}
      >
        <div
          className={"selected-flag flag-icon-background flag-icon-" + country}
        />
        {isOpen && (
          <div className="flags-menu">
            {list
              .filter(countryItem => countryItem !== country)
              .map(countryItem => (
                <div
                  key={countryItem}
                  className={
                    "flag flag-icon-background flag-icon-" + countryItem
                  }
                  onClick={e => {
                    e.stopPropagation()
                    languageSelectorUpdate(countryItem)
                  }}
                />
              ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => state.language

const mapDispatchToProps = {
  languageSelectorUpdate: actions.language.languageSelectorUpdate,
  languageSelectorClick: actions.language.languageSelectorClick,
}

const LanguageSelectorConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSelector)

export default LanguageSelectorConnected
