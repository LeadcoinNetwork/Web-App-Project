import React from "react"
import { connect } from "react-redux"
import { transactionHistory } from "Actions"
import t from "../../utils/translate/translate"

class TransactionHistory extends React.Component {
  id = null

  constructor(props) {
    super(props)
  }

  fetchData() {
    this.props.transactionHistoryFetch()
  }

  renderFields(fieldsObj) {
    const data = fieldsObj
    return data.map((v, index) => {
      return (
        <div key={index}>
          date: {v.date}
          from: {v.from}
          id: {v.id}
          to: {v.to}
          txHash: {v.txHash}
          value: {v.value}
        </div>
      )
    })
  }

  render() {
    if (
      this.props.user &&
      this.props.user.id &&
      this.props.user.id !== this.id
    ) {
      this.id = this.props.user.id
      this.fetchData()
    }
    const { loading, data } = this.props.transactionHistoryData
    if (!data || loading) {
      return <div className="transaction-history">{t("Loading...")}</div>
    }
    return (
      <div className="transaction-history"> {this.renderFields(data)} </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    transactionHistoryData: state.transactionHistory,
    user: state.user,
  }
}
export default connect(
  mapStateToProps,
  {
    transactionHistoryFetch: transactionHistory.transactionHistoryFetch,
  },
)(TransactionHistory)
