import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Connections from "../pages/connections";
import DataMappings from "../pages/DataMappings";
import Downloads from "../pages/Downloads";
import History from "../pages/History";
import Login from "../pages/Login";
import Transfers from "../pages/transfers";
import UploadTransfer from "../pages/transfers/UploadTransfer";
import CreateTransfer from "../pages/transfers/CreateTransfer";

function Router() {
  return (
    <Switch>
      <Route path="/connections" component={Connections} />
      <Route path="/data-mappings" component={DataMappings} />
      <Route path="/history" component={History} />
      <Route path="/login" component={Login} />
      <Route path="/transfers" component={Transfers} />
      <Route path="/downloads" component={Downloads} />
      <Route path="/" render={() => <Redirect to="/history" />} />
      <Route path="*" render={() => <Redirect to="/login" />} />
    </Switch>
  );
}

export default Router;
