import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import Table from "Components/Table"
import Button from "Components/Button"

const checkoutConfig = require("./checkout.config.json")

const checkout = ({ list, totalPrice, loading, error, onScrollBottom }) => (
  <div className="shopping-list">
    <Table
      title="Shopping Cart"
      fields={checkoutConfig.fields}
      records={list}
      onScrollBottom={onScrollBottom}
      showOnZeroRecords={<div>Shopping Cart is Empty</div>}
      isSelectable={false}
    />
    <div className="payment-option">Pay {totalPrice} with PayPal
      <Button
        label="Checkout"
        loading={loading}
        loadingLabel="Processing..."
        disabled={list.length > 0 ? false : true}
      />
    </div>
    {error && <div className="payment-error error">{error}</div>}
  </div>
)

const mapDispatchToProps = {
  onScrollBottom: Actions.checkout.checkoutOnScrollBottom,
}

const mapStateToProps = state => state.checkout

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(checkout)