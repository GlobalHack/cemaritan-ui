import React from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";

import Page from "../page/Page";
import { ActionType, IPageAction } from "../page/types";
import { useTransfers } from "../../../hooks/useTransfers";
import { formatDatetime } from "../../../utils/tableFormatters";

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
    formatter: formatDatetime,
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

  const actions: IPageAction[] = [
    {
      actionType: ActionType.link,
      id: "go-to-create-transfer",
      label: "Create Transfer",
      variant: "primary",
      linkTo: "/transfers/create",
    },
    {
      actionType: ActionType.link,
      id: "go-to-upload-transfer",
      label: "Upload Transfer",
      variant: "outline-primary",
      linkTo: "/transfers/upload",
    },
  ];

  return (
    <Page title="Scheduled Transfers" actions={actions}>
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
    </Page>
  );
};
