import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import Table from "Components/Table"
import Button from "Components/Button"

const checkoutConfig = require("./checkout.config.json")

const checkout = ({ list, totalPrice, loading, error, onScrollBottom }) => (
  <div className="shopping-cart">
    <h1>Shopping Cart</h1>
    <Table
      fields={checkoutConfig.fields}
      records={list}
      onScrollBottom={onScrollBottom}
      showOnZeroRecords={<div>Shopping Cart is Empty</div>}
      isSelectable={false}
    />
    <div className="checkout">
      <div className="total-price">Total: {totalPrice}</div>
      <Button
        label="Checkout"
        loading={loading}
        loadingLabel="Processing"
        appStyle={true}
        disabled={list.length > 0 ? false : true}
      />
    </div>
    {error && <div className="checkout-error error">{error}</div>}
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