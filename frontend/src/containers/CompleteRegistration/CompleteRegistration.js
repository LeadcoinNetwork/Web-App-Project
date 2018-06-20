import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import ReactPhoneInput from "react-phone-input-2"

class CompleteRegistration extends React.Component {
  handleChange = name => {
    return event => {
      this.setState({ [name]: event.target.value })
    }
  }
  render() {
    let { company, country, phone } = this.props.completeRegistration

    return (
      <section className="ldc-complete-registration">
        <div>Please complete your sign-up by filling these details:</div>
        <div>
          <TextField
            placeholder="Company Name"
            value={company}
            onChange={this.handleChange("company")}
            type="text"
          />
        </div>
        <div>
          <TextField
            placeholder="Country"
            value={country}
            onChange={this.handleChange("country")}
            type="text"
          />
        </div>
        <div>
          <TextField
            placeholder="Phone"
            value={phone}
            onChange={this.handleChange("phone")}
            type="text"
          />
        </div>
        <ReactPhoneInput defaultCountry={"us"} onChange={console.log} />
        <div className="submitDetails">
          <div>
            {" "}
            <Button onClick={this.submitDetails}>
              {" "}
              Complete Sign-Up{" "}
            </Button>{" "}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  completeRegistration: state.completeRegistration,
})

export default connect(mapStateToProps)(CompleteRegistration)
