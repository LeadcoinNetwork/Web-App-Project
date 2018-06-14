import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import BalanceWidget from "./"
import { createStoreAndStory } from "storybook-utils/withRouter"
import * as actions from "actions"

storiesOf("Containers/Balance Widget", module)
  .add("balance 0", () => {
    var { store, story } = createStoreAndStory({ component: BalanceWidget })
    store.dispatch(actions.balance.updateUserBalance(0, 0))
    return story
  })

  .add("Balance 10,50", () => {
    var { store, story } = createStoreAndStory({ component: BalanceWidget })
    store.dispatch(actions.balance.updateUserBalance(10, 50))
    return story
  })
