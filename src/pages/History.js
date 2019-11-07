import React, { useContext, useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";

import { UserContext } from "../context/UserContext";
import { fetchByOrg } from "../utils/fetcher";

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
  const { user } = useContext(UserContext);
  const [histories, setHistories] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (user) {
      setError();
      fetchByOrg("/histories", user)
        .then(data => {
          setHistories(data);
        })
        .catch(() => {
          setError("Failed to fetch history");
        });
    }
  }, [user]);

  return (
    <div>
      <h1>History</h1>
      {error && <p>{error}</p>}
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
