import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import AppBar from "../components/AppBar";

import Profile from "../components/Profile";
import CreateProduct from "../components/CreateProduct";
import ViewProduct from "../components/ViewProduct";

class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AppBar>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/products/add" component={CreateProduct} />
            <Route exact path="/products/view" component={ViewProduct}/>
          </AppBar>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Index;
