import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useDataByUser } from "../../utils/fetcher";

const columns = [
  {
    dataField: "uid",
    text: "UID",
    hidden: true
  },
  {
    dataField: "name",
    text: "Name",
    sort: true
  },
  {
    dataField: "active",
    text: "Active",
    sort: true,
    formatter: cell => (cell ? "Active" : "Inactive")
  },
  {
    dataField: "source",
    text: "Source",
    sort: true
  },
  {
    dataField: "source_mapping",
    text: "Source Mapping",
    sort: false
  },
  {
    dataField: "destination",
    text: "Destination",
    sort: true
  },
  {
    dataField: "destination_mapping",
    text: "Destination Mapping",
    sort: false
  },
  {
    dataField: "frequency",
    text: "Frequency"
  },
  {
    dataField: "start_datetime",
    text: "Start Date",
    sort: true
  },
  {
    dataField: "uid",
    text: "Edit",
    formatter: cell => <a href={`edit/${cell}`}>Edit</a>
  }
];

const ViewTransfers = () => {
  const { data: transfers, error } = useDataByUser("/transfers");

  return (
    <div>
      <h1>Scheduled Transfers</h1>
      {error && <p>{error}</p>}
      {!transfers && <p>loading...</p>}
      {transfers && (
        <BootstrapTable
          bootstrap4
          keyField="uid"
          data={transfers}
          columns={columns}
        />
      )}
    </div>
  );
};

export default ViewTransfers;
