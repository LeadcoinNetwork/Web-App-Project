import { configure } from "@storybook/react";
import "../src/styles/global.scss";

var name = "";
const req = require.context("../src/", true, /.stories.js/);
console.log(0);
console.log(req);
console.log("here on webpack!");
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
