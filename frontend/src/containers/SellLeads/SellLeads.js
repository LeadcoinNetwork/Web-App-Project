import React from "react"
import { connect } from "react-redux"
import Table from "Components/Table"
import { leads } from "../../actions"
import { Link } from "react-router-dom"
import t from "../../utils/translate/translate"

class SellLeads extends React.Component {
  constructor(props) {
    super(props)

    leads.getLeads(props.dispatch)
  }
  sellLeads = () => {
    console.log(Array.from(this.props.leads.selected))
  }
  sellLead = id => {
    console.log([id])
  }
  onScrollBottom = cb => {
    let { dispatch, leads } = this.props

    getLeads(dispatch, cb, leads.page + 1)
  }
  buildButtonLabel = amount => {
    if (amount > 1) {
      return t("sell ") + amount + t(" leads")
    } else if (amount === 1) {
      return t("sell lead")
    } else {
      return t("sell leads")
    }
  }
  getButtons = amountSelected => {
    return {
      table: [
        {
          value: this.buildButtonLabel(amountSelected),
          onClick: this.sellLeads,
          actionPerSelected: true,
        },
      ],
      record: [
        {
          value: t("sell"),
          onClick: this.sellLead,
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
        <Link to="/add-lead">{t("Boom")}</Link>
        <h1>{t("Sell Leads")}</h1>
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
  leads: state.sellLeads,
  fields: state.fields,
})

export default connect(mapStateToProps)(SellLeads)
