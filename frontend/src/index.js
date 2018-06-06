import "Styles/global.scss";

import React from "react";
import ReactDOM from "react-dom";
import Root from "Containers/Root";
import { Provider } from "react-redux";
import { routerMiddleware, ConnectedRouter } from "react-router-redux";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";

const history = createBrowserHistory();
const ROUTER_MIDDLEWARE = routerMiddleware(history);
const store = createStore(
  rootReducer,
  applyMiddleware(ROUTER_MIDDLEWARE),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
