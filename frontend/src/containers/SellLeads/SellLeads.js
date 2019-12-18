import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { leads } from "Actions"
import LeadsTemplate from "Containers/LeadsTemplate"
import t from "../../utils/translate/translate"
import displayLead from "../../actions/displayLead"
import DisplayLead from "../DisplayLead"

class SellLeads extends React.Component {
  constructor() {
    super()
    this.state = {
      isDisplayLead: false,
    }
  }

  sellLeads = () => {
    console.log(Array.from(this.props.leads.selected))
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

  getButtons = () => {
    return {
      table: this.getListButtons(),
      record: this.getLeadButtons(),
    }
  }

  setSelectedRecords = selectedLeads => {
    this.props.dispatch(leads.setSelectedLeads(selectedLeads))
  }

  displayLead = lead => {
    this.props.displayLead(lead)
    this.setState({ isDisplayLead: true })
    //this.props.push("/display-lead")
  }

  render() {
    const { displayLead } = this.props
    return (
      <>
        {this.state.isDisplayLead && (
          <DisplayLead
            noheader
            isShowReview={false}
            backFunction={() => {
              this.setState({ isDisplayLead: false })
            }}
          />
        )}
        {!this.state.isDisplayLead && (
          <div>
            <div style={{ float: "left" }}>
              <h1>{t("Sell Leads")}</h1>
            </div>
            <div style={{ float: "right" }}>
              <div className="upload-links">
                <Link
                  to={{
                    pathname: "/csv-upload",
                    isSalesforce: true,
                  }}
                  params="sal"
                  className="csv-upload no-underline"
                >
                  {t("Salesforce Import")}
                </Link>

                <Link to="/csv-upload" className="csv-upload no-underline">
                  {t("Upload CSV File")}
                </Link>
                <Link to="/add-lead" className="add-lead no-underline">
                  {t("Upload a Single Lead")}
                </Link>
              </div>
            </div>
            <br style={{ clear: "both" }} />
            <h3>
              {t(
                "Earn money by selling your unused leads to other professionals.",
              )}
            </h3>
            <LeadsTemplate
              {...this.props}
              pageName="sell"
              constantCardOpen={true}
              isSelectable={false}
              displayLead={this.displayLead.bind(this)}
            />
          </div>
        )}
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
    clearList: () => leads.clearList("SELL_LEADS"),
    toggelCardView: index => leads.toggelCardView("SELL_LEADS", index),
    displayLead: displayLead.displayLeadGet,
  },
)(SellLeads)
