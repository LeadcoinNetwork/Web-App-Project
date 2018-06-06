import React from "react";
import Snacbar from "material-ui/Snackbar";
import Button from "Components/Button";
import { Link } from "react-router-dom";

function Header(props) {
  function getSnackbarStyle(type) {
    let color, backgroundColor;

    switch (type) {
      case "error":
        color = "#721c24";
        backgroundColor = "#f8d7da";
        break;
      case "warning":
        color = "#856404";
        backgroundColor = "#fff3cd";
        break;
      case "info":
        color = "#0c5460";
        backgroundColor = "#d1ecf1";
        break;
      default:
        color = "#155724";
        backgroundColor = "#d4edda";
    }

    return { color, backgroundColor };
  }

  var currentNotification = props.notifications.current;
  currentNotification.style = getSnackbarStyle(currentNotification.type);
  var routes = [
    "/admin/login",
    "/admin/leads",
    "/admin/transactions",
    "/users/signup",
    "/users/complete-registration",
    "/users/email-confirmation",
    "/users/login",
    "/users/settings",
    "/users/notifications",
    "/users/payments",
    "/users/withdrawal",
    "/leads/buy",
    "/leads/sell",
    "/leads/my",
    "/leads/new",
    "/leads/csv-upload",
    "/leads/csv-mapping",
    "/leads/checkout",
    "/leads/1/dispute"
  ];

  return (
    <div className="ldc-header">
      {routes.map(path => (
        <span>
          <Link to={path}>{path}</Link>&nbsp;&nbsp;
        </span>
      ))}
      <Snacbar
        open={!!currentNotification.message}
        message={currentNotification.message || ""}
        autoHideDuration={50000}
        bodyStyle={currentNotification.style}
        contentStyle={currentNotification.style}
      />
      <br />
      <br />
    </div>
  );
}

export default Header;
