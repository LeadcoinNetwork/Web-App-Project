import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import { Time } from "../../utils/time"
import Table from "../../components/Table"

const paymentsConfig = require("./payments_table.config.json")

const getButtons = exportPayment => {
  // return {
  //   table: [
  //     {
  //       value: "export",
  //       onClick: exportPayment,
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
  exportPayment,
  onScrollBottom,
}) => (
  <div className="payment-history">
    <Table
      title="Payments History"
      fields={paymentsConfig.fields}
      records={list}
      buttons={getButtons(exportPayment)}
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
  exportPayment: Actions.payments.PaymentsHistoryExportPayment,
  onScrollBottom: Actions.payments.paymentsHistoryOnScrollBottom,
}

const mapStateToProps = state => state.payments

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsHistory)
