import React from "react"
import SnacbarMui from "material-ui/Snackbar"

function Snacbar(props) {
  function getSnackbarStyle(type) {
    let color, backgroundColor

    switch (type) {
      case "error":
        color = "#721c24"
        backgroundColor = "#f8d7da"
        break
      case "warning":
        color = "#856404"
        backgroundColor = "#fff3cd"
        break
      case "info":
        color = "#0c5460"
        backgroundColor = "#d1ecf1"
        break
      default:
        color = "#155724"
        backgroundColor = "#d4edda"
    }

    return { color, backgroundColor }
  }

  var currentNotification = props.notifications.current
  currentNotification.style = getSnackbarStyle(currentNotification.type)

  return (
    <SnacbarMui
      open={!!currentNotification.message}
      message={currentNotification.message || ""}
      autoHideDuration={50000}
      bodyStyle={currentNotification.style}
      contentStyle={currentNotification.style}
    />
  )
}

export default Snacbar
