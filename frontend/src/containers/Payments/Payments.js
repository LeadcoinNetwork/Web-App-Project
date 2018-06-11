import React from "react"
import { connect } from "react-redux"
import PaymentsHistory from "Components/PaymentsHistory"
import { getPayments } from "../../actions"
import * as actions from "../../actions"
class Payments extends React.Component {
  constructor(props) {
    super(props)

    getPayments(props.dispatch)
  }
  render() {
    return <PaymentsHistory {...this.props} />
  }
}

const mapStateToProps = state => ({
  payments: state.payments,
  isDeleteable: state.user.DeleteAllow || state.user.isAdmin,
})

export default connect(mapStateToProps)(Payments)
