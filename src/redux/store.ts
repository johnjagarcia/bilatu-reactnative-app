import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import cartReducer from "./modules/cart";
import authReducer from "./modules/auth";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
