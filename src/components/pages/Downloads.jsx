import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import CModal from "../Modal";

import fetcher from "../../utils/fetcher";
import { useDataFromUserOrg } from "../../hooks/useDataFromUserOrg";

const columns = [
  {
    dataField: "uid",
    text: "UID",
    hidden: true,
  },
  {
    dataField: "expiration_datetime",
    text: "Expiration Date",
    sort: true,
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "transfer_name",
    text: "Transfer Name",
    sort: true,
  },
];

export const Downloads = () => {
  const { data: downloads, error } = useDataFromUserOrg("/downloads");
  const [downloadLink, setDownloadLink] = useState();

  const getDownloadLink = (downloadId) => (e) => {
    e.preventDefault();
    // const downloadId = e.currentTarget.getAttribute("data-download-id");

    // TODO: how to do this... hook? need to get user?
    fetcher(`/downloads/${downloadId}/link`).then((res) => {
      if (res.download_link) {
        setDownloadLink({
          link: res.download_link,
          expiration: res.expiration,
        });
      }
    });
  };

  const clearDownload = () => {
    setDownloadLink(null);
  };

  const downloadColumn = [
    {
      dataField: "uid",
      text: "Download",
      formatter: (cell) => (
        <button onClick={getDownloadLink(cell)}>Download</button>
      ),
    },
  ];
  const downloadColumns = columns.concat(downloadColumn);

  return (
    <div>
      <CModal
        show={Boolean(downloadLink)}
        onHide={clearDownload}
        title="Start Download"
      >
        <p>
          Click{" "}
          <a
            href={downloadLink && downloadLink.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{" "}
          to start your file download.
        </p>
        <p>{`This link will expire in ${
          downloadLink && downloadLink.expiration
        } seconds.`}</p>
      </CModal>

      <h1>Downloads</h1>
      {error && <p>{error}</p>}
      {!downloads && <p>loading...</p>}
      {downloads && (
        <BootstrapTable
          bootstrap4
          keyField="uid"
          data={downloads}
          columns={downloadColumns}
        />
      )}
    </div>
  );
};
