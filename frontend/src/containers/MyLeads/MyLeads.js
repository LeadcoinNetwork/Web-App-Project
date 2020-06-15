import React from "react"
import { connect } from "react-redux"
import t from "utils/translate/translate"
import { toast } from "react-toastify"
import LeadsTemplate from "../LeadsTemplate"
import { leads, moveToSell } from "Actions"
import displayLead from "../../actions/displayLead"
import { push } from "react-router-redux"
import DisplayLead from "../DisplayLead"
import ConfirmationDialog from "../../components/ConfirmationDialog"
import Modal from "../../components/Modal"
import AuctionNew from "../../components/AuctionNew"
import { addToAuction } from "../../actions"

class MyLeads extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false,
      isDisplayingLead: false,
      showAuctionForm: false,
    }
  }

  moveLeadsToSell = () => {
    this.props.moveToSell()
  }

  moveLeadToSell = id => {
    let selected = new Set(this.props.leads.selected)
    selected.add(id)
    this.props.setSelectedLeads(selected)
    this.moveLeadsToSell()
  }

  addToAuction = () => {
    console.log("add to auction")
    if (this.props.leads.selected.size > 1) {
      toast(t("You can add only one item to an auction"), {
        type: "error",
        closeOnClick: true,
        autoClose: true,
      })
      return
    }
    this.setState(state => ({
      showAuctionForm: true,
    }))
  }

  exportToExcel = () => {
    let leadIds = new Array()
    this.props.leads.selected.forEach(item => {
      leadIds.push(item)
    })
    let path = "/excel/export?"
    leadIds.forEach((id, index) => {
      if (index < leadIds.length - 1) {
        path += `leadId=${id}&`
      } else {
        path += `leadId=${id}`
      }
    })

    let fakeLink = document.createElement("a")
    fakeLink.setAttribute("href", process.env.BACKEND + path)
    document.body.appendChild(fakeLink)
    fakeLink.click()
    document.body.removeChild(fakeLink)
  }

  buildButtonLabel = () => {
    let amount = this.props.leads.selected.size

    if (amount > 1) {
      return t("move ") + amount + t(" leads to sell")
    } else if (amount === 1) {
      return t("move lead to sell")
    } else {
      return t("move leads to sell")
    }
  }

  getListButtons = () => {
    if (!window.cordova) {
      return [
        {
          value: this.buildButtonLabel(),
          onClick: () => this.setState({ showConfirmation: true }),
        },
        {
          value: t("add to auction"),
          onClick: this.addToAuction,
          enableCount: 1,
        },
        {
          value: t("export to excel"),
          onClick: this.exportToExcel,
        },
      ]
    } else {
      return [
        {
          value: this.buildButtonLabel(),
          onClick: () => this.setState({ showConfirmation: true }),
        },
        {
          value: t("add to auction"),
          onClick: this.addToAuction,
          enableCount: 1,
        },
      ]
    }
  }

  getLeadButtons = () => {
    return [
      {
        value: t("move to sell"),
        onClick: this.moveLeadToSell,
      },
    ]
  }

  getButtons = () => {
    return {
      table: this.getListButtons(),
      record: this.getLeadButtons(),
    }
  }

  displayLead = lead => {
    this.props.displayLead(lead)
    this.setState({ isDisplayingLead: true })
    return
    //this.props.push("/display-lead")
  }

  editLead = lead => {
    this.props.push("/edit-lead-" + lead.id)
    return
  }

  onAddToAuction = data => {
    this.props.addToAuctionStart(data.endDate.getTime())
  }

  checkExcelFile() {
    if (this.props.excelFile) {
      console.log(this.props.excelFile)
    }
  }

  render() {
    const isDisplayingLead = this.state ? this.state.isDisplayingLead : false
    return (
      <>
        <h1>{t("My Leads")}</h1>
        <h3>{t("Manage all of your leads from one dashboard.")}</h3>
        {isDisplayingLead && (
          <DisplayLead
            noheader
            pageName="my"
            backFunction={() => {
              this.setState({ isDisplayingLead: false })
            }}
          />
        )}
        {!isDisplayingLead && (
          <LeadsTemplate
            {...this.props}
            pageName="my"
            constantCardOpen={true}
            isSelectable={true}
            getButtons={this.getButtons}
            editLead={this.editLead.bind(this)}
            displayLead={this.displayLead.bind(this)}
          />
        )}
        {this.state.showConfirmation && (
          <ConfirmationDialog
            description="You are about to move the selected leads to be publicly traded. Are you sure you want to proceed?"
            onConfirm={() => {
              this.setState({ showConfirmation: false })
              this.moveLeadsToSell()
            }}
            onDismiss={() => this.setState({ showConfirmation: false })}
          />
        )}
        <AuctionNew
          isOpen={this.state.showAuctionForm}
          onClose={() => {
            this.setState({ showAuctionForm: false })
          }}
          onOk={data => {
            this.setState({ showAuctionForm: false })
            this.onAddToAuction(data)
          }}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.myLeads,
  fields: state.fieldsMy,
})

export default connect(
  mapStateToProps,
  {
    fetchLeads: (...params) => leads.fetchLeads("MY_LEADS", ...params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("MY_LEADS", selectedLeads),
    toggelCardView: index => leads.toggelCardView("MY_LEADS", index),
    clearList: () => leads.clearList("MY_LEADS"),
    moveToSell: moveToSell.myLeadsMoveToSellBegin,
    displayLead: displayLead.displayLeadGet,
    push,
    addToAuctionStart: addToAuction.addToAuctionStart,
  },
)(MyLeads)
