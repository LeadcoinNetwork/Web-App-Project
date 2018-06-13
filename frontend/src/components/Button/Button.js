import React from "react"

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
      disabled,
      label,
      loadingLabel,
      loading,
    } = this.props

    return (
      <button style={{ width: this.width, minWidth: 80 }}
      ref="btn"
      type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {label ? (loading ? loadingLabel : label) : ''}
        {children}
      </button>
    )
  }
}

export default Button
