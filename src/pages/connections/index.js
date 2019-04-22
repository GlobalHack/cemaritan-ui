import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom'

import CreateConnection from "./CreateConnection";
import ViewConnections from "./ViewConnections";
import ViewDataMappings from "./ViewDataMappings";

function Router(props) {
  const { path } = props.match

  return (
    <Switch>
      <Route path={`${path}/create`} exact component={CreateConnection} />
      <Route path={`${path}/view`} exact component={ViewConnections} />
      <Route path={`${path}/data-mappings`} exact component={ViewDataMappings} />
      <Route path="*" render={() => <Redirect to={`${path}/view`} />} />
    </Switch>
  );
}

export default withRouter(Router);
