import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import AppBar from "../components/AppBar";

class Index extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <AppBar>
                        {/*<Route exact path="/" component={}/>*/}
                    </AppBar>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Index;
