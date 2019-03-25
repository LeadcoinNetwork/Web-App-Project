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
import { leads } from "../../actions"

const notActiveFields = [
  "date",
  "industry",
  "contact_person",
  "telephone",
  "email",
]

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLeads: [],
    }
  }

  componentWillMount() {
    this.state.selectedLeads = this.props.buyLeads.list.filter(lead =>
      this.props.buyLeads.selected.has(lead.id),
    )
  }

  removeLead = async id => {
    const selectedLeads = this.state.selectedLeads.filter(
      lead => lead.id !== id,
    )
    await this.setState({
      selectedLeads,
    })

    this.updateSelectedLeads()
  }

  updateSelectedLeads() {
    let selected = new Set()
    this.state.selectedLeads.forEach(lead => selected.add(lead.id))
    this.props.setSelectedLeads(selected)
  }

  parseLeadPrice = leadPrice => {
    if (!leadPrice) {
      return 0
    } else if (typeof leadPrice === "string") {
      return Math.abs(Number(leadPrice.replace("LDC", "")))
    } else {
      return leadPrice
    }
  }

  render() {
    let totalPayment = this.state.selectedLeads.reduce(
      (price, lead) => price + this.parseLeadPrice(lead.lead_price),
      0,
    )

    let shoppingCartFields = this.props.fields.filter(
      field => !notActiveFields.includes(field.key),
    )

    return (
      <div className="ldc-checkout">
        <h1>{t("Shopping Cart")}</h1>
        <h3>{t("Buy all of your selected leads now.")}</h3>
        <div className="table-container">
          <div className="table-wrapper">
            <table className="shopping-cart">
              <thead>
                <tr>
                  {shoppingCartFields.map(field => (
                    <th className={"h-" + field.key} key={field.id}>
                      {t(field.name)}
                    </th>
                  ))}
                  <th>Remove Lead</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selectedLeads.map(lead => (
                  <tr>
                    {shoppingCartFields.map(field => (
                      <td className={"d-" + field.key} key={field.id}>
                        {field.key === "lead_price"
                          ? lead.lead_price + " LDC"
                          : lead[field.key]}
                      </td>
                    ))}
                    <td>
                      <div
                        className="remove-lead-button"
                        onClick={e => {
                          e.stopPropagation()
                          this.removeLead(lead.id)
                        }}
                      >
                        <i className="fas fa-times" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
            onClick={this.props.checkoutBuyStart}
            loading={this.props.checkout.loading}
            loadingLabel={t("Pending")}
            appStyle={true}
            disabled={!this.state.selectedLeads.length}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fields: state.fields,
  checkout: state.checkout,
  buyLeads: state.buyLeads,
  balance: state.balance,
})

export default connect(mapStateToProps, {
  push,
  checkoutBuyStart: Actions.checkout.checkoutBuyStart,
  setSelectedLeads: selectedLeads =>
    leads.setSelectedLeads("BUY_LEADS", selectedLeads),
})(Checkout)
