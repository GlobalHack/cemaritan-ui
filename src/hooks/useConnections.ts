import { useEffect, useState } from "react";
import axios from "../utils/axios";
import useStoreState from "./useStoreState";
import { Connection } from "../types";

interface IUseConnections {
  connections: Connection[];
  fetching: boolean;
  error: string | null;
}

export const useConnections = (): IUseConnections => {
  const { user } = useStoreState();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    function fetchConnections() {
      axios
        .get(`/organizations/${user.organization}/connections`)
        .then((response) => {
          const connections = response.data;
          console.log("FETCHED CONNECTIONS: ", connections);
          if (mounted) {
            setConnections(connections);
            setFetching(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if (mounted) {
            setError("failed to fetch connections");
            setFetching(false);
          }
        });
    }
    fetchConnections();

    return () => {
      mounted = false;
    };
  }, [user.organization]);

  return { connections, fetching, error };
};
