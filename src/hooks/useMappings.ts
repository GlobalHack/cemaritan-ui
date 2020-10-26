import { useEffect, useState } from "react";

import axios from "../utils/axios";
import useStoreState from "./useStoreState";
import { Mapping } from "../types";

interface IUseMappings {
  mappings: Mapping[];
  fetching: boolean;
  error: string | null;
}

export const useMappings = (): IUseMappings => {
  const { user } = useStoreState();
  const [mappings, setMappings] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setFetching(true);

    function fetchMappings() {
      axios
        .get(`/organizations/${user.organization}/mappings`)
        .then((response) => {
          const mappings = response.data;
          console.log("FETCHED MAPPINGS");
          if (mounted) {
            setMappings(mappings);
            setFetching(false);
          }
        })
        .catch((err) => {
          console.error("failed to fetch mappings:", err);
          if (mounted) {
            setError("failed to fetch mappings");
            setFetching(false);
          }
        });
    }
    fetchMappings();

    return () => {
      mounted = false;
    };
  }, [user.organization]);

  return {
    mappings,
    fetching,
    error,
  };
};
