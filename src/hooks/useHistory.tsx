import { useEffect, useState } from "react";
import axios from "../utils/axios";
import useStoreState from "./useStoreState";
import { History } from "../types";

interface IUseHistory {
  history: History[];
  fetching: boolean;
  error: string | null;
}

export const useHistory = (): IUseHistory => {
  const { user } = useStoreState();
  const [history, setHistory] = useState<History[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    function fetchTransfers() {
      axios
        .get(`/organizations/${user.organization}/histories`)
        .then((res) => {
          const fetchedHistory = res.data;
          if (mounted) {
            setHistory(fetchedHistory);
            setFetching(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if (mounted) {
            setError("failed to fetch transfer");
            setFetching(false);
          }
        });
    }
    fetchTransfers();
    return () => {
      mounted = false;
    };
  }, [user.organization]);

  return { history, fetching, error };
};
