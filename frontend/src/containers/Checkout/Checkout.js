import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import Table from "Components/Table"
import Button from "Components/Button"
import t from "../../utils/translate/translate"
import { push } from "react-router-redux"
import { priceString } from "Utils/numbers"
import { metamask } from "../../utils/metamask-service"
import { toast } from "react-toastify"

const Checkout = ({
  fields,
  checkout,
  buyLeads,
  balance,
  push,
  checkoutBuyStart,
}) => {
  if (!buyLeads.selected.size) {
    // push("/buy-leads")
  }

  let selectedLeads = buyLeads.list.filter(lead =>
    buyLeads.selected.has(lead.id),
  )

  const toaster = (content, type, position) =>
    toast(content, {
      type,
      position,
      closeOnClick: true,
    })

  const parseLeadPrice = leadPrice => {
    if (!leadPrice) {
      return 0
    } else if (typeof leadPrice === "string") {
      return Math.abs(Number(leadPrice.replace("LDC", "")))
    } else {
      return leadPrice
    }
  }

  const totalPayment = selectedLeads.reduce(
    (price, lead) => price + parseLeadPrice(lead.lead_price),
    0,
  )
  const shoppingCartFields = fields.filter(
    field => field.key === "comments" || field.key === "lead_price",
  )
  return (
    <div className="ldc-checkout">
      <h1>{t("Shopping Cart")}</h1>
      <h3>{t("Buy all of your selected leads now.")}</h3>
      <table className="shopping-cart">
        <thead>
          <tr>
            {shoppingCartFields.map(field => (
              <th className={"h-" + field.key}>{t(field.name)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedLeads.map(lead => (
            <tr>
              {shoppingCartFields.map(field => (
                <td className={"d-" + field.key}>
                  {field.key === "lead_price"
                    ? lead.lead_price + " LDC"
                    : lead[field.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="c-details">
        <table>
          <tbody>
            <tr className="c-payment">
              <td>{t("Total Payment:")}</td>
              <td className="amount">{totalPayment + " LDC"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <Button
          label={t("Buy")}
          onClick={checkoutBuyStart}
          loading={checkout.loading}
          loadingLabel={t("Processing")}
          appStyle={true}
          disabled={!buyLeads.selected.size}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  fields: state.fields,
  checkout: state.checkout,
  buyLeads: state.buyLeads,
  balance: state.balance,
})

export default connect(
  mapStateToProps,
  {
    push,
    checkoutBuyStart: Actions.checkout.checkoutBuyStart,
  },
)(Checkout)
