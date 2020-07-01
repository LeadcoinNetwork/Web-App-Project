import React from "react"
import { Admin, Resource } from "react-admin"

import dataProvider from "./providers/data"
import authProvider from "./providers/auth"

import PersonIcon from "@material-ui/icons/Person"
import AccessibilityIcon from "@material-ui/icons/Accessibility"
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import MoneyIcon from "@material-ui/icons/Money"
import StarHalfIcon from "@material-ui/icons/StarHalf"

import { UserList, UserEdit } from "./components/items/users"
import { LeadList } from "./components/items/leads"
import { TransactionList } from "./components/items/transactions"
import { AuctionList } from "./components/items/auctions"
import { BetList } from "./components/items/bets"
import { ReviewList } from "./components/items/reviews"

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" icon={PersonIcon} list={UserList} edit={UserEdit} />
    <Resource name="leads" icon={AccessibilityIcon} list={LeadList} />
    <Resource
      name="transactions"
      icon={AccountBalanceWalletIcon}
      list={TransactionList}
    />
    <Resource name="auctions" icon={AccountBalanceIcon} list={AuctionList} />
    <Resource name="bets" icon={MoneyIcon} list={BetList} />
    <Resource name="reviews" icon={StarHalfIcon} list={ReviewList} />
  </Admin>
)

export default App
