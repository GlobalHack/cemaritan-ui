import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom'

import CreateTransfer from "./CreateTransfer";
import TransfersHistory from "./TransfersHistory";
import UploadTransfer from "./UploadTransfer";

function Router(props) {
  const { path } = props.match

  return (
    <Switch>
      <Route path={`${path}/create`} exact component={CreateTransfer} />
      <Route path={`${path}/history`} exact component={TransfersHistory} />
      <Route path={`${path}/upload`} exact component={UploadTransfer} />
      <Route path="*" render={() => <Redirect to={`${path}/history`} />} />
    </Switch>
  );
}

export default withRouter(Router);
