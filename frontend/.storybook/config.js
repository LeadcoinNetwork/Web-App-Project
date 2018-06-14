import { configure } from "@storybook/react"
import "../src/styles/global.scss"
import { configure as enconf } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

const req = require.context("../src/", true, /.stories.js/)

enconf({ adapter: new Adapter() })

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
