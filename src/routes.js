// @flow
import React from "react";
import Home from "./Components/home";
import BidInfo from "./Components/bidInfo";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/home/:id" component={BidInfo} />
        </>
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
