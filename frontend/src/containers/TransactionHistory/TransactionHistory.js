import React from "react"
import { connect } from "react-redux"
import { transactionHistory } from "Actions"
import t from "../../utils/translate/translate"

class TransactionHistory extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.transactionHistory.transactionHistoryFetch()
  }

  renderFields(fieldsObj) {
    const data = fieldsObj
    return Object.keys(data).map(f => {
      return (
        <div key={f} className="line flexed">
          <div className="fieldLabel"> {f} </div>
          <div className="fieldValue"> {fieldsObj[f]} </div>
        </div>
      )
    })
  }

  render() {
    console.log("ffff")
    const { loading, data } = this.props.transactionHistoryData
    if (!data || loading) {
      return <div className="transaction-history">{t("Loading...")}</div>
    }
    return <div className="transaction-history" />
  }
}

const mapStateToProps = state => {
  return {
    transactionHistoryData: state.transactionHistory,
  }
}
export default connect(
  mapStateToProps,
  {
    transactionHistory: transactionHistory,
  },
)(TransactionHistory)
