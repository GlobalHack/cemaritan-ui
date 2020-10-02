import { useEffect, useState } from "react";
import axios from "../utils/axios";
import useStoreState from "./useStoreState";
import { Transfer } from "../types";

export const useTransfer = (transferUid: number) => {
  const { user } = useStoreState();
  const [transfer, setTransfer] = useState<Transfer | undefined>();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    function fetchTransfers() {
      axios
        .get(`/organizations/${user.organization}/transfers/${transferUid}`)
        .then((res) => {
          const fetchedTransfer = res.data;
          console.log("FETCHED TRANSFER", fetchedTransfer);
          if (mounted) {
            setTransfer(fetchedTransfer);
            setFetching(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setError("failed to fetch transfer");
        });
    }
    fetchTransfers();
    return () => {
      mounted = false;
    };
  }, [user.organization, transferUid]);

  return { transfer, fetching, error };
};
