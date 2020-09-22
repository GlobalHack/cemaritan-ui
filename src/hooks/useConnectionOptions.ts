import { useEffect, useState } from "react";
import axios from "../utils/axios";
import useStoreState from "./useStoreState";
import { Connection } from "../types";

export const useConnectionOptions = (): Connection[] => {
  const { user } = useStoreState();
  const [connectionOptions, setConnectionOptions] = useState([]);

  useEffect(() => {
    let mounted = true;

    function fetchConnections() {
      axios
        .get(`/organizations/${user.organization}/connections`)
        .then((response) => {
          const connections = response.data;
          console.log("FETCHED CONNECTIONS: ", connections);
          if (mounted) {
            setConnectionOptions(connections);
          }
        });
    }
    fetchConnections();

    return () => {
      mounted = false;
    };
  }, [user.organization]);

  return connectionOptions;
};
