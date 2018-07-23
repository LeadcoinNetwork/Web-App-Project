import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import Table from "../../components/Table"
import Button from "../../components/Button"
import t from "../../utils/translate/translate"
import { push } from "react-router-redux"
import { priceString } from "../../utils/numbers"

const Checkout = ({ fields, checkout, buyLeads, push, checkoutBuyStart }) => {
  if (!buyLeads.selected.size) {
    push("/buy-leads")
  }

  let selectedLeads = buyLeads.list.filter(lead =>
    buyLeads.selected.has(lead.id),
  )

  return (
    <div className="ldc-checkout">
      <h1>{t("Checkout")}</h1>

      <Table
        fields={fields.map(field => ({
          ...field,
          name: t(field.name),
        }))}
        records={selectedLeads}
        isSelectable={false}
      />

      <div className="c-total">
        {t("Total")}:{" "}
        {priceString(
          selectedLeads.reduce(
            (price, lead) => price + Math.abs(lead.price),
            0,
          ),
        )}
      </div>

      <Button
        label={t("Buy")}
        onClick={checkoutBuyStart}
        loading={checkout.loading}
        loadingLabel={t("Processing")}
        appStyle={true}
        disabled={!buyLeads.selected.size}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  fields: state.fields,
  checkout: state.checkout,
  buyLeads: state.buyLeads,
})

export default connect(mapStateToProps, {
  push,
  checkoutBuyStart: Actions.checkout.checkoutBuyStart,
})(Checkout)
