import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import AppBar from "../components/AppBar";

import Profile from "../components/Profile";
import CreateProduct from "../components/CreateProduct";
import ViewProduct from "../components/ViewProduct";
import Sales from "../components/Sales";

class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AppBar>
            <Route exact path="/" component={Profile} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/products/add" component={CreateProduct} />
            <Route exact path="/products/view" component={ViewProduct} />
            <Route exact path="/sales" component={Sales} />
          </AppBar>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Index;
