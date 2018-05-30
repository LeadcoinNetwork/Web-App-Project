import "Styles/global.scss";

import React from "react";
import ReactDOM from "react-dom";
import App from "Containers/App";

console.log(process.env.a);

ReactDOM.render(<App />, document.getElementById("root"));
