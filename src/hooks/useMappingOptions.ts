import { useEffect, useState } from "react";

import axios from "../utils/axios";
import useStoreState from "./useStoreState";
import { Mapping } from "../types";

export const useMappingOptions = (): Mapping[] => {
  // TODO: do I need to add auth? not now?
  const { user } = useStoreState();
  const [mappingOptions, setMappingOptions] = useState([]);

  useEffect(() => {
    let mounted = true;

    function fetchMappings() {
      axios
        .get(`/organizations/${user.organization}/mappings`)
        .then((response) => {
          const mappings = response.data;
          console.log("FETCHED MAPPINGS");
          if (mounted) {
            setMappingOptions(mappings);
          }
        })
        .catch((err) => console.error("failed to fetch mappings:", err));
    }
    fetchMappings();

    return () => {
      mounted = false;
    };
  }, [user.organization]);

  return mappingOptions;
};
