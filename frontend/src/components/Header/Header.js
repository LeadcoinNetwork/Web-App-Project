import React from "react";
import Button from "Components/Button";
import { push } from "react-router-redux";

const Header = props => (
  <div>
    <Button
      label="user details"
      onClick={() => props.dispatch(push("/user-details"))}
    />
    <Button label="login" onClick={() => props.dispatch(push("/login"))} />
    <Button label="signup" onClick={() => props.dispatch(push("/signup"))} />
    <Button
      label="email confirmation"
      onClick={() => props.dispatch(push("/email-confirmation"))}
    />
    <Button
      label="upload"
      onClick={() => props.dispatch(push("/csv-upload"))}
    />
    <Button label="leads" onClick={() => props.dispatch(push("/leads"))} />
    <br />
    <br />
  </div>
);

export default Header;
