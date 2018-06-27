import React from "react"
import Button from "Components/Button"
import { connect } from "react-redux"
import { dispute } from "Actions"

class Dispute extends React.Component {
  handleChange = event => {
    this.props.handleChange(event.target.name, event.target.value)
  }
  render() {
    let { dispute, submit, loading } = this.props

    return (
      <section className="ldc-dispute">
        <h1>Why do you want to Dispute?</h1>
        <textarea
          name="message"
          value={dispute.message}
          placeholder="Enter dispute details"
          onChange={this.handleChange}
        />
        <Button label="Submit" loading={loading} appStyle onClick={submit} />
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
