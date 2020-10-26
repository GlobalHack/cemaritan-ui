import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useMappings } from "../../hooks";
import Page from "./page/Page";

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
    dataField: "start_format",
    text: "Start Format",
    sort: false,
  },
  {
    dataField: "end_format",
    text: "End Format",
    sort: false,
  },
  {
    dataField: "num_of_transfers",
    text: "# of Transfers",
    sort: false,
  },
];

export const ViewDataMappings = () => {
  const { mappings, fetching, error } = useMappings();

  return (
    <Page title="Data Mappings">
      {error && <p>{error}</p>}
      {!mappings && fetching && <p>loading...</p>}
      {mappings && (
        <BootstrapTable
          bootstrap4
          keyField="uid"
          data={mappings}
          columns={columns}
        />
      )}
    </Page>
  );
};
