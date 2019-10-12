import React from "react"
import { connect } from "react-redux"
import { transactionHistory } from "Actions"
import t from "../../utils/translate/translate"
import { localeString } from "Utils/time"

const transactionItem = ["date", "from", "to", "txHash", "value"]

class TransactionHistory extends React.Component {
  id = null

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate() {
    this.fetchData()
  }

  fetchData() {
    if (
      this.props &&
      this.props.user &&
      this.props.user.id &&
      this.id !== this.props.user.id
    ) {
      this.id = this.props.user.id
      this.props.transactionHistoryFetch()
    }
  }

  renderFields(data) {
    return data.map((v, index) => {
      return (
        <div key={index} className="transaction-history-item">
          <div className="transaction-history-title">
            {t("Transactions history")}
          </div>
          {transactionItem.map((key, index) => {
            return (
              <div className="transaction-history-subitem" key={index}>
                <span className="transaction-history-label">{t(key)}:</span>
                <span className="transaction-history-value">
                  {key === "date" ? localeString(v.date) : v[key]}
                </span>
              </div>
            )
          })}
        </div>
      )
    })
  }

  render() {
    const { loading, data } = this.props.transactionHistoryData
    if (!data || loading) {
      return <div className="transaction-history">{t("Loading...")}</div>
    }
    return (
      <div className="transaction-history">
        {data && data.length === 0 && <div> {t("List is empty")}</div>}
        {this.renderFields(data)}
      </div>
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
