import React from "react"
import { connect } from "react-redux"
import Table from "Components/Table"
import { leads } from "../../actions"
import t from "Containers/translate"

class BuyLeads extends React.Component {
  constructor(props) {
    super(props)

    leads.getLeads(props.dispatch)
  }
  buyLeads = () => {
    console.log(Array.from(this.props.leads.selected))
  }
  buyLead = id => {
    console.log([id])
  }
  onScrollBottom = cb => {
    let { dispatch, leads } = this.props

    getLeads(dispatch, cb, leads.page + 1)
  }
  buildButtonLabel = amount => {
    if (amount > 1) {
      return "buy " + amount + " leads"
    } else if (amount === 1) {
      return "buy lead"
    } else {
      return "buy leads"
    }
  }
  getButtons = amountSelected => {
    return {
      table: [
        {
          value: this.buildButtonLabel(amountSelected),
          onClick: this.buyLeads,
          actionPerSelected: true,
        },
      ],
      record: [
        {
          value: "buy",
          onClick: this.buyLead,
        },
      ],
    }
  }
  setSelectedRecords = selectedLeads => {
    this.props.dispatch(leads.setSelectedLeads(selectedLeads))
  }
  render() {
    return (
      <>
        <h1>{t("Buy Leads")}</h1>
        <Table
          fields={this.props.fields.map(field => ({
            ...field,
            name: t(field.name),
          }))}
          records={this.props.leads.list}
          buttons={this.getButtons(this.props.leads.selected.size)}
          setSelectedRecords={this.setSelectedRecords}
          onScrollBottom={this.onScrollBottom}
          selected={this.props.leads.selected}
          isSelectable={true}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.buyLeads,
  fields: state.fields.filter(lead => !lead.private),
})

export default connect(mapStateToProps)(BuyLeads)
