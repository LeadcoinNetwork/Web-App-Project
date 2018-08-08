import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { leads } from "Actions"
import LeadsTemplate from "Containers/LeadsTemplate"
import t from "../../utils/translate/translate"

class SellLeads extends React.Component {
  sellLeads = () => {
    console.log(Array.from(this.props.leads.selected))
  }
  sellLead = id => {
    console.log([id])
  }
  buildButtonLabel = () => {
    let amount = this.props.leads.selected.size

    if (amount > 1) {
      return t("sell ") + amount + t(" leads")
    } else if (amount === 1) {
      return t("sell lead")
    } else {
      return t("sell leads")
    }
  }
  getListButtons = () => {
    return [
      {
        value: this.buildButtonLabel(),
        onClick: this.buyLeads,
        actionPerSelected: true,
      },
    ]
  }
  getLeadButtons = () => {
    return [
      {
        value: t("sell"),
        onClick: this.buyLead,
      },
    ]
  }
  getButtons = amountSelected => {
    return {
      table: this.getListButtons(),
      record: this.getLeadButtons(),
    }
  }
  setSelectedRecords = selectedLeads => {
    this.props.dispatch(leads.setSelectedLeads(selectedLeads))
  }
  render() {
    return (
      <>
        <div style={{ float: "left" }}>
          <h1>{t("Sell Leads")}</h1>
        </div>
        <div style={{ float: "right" }}>
          <div className="upload-links">
            <Link to="/csv-upload" className="csv-upload no-underline">
              {t("Upload CSV File")}
            </Link>
            <Link to="/add-lead" className="add-lead no-underline">
              {t("Create New Lead")}
            </Link>
          </div>
        </div>
        <br style={{ clear: "both" }} />
        <h3>
          {t("Earn money by selling your unused leads to other professionals.")}
        </h3>
        <LeadsTemplate
          {...this.props}
          pageName="sell"
          // getButtons={this.getButtons}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.sellLeads,
  fields: state.fields,
})

export default connect(
  mapStateToProps,
  {
    fetchLeads: (...params) => leads.fetchLeads("SELL_LEADS", ...params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("SELL_LEADS", selectedLeads),
  },
)(SellLeads)
