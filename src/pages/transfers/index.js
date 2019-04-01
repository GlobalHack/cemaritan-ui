import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import UploadTransfer from "./UploadTransfer";
import CreateTransfer from "./CreateTransfer";

function Router() {
  return (
    <Switch>
      <Route path="/create" component={CreateTransfer} />
      <Route path="/upload" component={UploadTransfer} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
}

export default Router;
