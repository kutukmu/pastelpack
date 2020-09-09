import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./Reducers";
import Cookie from "js-cookie";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import history from "./history";
import "./index.scss";

const user = Cookie.getJSON("userInfo") || {};
const address = Cookie.getJSON("userAddress") || {};
const gsapanimation = Cookie.getJSON("gsapAnimation") || {};
const payment = Cookie.getJSON("payment") || {};
const initialState = {
  signInUser: { ...user },
  userAddress: { ...address },
  payment: { payment },
  gsapAnimation: { ...gsapanimation },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.querySelector("#root")
);
