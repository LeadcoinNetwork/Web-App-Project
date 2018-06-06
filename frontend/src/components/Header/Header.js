import React from "react";
import Snacbar from "material-ui/Snackbar";
import Button from "Components/Button";

class Header extends React.Component {
  getSnackbarStyle(type) {
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
  render() {
    let props = this.props,
      currentNotification = props.notifications.current;
    currentNotification.style = this.getSnackbarStyle(currentNotification.type);

    return (
      <div className="ldc-header">
        <Button label="home" onClick={() => props.boundPush("/")} />
        <Button
          label="admin - login"
          onClick={() => props.boundPush("/admin/login")}
        />
        <Button
          label="admin - users"
          onClick={() => props.boundPush("/admin/users")}
        />
        <Button
          label="admin - leads"
          onClick={() => props.boundPush("/admin/leads")}
        />
        <Button
          label="admin - transactions"
          onClick={() => props.boundPush("/admin/transactions")}
        />
        <Button
          label="signup"
          onClick={() => props.boundPush("/users/signup")}
        />
        <Button
          label="complete registration"
          onClick={() => props.boundPush("/users/complete-registration")}
        />
        <Button
          label="email confirmation"
          onClick={() => props.boundPush("/users/email-confirmation")}
        />
        <Button label="login" onClick={() => props.boundPush("/users/login")} />
        <Button
          label="Settings"
          onClick={() => props.boundPush("/users/settings")}
        />
        <Button
          label="Notifications"
          onClick={() => props.boundPush("/users/notifications")}
        />
        <Button
          label="Payments"
          onClick={() => props.boundPush("/users/payments")}
        />
        <Button
          label="Withdrawal"
          onClick={() => props.boundPush("/users/withdrawal")}
        />
        <Button
          label="buy leads"
          onClick={() => props.boundPush("/leads/buy")}
        />
        <Button
          label="sell leads"
          onClick={() => props.boundPush("/leads/sell")}
        />
        <Button label="my leads" onClick={() => props.boundPush("/leads/my")} />
        <Button
          label="new lead"
          onClick={() => props.boundPush("/leads/new")}
        />
        <Button
          label="csv upload"
          onClick={() => props.boundPush("/leads/csv-upload")}
        />
        <Button
          label="csv mapping"
          onClick={() => props.boundPush("/leads/csv-mapping")}
        />
        <Button
          label="checkout"
          onClick={() => props.boundPush("/leads/checkout")}
        />
        <Button
          label="lead dispute"
          onClick={() => props.boundPush("/leads/1/dispute")}
        />
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
}

export default Header;
