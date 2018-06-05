import React from "react";
import Snacbar from "material-ui/Snackbar";
import Button from "Components/Button";
import { push } from "react-router-redux";

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
        <Button label="home" onClick={() => props.dispatch(push("/"))} />
        <Button
          label="admin - login"
          onClick={() => props.dispatch(push("/admin/login"))}
        />
        <Button
          label="admin - users"
          onClick={() => props.dispatch(push("/admin/users"))}
        />
        <Button
          label="admin - leads"
          onClick={() => props.dispatch(push("/admin/leads"))}
        />
        <Button
          label="admin - transactions"
          onClick={() => props.dispatch(push("/admin/transactions"))}
        />
        <Button
          label="signup"
          onClick={() => props.dispatch(push("/users/signup"))}
        />
        <Button
          label="complete registration"
          onClick={() => props.dispatch(push("/users/complete-registration"))}
        />
        <Button
          label="email confirmation"
          onClick={() => props.dispatch(push("/users/email-confirmation"))}
        />
        <Button
          label="login"
          onClick={() => props.dispatch(push("/users/login"))}
        />
        <Button
          label="Settings"
          onClick={() => props.dispatch(push("/users/settings"))}
        />
        <Button
          label="Notifications"
          onClick={() => props.dispatch(push("/users/notifications"))}
        />
        <Button
          label="Payments"
          onClick={() => props.dispatch(push("/users/payments"))}
        />
        <Button
          label="Withdrawal"
          onClick={() => props.dispatch(push("/users/withdrawal"))}
        />
        <Button
          label="buy leads"
          onClick={() => props.dispatch(push("/leads/buy"))}
        />
        <Button
          label="sell leads"
          onClick={() => props.dispatch(push("/leads/sell"))}
        />
        <Button
          label="my leads"
          onClick={() => props.dispatch(push("/leads/my"))}
        />
        <Button
          label="new lead"
          onClick={() => props.dispatch(push("/leads/new"))}
        />
        <Button
          label="csv upload"
          onClick={() => props.dispatch(push("/leads/csv-upload"))}
        />
        <Button
          label="csv mapping"
          onClick={() => props.dispatch(push("/leads/csv-mapping"))}
        />
        <Button
          label="checkout"
          onClick={() => props.dispatch(push("/leads/checkout"))}
        />
        <Button
          label="lead dispute"
          onClick={() => props.dispatch(push("/leads/1/dispute"))}
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
