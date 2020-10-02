import React from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { useTransfers } from "../../../hooks/useTransfers";

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
    dataField: "active",
    text: "Active",
    sort: true,
    formatter: (cell: string) => (cell === "TRUE" ? "Active" : "Inactive"),
  },
  {
    dataField: "source",
    text: "Source",
    sort: true,
  },
  {
    dataField: "source_mapping",
    text: "Source Mapping",
    sort: false,
  },
  {
    dataField: "destination",
    text: "Destination",
    sort: true,
  },
  {
    dataField: "destination_mapping",
    text: "Destination Mapping",
    sort: false,
  },
  {
    dataField: "frequency",
    text: "Frequency",
  },
  {
    dataField: "start_datetime",
    text: "Start Date",
    sort: true,
    formatter: (cell: string) => {
      const startDate = new Date(cell);
      return startDate.toLocaleString();
    },
  },
  {
    dataField: "uid",
    text: "Edit",
    formatter: (cell: number) => (
      <Link to={`/transfers/edit/${cell}`}>Edit</Link>
    ),
  },
];

export const ViewTransfers = () => {
  const { transfers, fetching, error } = useTransfers();

  return (
    <div>
      <h1>Scheduled Transfers</h1>
      {error && <p>{error}</p>}
      {transfers.length === 0 && fetching && <p>loading...</p>}
      {transfers.length > 0 && (
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
