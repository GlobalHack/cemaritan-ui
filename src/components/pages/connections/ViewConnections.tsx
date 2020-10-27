import React from "react";
import { Alert } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useConnections } from "../../../hooks";
import { formatDatetime } from "../../../utils/tableFormatters";

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
    formatter: formatDatetime,
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
      {error && <Alert variant="danger">{error}</Alert>}
      {!connections && fetching && <p>loading...</p>}
      {connections && connections.length > 0 && (
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
