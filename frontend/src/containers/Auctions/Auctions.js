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
import Bet from "../../components/Bet"

class Auctions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDisplayingLead: false,
      showMakeBet: false,
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
        "To buy leads you need to installfe Metamask for your browser. Please follow your browser’s support for MetaMask (such as Chrome)",
        {
          type: "error",
          closeOnClick: true,
          autoClose: true,
        },
      )
    }
  }

  makeBet = bet => {
    console.log("bet auction", bet)
  }

  showBet = () => {
    this.setState({ showMakeBet: true })
  }

  betAuction = id => {
    const { metamask } = this.props
    if (metamask.isActive) {
      let selected = new Set(this.props.leads.selected)
      selected.add(id)
      this.props.setSelectedLeads(selected)
      this.makeBet()
    } else {
      toast(
        "To buy leads you need install Metamask for your browser. Please follow your browser’s support for MetaMask (such as Chrome)",
        {
          type: "error",
          closeOnClick: true,
          autoClose: false,
        },
      )
    }
  }

  getListButtons = () => {
    return [
      {
        value: t("Bet"),
        onClick: this.showBet,
        enableCount: 1,
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
    console.log("test favorites")
    this.props.favoritesAddStart()
  }

  removeFromFavorites = () => {
    console.log("test remove favorites")
    this.props.favoritesRemoveStart()
  }

  getLeadButtons = () => {
    return [
      {
        value: t("Bet"),
        onClick: this.showBet,
        enableCount: 1,
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

  getButtons = () => {
    return {
      table: this.getListButtons(),
      record: this.getLeadButtons(),
    }
  }

  displayLead = lead => {
    this.props.displayLead(lead)
    this.setState({ isDisplayingLead: true })
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

  getCurrentSelectedLeadAuctionPrice = () => {
    if (this.props.leads && this.props.leads.selected.size) {
      let lead = this.props.leads.list.find(lead =>
        this.props.leads.selected.has(lead.id),
      )
      return (lead && lead.lead_price) || 0.0
    }
    return 0.0
  }

  getCurrentSelectedLead() {
    if (this.props.leads && this.props.leads.selected.size)
      return this.props.leads.list.find(lead =>
        this.props.leads.selected.has(lead.id),
      )
  }

  render() {
    const isDisplayingLead = this.state ? this.state.isDisplayingLead : false

    return (
      // do not change classnames, it's connected to the manual
      <>
        {isDisplayingLead && (
          <DisplayLead
            noheader
            backFunction={() => {
              this.setState({ isDisplayingLead: false })
            }}
          />
        )}
        {!isDisplayingLead && (
          <section className="auctions">
            <h1>{t("Auction")}</h1>
            <h3>{t("auction management")}</h3>
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
              <div className="auctions-favorites">
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
                pageName="auction"
                constantCardOpen={false}
                isSelectable={true}
                getButtons={this.getButtons}
                displayLead={this.displayLead.bind(this)}
              />
            }
          </section>
        )}
        {this.state.showMakeBet && (
          <Bet
            lead={this.getCurrentSelectedLead()}
            isOpen={this.state.showMakeBet}
            onClose={() => {
              this.setState({ showMakeBet: false })
            }}
            value={this.getCurrentSelectedLeadAuctionPrice()}
            onSuccess={this.makeBet}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.auctionLeads,
  metamask: state.metamask,
  fields: state.fields.filter(lead => !lead.private),
})

export default connect(
  mapStateToProps,
  {
    push: push,
    handleFilter: newFilter => leads.filterChange("AUCTION_LEADS", newFilter),
    fetchLeads: params => leads.fetchLeads("AUCTION_LEADS", params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("AUCTION_LEADS", selectedLeads),
    toggelCardView: index => leads.toggelCardView("AUCTION_LEADS", index),
    searchClicked: () => leads.searchClicked("AUCTION_LEADS"),
    clearList: () => leads.clearList("AUCTION_LEADS"),
    displayLead: displayLead.displayLeadGet,
    favoritesAddStart: favorites.favoritesAddStart,
    favoritesRemoveStart: favorites.favoritesRemoveStart,
  },
)(Auctions)
