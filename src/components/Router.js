import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Connections from "../pages/connections";
import Downloads from "../pages/Downloads";
import History from "../pages/History";
import Login from "../pages/Login";
import Transfers from "../pages/transfers";

function Router({ isAuthenticated, handleAuthentication }) {
  return !isAuthenticated
    ? ( // non authenticated requests can only get to login page
      <Switch>
        <Route path="/login" render={() => <Login isAuthenticated={isAuthenticated} handleAuthentication={handleAuthentication} />} />
        <Route path="*" render={() => <Redirect to="/login" />} />
      </Switch>
    ) : (
      <Switch>
        {/*TODO remove this login path*/}
        <Route path="/login" render={() => <Login isAuthenticated={isAuthenticated} handleAuthentication={handleAuthentication} />} />
        <Route path="/connections" component={Connections} />
        <Route path="/history" component={History} />
        <Route path="/transfers" component={Transfers} />
        <Route path="/downloads" component={Downloads} />
        <Route path="/" render={() => <Redirect to="/history" />} />
        <Route path="*" render={() => <Redirect to="/history" />} />
      </Switch>
    )
}

export default Router;
