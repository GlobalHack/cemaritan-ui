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

const DataMappings = () => {
  const { data: mappings, error } = useDataFromUserOrg("/mappings");

  return (
    <div>
      <h1>View Data Mappings</h1>
      {error && <p>{error}</p>}
      {!mappings && <p>loading...</p>}
      {mappings && (
        <BootstrapTable
          bootstrap4
          keyField="uid"
          data={mappings}
          columns={columns}
        />
      )}
    </div>
  );
};

export default DataMappings;
