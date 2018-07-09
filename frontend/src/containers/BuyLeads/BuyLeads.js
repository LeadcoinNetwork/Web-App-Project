import React from "react"
import { connect } from "react-redux"
import Table from "Components/Table"
import LeadsResults from "Components/LeadsResults"
import { leads } from "../../actions"
import t from "../../utils/translate/translate"
import Button from "Components/Button"
import RealEstateLead from "Components/RealEstateLead"
import ResultsModeContext from "Containers/App/ResultsModeContext"

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
      return t("buy ") + amount + t(" leads")
    } else if (amount === 1) {
      return t("buy lead")
    } else {
      return t("buy leads")
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
          value: t("buy"),
          onClick: this.buyLead,
        },
      ],
    }
  }
  setSelectedRecords = selectedLeads => {
    this.props.dispatch(leads.setSelectedLeads(selectedLeads))
  }
  render() {
    let { leads, fields } = this.props

    return (
      <ResultsModeContext.Consumer>
        {({ cardsMode, toggleMode }) => (
          <section className="ldc-buy-leads">
            {/* TODO: make reusable */}
            <label
              onClick={toggleMode}
              style={{
                float: "right",
                cursor: "pointer",
                padding: "10px 3px 0 0",
              }}
            >
              Switch to &nbsp; &nbsp;
              <i
                className={`fas fa-${cardsMode ? "table" : "bars"}`}
                style={{ fontSize: "20px", position: "relative", top: "2px" }}
              />
            </label>
            <h1>{t("Buy Leads")}</h1>
            {cardsMode ? (
              <LeadsResults
                leads={leads}
                render={lead => <RealEstateLead key={lead.id} {...lead} />}
              />
            ) : (
              <Table
                fields={fields.map(field => ({
                  ...field,
                  name: t(field.name),
                }))}
                records={leads.list}
                buttons={this.getButtons(leads.selected.size)}
                setSelectedRecords={this.setSelectedRecords}
                onScrollBottom={this.onScrollBottom}
                selected={leads.selected}
                isSelectable={true}
              />
            )}
          </section>
        )}
      </ResultsModeContext.Consumer>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.buyLeads,
  fields: state.fields.filter(lead => !lead.private),
})

export default connect(mapStateToProps)(BuyLeads)
