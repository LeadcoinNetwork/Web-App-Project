import React from "react";
import Button from "Components/Button";
import { push } from "react-router-redux";

const Header = props => (
  <div>
    <Button label="home" onClick={() => props.dispatch(push("/"))} />
    <Button label="admin" onClick={() => props.dispatch(push("/admin"))} />
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
      label="lead dispute"
      onClick={() => props.dispatch(push("/leads/1/dispute"))}
    />
    <br />
    <br />
  </div>
);

export default Header;
