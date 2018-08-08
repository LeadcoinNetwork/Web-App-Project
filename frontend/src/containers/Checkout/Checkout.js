import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import Table from "Components/Table"
import Button from "Components/Button"
import t from "../../utils/translate/translate"
import { push } from "react-router-redux"
import { priceString } from "Utils/numbers"

const Checkout = ({ fields, checkout, buyLeads, push, checkoutBuyStart }) => {
  if (!buyLeads.selected.size) {
    push("/buy-leads")
  }

  let selectedLeads = buyLeads.list.filter(lead =>
    buyLeads.selected.has(lead.id),
  )

  const parseLeadPrice = leadPrice => {
    if (!leadPrice) {
      return 0
    } else if (typeof leadPrice === "string") {
      return Math.abs(Number(leadPrice.replace("$", "")))
    } else {
      return leadPrice
    }
  }

  let errorMsg
  if (checkout && checkout.error) {
    errorMsg = "Insufficient Funds"
  }
  return (
    <div className="ldc-checkout">
      <h1>{t("Shopping Cart")}</h1>
      <h3>{t("Buy all of your selected leads now.")}</h3>
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
            (price, lead) => price + parseLeadPrice(lead.lead_price),
            0,
          ),
        )}
      </div>
      {errorMsg && <div className="error">{errorMsg}</div>}
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

export default connect(
  mapStateToProps,
  {
    push,
    checkoutBuyStart: Actions.checkout.checkoutBuyStart,
  },
)(Checkout)
