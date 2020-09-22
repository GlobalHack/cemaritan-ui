import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

import { useDataFromUserOrg } from "../../../hooks/useDataFromUserOrg";

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
  const { data: connections, error } = useDataFromUserOrg("/connections");

  return (
    <div>
      <h1>View Connections</h1>
      {error && <p>{error}</p>}
      {!connections && <p>loading...</p>}
      {connections && (
        <BootstrapTable
          bootstrap4
          keyField="uid"
          data={connections}
          columns={columns}
        />
      )}
    </div>
  );
};
