import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  CreateConnection,
  ViewDataMappings,
  ViewConnections,
  CreateTransfer,
  EditTransfer,
  ViewTransfers,
  UploadTransfer,
  History,
  Downloads,
  Login,
} from "./pages";

import useStoreState from "../hooks/useStoreState";

function Router() {
  const { user } = useStoreState();

  return !user ? (
    // non authenticated requests can only get to login page
    <Switch>
      <Route path="/login" render={() => <Login />} />
      <Route path="*" render={() => <Redirect to="/login" />} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/connections/create" exact component={CreateConnection} />
      <Route path="/connections" exact component={ViewConnections} />
      <Route path="/data-mappings" exact component={ViewDataMappings} />

      <Route path="/transfers/create" exact component={CreateTransfer} />
      <Route path="/transfers/edit/:transferId" component={EditTransfer} />
      <Route path="/transfers/upload" exact component={UploadTransfer} />
      <Route path="/transfers" exact component={ViewTransfers} />
      <Route path="/downloads" component={Downloads} />
      <Route path="/history" component={History} />
      <Route path="/" render={() => <Redirect to="/transfers" />} />
      <Route path="*" render={() => <Redirect to="/transfers" />} />
    </Switch>
  );
}

export default Router;
