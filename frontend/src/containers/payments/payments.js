import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import Table from "../../components/table"
import t from "../../utils/translate/translate"

const paymentsConfig = require("./payments_table.config.json")

const PaymentsHistory = ({ list, loading, error, onScrollBottom }) => (
  <div className="payment-history">
    <Table
      title="Payments History"
      fields={paymentsConfig.fields.map(field => ({
        ...field,
        name: t(field.name),
      }))}
      records={list}
      onScrollBottom={onScrollBottom}
      showOnZeroRecords={
        loading ? (
          <div>{t("Loading...")}</div>
        ) : error ? (
          <div>{t(error)}</div>
        ) : (
          <div>{t("Nothing to show")}</div>
        )
      }
      isSelectable={false}
    />
  </div>
)

const mapDispatchToProps = {
  onScrollBottom: Actions.payments.paymentsHistoryOnScrollBottom,
}

const mapStateToProps = state => state.payments

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsHistory)
