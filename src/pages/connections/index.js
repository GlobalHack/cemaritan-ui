import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom'

import CreateConnection from "./CreateConnection";
import ViewConnection from "./ViewConnection";

function Router(props) {
  const { path } = props.match

  return (
    <Switch>
      <Route path={`${path}/create`} exact component={CreateConnection} />
      <Route path={`${path}/view`} exact component={ViewConnection} />
      <Route path="*" render={() => <Redirect to={`${path}/view`} />} />
    </Switch>
  );
}

export default withRouter(Router);
