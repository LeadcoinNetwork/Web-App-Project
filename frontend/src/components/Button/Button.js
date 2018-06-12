import React from "react"
import MaterialButton from "material-ui/RaisedButton"

class Button extends React.Component {
  componentDidMount() {
    if (this.refs.btn) {
      this.width = getComputedStyle(this.refs.btn).width
    }
  }
  render() {
    var {
      type,
      onClick,
      children,
      label,
      containerElement,
      disabled,
      loadingText,
      loading,
    } = this.props

    if (loading) {
      return (
        <button style={{ width: this.width, minWidth: 80 }} disabled={disabled}>
          ...
        </button>
      )
    } else {
      return (
        <button
          children={children}
          ref="btn"
          type={type}
          label={label}
          onClick={onClick}
          // containerElement={containerElement}
          disabled={disabled}
        >
          {label}
        </button>
      )
    }
  }
}

export default Button
