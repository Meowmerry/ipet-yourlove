import React, { Component } from "react";
import * as allRoutes from "./index";
import rolesConfig from "../../config/roles";
import { Route, withRouter, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

class PrivateRoutes extends Component {
  state = {
    allowedRoutes: [],
    redirectRoutes: []
  };

  componentDidMount() {
    let role = this.props.role;
    console.log("wtf", role);
    if (role) {
      this.setState({
        allowedRoutes: rolesConfig[role].routes,
        redirectRoutes: rolesConfig[role].redirect
      });
      console.log("this is allow", this.state.allowedRoutes)
    } else {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div>
        <Switch>
          {this.state.allowedRoutes &&
            this.state.allowedRoutes.map(route => (
              <Route
                exact
                path={route.url}
                component={allRoutes[route.component]}
                key={route.url}
              />
            ))}
          {this.state.redirectRoutes &&
            this.state.redirectRoutes.map(url => <Redirect to={url} />)}
        </Switch>
      </div>
    );
  }
}

export default withRouter(PrivateRoutes);
