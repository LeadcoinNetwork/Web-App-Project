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
import { format } from "../../utils/time"

const notActiveFields = [
  "date",
  "industry",
  "contact_person",
  "telephone",
  "email",
]

class CheckoutAuction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLeads: [],
    }
  }

  componentWillMount() {
    this.state.selectedLeads = this.props.auctionLeads.list.filter(lead =>
      this.props.auctionLeads.selected.has(lead.id),
    )
  }

  renderField = (field, lead) => {
    switch (field.key) {
      case "lead_price":
        return lead.lead_price + " LDC"
      case "startDate":
        return format(lead[field.key])
      case "endDate":
        return format(lead[field.key])
      default:
        return lead[field.key]
    }
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
      (price, lead) => price + this.parseLeadPrice(lead.maxBet),
      0,
    )

    let shoppingCartFields = this.props.fields.filter(
      field => !notActiveFields.includes(field.key),
    )

    return (
      <div className="ldc-checkout-auction">
        <h1>{t("Shopping Cart")}</h1>
        <h3>{t("Buy all of your selected leads now.")}</h3>
        <div className="table-container">
          <div className="table-wrapper">
            <table className="shopping-cart">
              <thead>
                <tr>
                  {shoppingCartFields.map((field, index) => (
                    <th className={"h-" + field.key} key={index}>
                      {t(field.name)}
                    </th>
                  ))}
                  <th>Remove Lead</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selectedLeads.map(lead => (
                  <tr>
                    {shoppingCartFields.map((field, index) => (
                      <td className={"d-" + field.key} key={index}>
                        {this.renderField(field, lead)}
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
            onClick={this.props.checkoutAuctionBuyStart}
            loading={this.props.checkoutAuction.loading}
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
  fields: state.fieldsAuction,
  checkoutAuction: state.checkoutAuction,
  auctionLeads: state.auctionLeads,
  balance: state.balance,
})

export default connect(
  mapStateToProps,
  {
    push,
    checkoutAuctionBuyStart: Actions.checkoutAuction.checkoutAuctionBuyStart,
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("AUCTION_LEADS", selectedLeads),
  },
)(CheckoutAuction)
