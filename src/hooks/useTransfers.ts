import { useEffect, useState } from "react";
import axios from "../utils/axios";
import useStoreState from "./useStoreState";
import { Transfer } from "../types";

export const useTransfers = () => {
  const { user } = useStoreState();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    function fetchTransfers() {
      axios
        .get(`/organizations/${user.organization}/transfers`)
        .then((res) => {
          const fetchedTransfers = res.data;
          console.log("FETCHED TRANSFERS", fetchedTransfers);
          if (mounted) {
            setTransfers(fetchedTransfers);
            setFetching(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if (mounted) {
            setError("failed to fetch transfers");
            setFetching(false);
          }
        });
    }
    fetchTransfers();
    return () => {
      mounted = false;
    };
  }, [user.organization]);

  return { transfers, fetching, error };
};
