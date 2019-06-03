import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom'

import CreateTransfer from "./CreateTransfer";
import EditTransfer from "./EditTransfer";
import ViewTransfers from "./ViewTransfers";
import UploadTransfer from "./UploadTransfer";

function Router(props) {
  const { path } = props.match

  return (
    <Switch>
      <Route path={`${path}/create`} exact component={CreateTransfer} />
      <Route path={`${path}/edit/:transferId`} exact component={EditTransfer} />
      <Route path={`${path}/view`} exact component={ViewTransfers} />
      <Route path={`${path}/upload`} exact component={UploadTransfer} />
      <Route path="*" render={() => <Redirect to={`${path}/view`} />} />
    </Switch>
  );
}

export default withRouter(Router);
