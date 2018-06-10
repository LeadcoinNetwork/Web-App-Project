import React from "react"
import { connect } from "react-redux"
import PaymentsHistory from "Components/PaymentsHistory"
import { getPayments } from "../../actions"

class Payments extends React.Component {
  constructor(props) {
    super(props)

    props.getPayments()
  }
  render() {
    return <PaymentsHistory payments={this.props.payments} />
  }
}

const mapStateToProps = state => ({
  payments: state.payments,
})

export default connect(mapStateToProps, {
  getPayments,
})(Payments)
