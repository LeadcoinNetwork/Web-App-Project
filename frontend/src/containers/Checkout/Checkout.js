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
  user,
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
      return Math.abs(Number(leadPrice.replace("$", "")))
    } else {
      return leadPrice
    }
  }
  const handleLeadBuy = async ev => {
    try {
      const checkWallet = await metamask.isAddress(user.wallet)
      toaster("Wallet is verified", "success", "top-right")
      const transfer = await metamask.transfer(user.wallet, 10)
      toaster(
        `Tanscation has been send, TxHash ${transfer}`,
        "success",
        "top-right",
      )
      const checkTxHash = await metamask.checkTxHash(transfer)
      toaster(
        `Transaction succeeded, TxHash ${transfer}`,
        "success",
        "top-right",
      )
      checkoutBuyStart()
    } catch (err) {
      toaster(err, "error", "top-right")
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
                    ? priceString(lead.lead_price)
                    : lead[field.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="c-total">
        <span className="text">{t("Total")}:&nbsp;</span>
        {priceString(totalPayment)}
      </div>
      <div className="c-details">
        <table>
          <tbody>
            <tr className="c-balance">
              <td>{t("My Balance:")}</td>
              <td className="amount">{priceString(balance.total)}</td>
            </tr>
            <tr className="c-payment">
              <td>{t("Total Payment:")}</td>
              <td className="amount">{"-" + priceString(totalPayment)}</td>
            </tr>
            <tr className="c-remainder">
              <td>{t("Balance After Checkout:")}</td>
              <td className="amount">
                {priceString(balance.total - totalPayment)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {checkout.error && (
        <div className="error">
          {Object.keys(checkout.error).map((error, index) => (
            <div key={index}>{t(checkout.error[error])}</div>
          ))}
        </div>
      )}
      <div className="button-container">
        <Button
          label={t("Buy")}
          onClick={handleLeadBuy}
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
  user: state.user,
})

export default connect(
  mapStateToProps,
  {
    push,
    checkoutBuyStart: Actions.checkout.checkoutBuyStart,
  },
)(Checkout)
