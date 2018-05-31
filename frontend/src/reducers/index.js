import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import leads from "./leads";

const rootReducer = combineReducers({
  routerReducer,
  leads
});

export default rootReducer;
