import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

import { useDataFromUserOrg } from "../hooks/useDataFromUserOrg";

const columns = [
  {
    dataField: "datetime",
    text: "Date",
    sort: true
  },
  {
    dataField: "type",
    text: "Type",
    sort: true
  },
  {
    dataField: "action",
    text: "Action",
    sort: true
  }
];

const History = () => {
  const { data: histories, error } = useDataFromUserOrg("/histories");

  return (
    <div>
      <h1>History</h1>
      {error && <p>{error}</p>}
      {!histories && <p>loading...</p>}
      {histories && (
        <BootstrapTable
          bootstrap4
          keyField="uid"
          data={histories}
          columns={columns}
        />
      )}
    </div>
  );
};

export default History;
