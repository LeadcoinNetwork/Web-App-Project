import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import BalanceWidget from "./"

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

createStoryInDesignDecoration("BalanceWidget")
  .add("balance 0", () => (
    <BalanceWidget
      balance={{
        total: "$0.00",
        escrow: "$0.00",
      }}
      withdrawBalance={() => alert("withdraw balance clicked")}
    />
  ))
  .add("balance 15", () => (
    <BalanceWidget
      balance={{
        total: "$15.00",
        escrow: "$5.00",
      }}
      withdrawBalance={() => alert("withdraw balance clicked")}
    />
  ))
