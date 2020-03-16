import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { leads, favorites } from "../../actions"
import LeadsTemplate from "Containers/LeadsTemplate"
import Select from "Components/Select"
import TextField from "Components/TextField"
import Button from "Components/Button"
import t from "../../utils/translate/translate"
import { toast } from "react-toastify"
import displayLead from "../../actions/displayLead"
import DisplayLead from "../DisplayLead"
import Checkbox from "../../components/Checkbox"

class BuyLeads extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDisplayingLead: false,
      favorites: false,
      selectedLeads: [],
    }
  }

  buyLeads = () => {
    const { metamask } = this.props

    if (metamask.isActive) {
      this.props.push("/shopping-cart")
    } else {
      toast(
        t(
          "To buy leads you need to install Metamask for your browser. Please follow your browser’s support for MetaMask (such as Chrome)",
        ),
        {
          type: "error",
          closeOnClick: true,
          autoClose: true,
        },
      )
    }
  }

  buyLead = id => {
    const { metamask } = this.props
    if (metamask.isActive) {
      let selected = new Set(this.props.leads.selected)
      selected.add(id)
      this.props.setSelectedLeads(selected)
      this.buyLeads()
    } else {
      toast(
        t(
          "To buy leads you need to install Metamask for your browser. Please follow your browser’s support for MetaMask (such as Chrome)",
        ),
        {
          type: "error",
          closeOnClick: true,
          autoClose: false,
        },
      )
    }
  }

  buildButtonLabel = () => {
    let amount = this.props.leads.selected.size

    if (amount > 1) {
      return t("buy ") + amount + t(" leads")
    } else if (amount === 1) {
      return t("buy lead")
    } else {
      return t("buy leads")
    }
  }
  getListButtons = () => {
    return [
      {
        value: this.buildButtonLabel(),
        onClick: this.buyLeads,
      },
      {
        value: t("Add to Favorites"),
        onClick: this.addToFavorites,
      },
      {
        value: t("Remove from Favorites"),
        onClick: this.removeFromFavorites,
      },
    ]
  }

  addToFavorites = () => {
    this.props.favoritesAddStart()
  }

  removeFromFavorites = () => {
    this.props.favoritesRemoveStart()
  }

  getLeadButtons = () => {
    return [
      {
        value: t("buy"),
        onClick: this.buyLead,
      },
      {
        value: t("Add to favorites"),
        onClick: this.addToFavorites,
      },
      {
        value: t("Remove from favorites"),
        onClick: this.removeFromFavorites,
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

  toggleFavorites = value => {
    const filter = this.props.leads.filter
    this.props.handleFilter({
      ...filter,
      favorites: !!value,
    })
    this.setState((prev, props) => {
      return { favorites: !!value }
    })
  }

  render() {
    const isDisplayingLead = this.state ? this.state.isDisplayingLead : false

    return (
      // do not change classnames, it's connected to the manual
      <>
        {isDisplayingLead && (
          <DisplayLead
            noheader
            pageName="buy"
            backFunction={() => {
              this.setState({ isDisplayingLead: false })
            }}
          />
        )}
        {!isDisplayingLead && (
          <section className="buy_leads">
            <h1>{t("Buy Leads")}</h1>
            <h3>{t("Purchase hot leads for your business.")}</h3>
            <div className="bl-filters">
              <Select
                className="industry"
                value={this.props.leads.filter.industry}
                onChange={e => {
                  const filter = this.props.leads.filter
                  this.props.handleFilter({
                    ...filter,
                    industry: e.target.value,
                  })
                }}
              >
                <option value="All">{t("Choose your industry")}</option>
                <option value="Website building">
                  {t("Website building")}
                </option>
                <option value="Real Estate" disabled>
                  {t("Real Estate")}
                </option>
                <option value="Crypto" disabled>
                  {t("Crypto")}
                </option>
                <option value="Insurance" disabled>
                  {t("Insurance")}
                </option>
                <option value="Loans" disabled>
                  {t("Loans")}
                </option>
              </Select>
              <TextField
                appStyle
                className="search_bar"
                placeholder={t("Search...")}
                value={this.props.leads.filter.search}
                onChange={e => {
                  const filter = this.props.leads.filter
                  this.props.handleFilter({
                    ...filter,
                    search: e.target.value,
                  })
                }}
              />
              <div className="buy_leads-favorites">
                <Checkbox
                  label={t("Favorites")}
                  name="farovites"
                  id="favoritest_checkbox"
                  checked={this.state.favorites}
                  onClick={e => {
                    this.toggleFavorites(e.target.checked)
                  }}
                />
              </div>
              <Button
                className="search"
                onClick={() => {
                  this.props.clearList()
                  this.props.searchClicked()
                  this.props.fetchLeads()
                }}
                appStyle={true}
              >
                {t("Search")}
              </Button>
            </div>
            {
              <LeadsTemplate
                {...this.props}
                pageName="buy"
                constantCardOpen={false}
                isSelectable={true}
                getButtons={this.getButtons}
                displayLead={this.displayLead.bind(this)}
              />
            }
          </section>
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.buyLeads,
  metamask: state.metamask,
  fields: state.fields.filter(lead => !lead.private),
})

export default connect(
  mapStateToProps,
  {
    push: push,
    handleFilter: newFilter => leads.filterChange("BUY_LEADS", newFilter),
    fetchLeads: params => leads.fetchLeads("BUY_LEADS", params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("BUY_LEADS", selectedLeads),
    toggelCardView: index => leads.toggelCardView("BUY_LEADS", index),
    searchClicked: () => leads.searchClicked("BUY_LEADS"),
    clearList: () => leads.clearList("BUY_LEADS"),
    displayLead: displayLead.displayLeadGet,
    favoritesAddStart: favorites.favoritesAddStart,
    favoritesRemoveStart: favorites.favoritesRemoveStart,
  },
)(BuyLeads)
