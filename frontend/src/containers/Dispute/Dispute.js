import React from "react"
import Button from "Components/Button"
import { connect } from "react-redux"

class Dispute extends React.Component {
  render() {
    return (
      <section className="ldc-dispute">
        <h1>Why do you want to Dispute?</h1>
        <textarea placeholder="Enter dispute details" />
        <Button label="Submit" appStyle />
      </section>
    )
  }
}

export default connect()(Dispute)
