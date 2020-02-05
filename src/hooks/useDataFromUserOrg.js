import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import config from "../config";

// TODO: get this from the .env
// env is harcoded until we have two environments
const ENV = "nonprod";
// this api base url is pulled from the config file imported above
const api = config[ENV].api;

const FETCH_HEADERS = {
  "Content-Type": "application/json"
};

export const useDataFromUserOrg = (endpoint, passedOpts) => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (user) {
      const opts = {
        headers: {
          ...FETCH_HEADERS,
          Authorization: user.authToken
        },
        ...passedOpts
      };

      fetch(`${api}/organizations/${user.organization}${endpoint}`, opts)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => {
          console.error(err);
          setError(`Failed to fetch ${endpoint}.`);
        });
    }
  }, [user, endpoint]);

  return { data, error };
};
