import React from "react"
import { connect } from "react-redux"
import PaymentsHistory from "Components/PaymentsHistory"
import { payments } from "../../actions"

class Payments extends React.Component {
  constructor(props) {
    super(props)

    payments.getPayments(props.dispatch)
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
