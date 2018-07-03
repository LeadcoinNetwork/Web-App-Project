import React from "react"
import Button from "Components/Button"
import Textarea from "Components/Textarea"
import { connect } from "react-redux"
import { dispute } from "Actions"
import t from "Containers/translate"

class Dispute extends React.Component {
  handleChange = event => {
    this.props.handleChange(event.target.name, event.target.value)
  }
  getErrors(errors) {
    return (
      <ul className="ldc-error-text">
        {errors.split(";").map(e => <li>{e}</li>)}
      </ul>
    )
  }
  render() {
    let { dispute, submit } = this.props

    return (
      <section className="ldc-dispute">
        <h1>{t("Why do you want to Dispute?")}</h1>
        <Textarea
          name="message"
          value={dispute.message}
          placeholder="Enter dispute details"
          onChange={this.handleChange}
        />
        {dispute.error && this.getErrors(dispute.error)}
        <Button
          label={t("Submit")}
          loading={dispute.loading}
          appStyle
          onClick={submit}
        />
      </section>
    )
  }
}

const mapStateToProps = state => ({
  dispute: state.dispute,
})

export default connect(mapStateToProps, {
  handleChange: dispute.disputeHandleChange,
  submit: dispute.disputeUserSubmit,
})(Dispute)
