import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

import Page from "./page/Page";
import { useHistory } from "../../hooks";
import { formatDatetime } from "../../utils/tableFormatters";

const columns = [
  {
    dataField: "datetime",
    text: "Date",
    sort: true,
    formatter: formatDatetime,
  },
  {
    dataField: "type",
    text: "Type",
    sort: true,
  },
  {
    dataField: "action",
    text: "Action",
    sort: true,
  },
  {
    dataField: "name",
    text: "Name",
    sort: false,
  },
];

export const History = () => {
  const { history, fetching, error } = useHistory();

  return (
    <Page title="History">
      {error && <p>{error}</p>}
      {!history && fetching && <p>loading...</p>}
      {history && (
        <BootstrapTable
          bootstrap4
          keyField="uid"
          data={history}
          columns={columns}
        />
      )}
    </Page>
  );
};
