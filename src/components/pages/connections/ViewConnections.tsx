import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useConnections } from "../../../hooks";

import Page from "../page/Page";
import { IPageAction, ActionType } from "../page/types";

const columns = [
  {
    dataField: "uid",
    text: "UID",
    hidden: true,
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "type",
    text: "Type",
    sort: true,
  },
  {
    dataField: "created_datetime",
    text: "Created",
    sort: true,
  },
];

export const ViewConnections = () => {
  const { connections, fetching, error } = useConnections();

  const actions: IPageAction[] = [
    {
      actionType: ActionType.link,
      id: "go-to-create-transfer",
      label: "Create Connection",
      variant: "primary",
      linkTo: "/connections/create",
      disabled: true,
    },
  ];

  return (
    <Page title="Connections" actions={actions}>
      {error && <p>{error}</p>}
      {!connections && fetching && <p>loading...</p>}
      {connections && (
        <BootstrapTable
          bootstrap4
          keyField="uid"
          data={connections}
          columns={columns}
        />
      )}
    </Page>
  );
};
