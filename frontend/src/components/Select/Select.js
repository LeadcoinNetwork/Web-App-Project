import React from "react"

const Select = ({
  className,
  value,
  disabled,
  loading,
  onChange,
  children,
  options,
}) => {
  let items
  if (options) {
    items = options.map((maybe_tupple, i) => {
      let _text, _value
      if (Array.isArray(maybe_tupple)) {
        ;[_value, _text] = maybe_tupple
      } else {
        _value = _text = maybe_tupple
      }
      return (
        <option value={_value} key={i}>
          {" "}
          {_text}{" "}
        </option>
      )
    })
  }

  return (
    <select
      value={value}
      className={`ldc-select${className ? " " + className : ""}${
        loading ? " b-loading" : ""
      }`}
      disabled={disabled || false}
      onChange={onChange}
    >
      {items}
      {children}
    </select>
  )
}

export default Select
