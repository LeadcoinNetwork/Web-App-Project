import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import { Time } from "../../utils/time"
import Table from "../../components/Table"

const paymentsConfig = require("./payments_table.config.json")

const getButtons = exportPayment => {
  return {
    record: [
      {
        value: "export",
        onClick: exportPayment,
      },
    ],
  }
}

const PaymentsHistory = ({
  payments,
  onRefresh,
  isDeleteable,
  exportPayment,
}) => (
  <div>
    {!payments.loading &&
      !payments.error && (
        <Table
          title="Payments History"
          fields={paymentsConfig.fields}
          records={payments.list}
          buttons={getButtons(exportPayment)}
          // TODO: onScrollBottom={onScrollBottom}
          onZeroRecords={<div>Nothing to show</div>}
          isSelectable={false}
        />
      )}
    {/* {isDeleteable && <div>Delete</div>} */}
    {payments.loading ? <div>Loading...</div> : ""}
    {payments.error && <div>{payments.error}</div>}
  </div>
)

const mapDispatchToProps = {
  exportPayment: Actions.payments.PaymentsHistoryExportPayment,
  onScrollBottom: Actions.payments.paymentsHistoryOnScrollBottom,
}

const mapStateToProps = state => ({
  payments: state.payments,
  isDeleteable: state.user.DeleteAllow || state.user.isAdmin,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentsHistory)
