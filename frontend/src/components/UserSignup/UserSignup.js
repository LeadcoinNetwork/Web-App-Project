import React from "react"
import Button from "Components/Button"
import TextField from "Components/TextField"
import SSOContainer from "Components/SSOContainer"

const Signup = ({ name, email, password, error, handleChange, submit }) => {
  const handleChangeBind = name => event =>
    handleChange(name, event.target.value)

  return (
    <div>
      <SSOContainer />
      <TextField
        label="name"
        value={name}
        onChange={handleChangeBind("name")}
      />
      <TextField
        label="email"
        value={email}
        onChange={handleChangeBind("email")}
      />
      <TextField
        label="Password"
        value={password}
        onChange={handleChangeBind("password")}
        type="password"
      />
      <div>{error}</div>
      <Button onClick={submit}>SignUp</Button>
    </div>
  )
}

export default Signup
