import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import { Time } from "../../utils/time"
import Table from "../../components/Table"

const paymentsConfig = require("./payments_table.config.json")

const getButtons = exportPayments => {
  // return {
  //   table: [
  //     {
  //       value: "export",
  //       onClick: exportPayments,
  //       actionPerSelected: false,
  //     },
  //   ],
  // }
  return {}
}

const PaymentsHistory = ({
  list,
  loading,
  error,
  exportPayments,
  onScrollBottom,
}) => (
  <div className="payment-history">
    <Table
      title="Payments History"
      fields={paymentsConfig.fields}
      records={list}
      buttons={getButtons(exportPayments)}
      onScrollBottom={onScrollBottom}
      showOnZeroRecords={
        loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>Nothing to show</div>
        )
      }
      isSelectable={false}
    />
  </div>
)

const mapDispatchToProps = {
  exportPayments: Actions.payments.paymentsHistoryExportPayments,
  onScrollBottom: Actions.payments.paymentsHistoryOnScrollBottom,
}

const mapStateToProps = state => state.payments

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsHistory)
