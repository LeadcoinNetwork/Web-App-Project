import "Styles/global.scss";

import React from "react";
import ReactDOM from "react-dom";
import App from "Containers/App";
import { Provider } from "react-redux";
import { routerMiddleware, ConnectedRouter } from "react-router-redux";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";

const history = createBrowserHistory();
const ROUTER_MIDDLEWARE = routerMiddleware(history);
const store = createStore(rootReducer, applyMiddleware(ROUTER_MIDDLEWARE));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
