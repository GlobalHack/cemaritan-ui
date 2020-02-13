import config from "../config";

// const endpoints = {
//   connections: `/organizations/${organization_id}/connections`,
//   downloads: `/organizations/${organization_id}/downloads`,
//   histories: `/organizations/${organization_id}/histories`,
//   mappings: `/organizations/${organization_id}/mappings`,
//   organizations: `/organizations`,
//   transfers: `/organizations/${organization_id}/transfers`,
//   uploads: `/organizations/${organization_id}/uploads`,
//   users: `/organizations/${organization_id}/users`,
// }

/* env is harcoded until we have two environments */
const ENV = "nonprod";

/* this api base url is pulled from the config file imported above */
const base_url = config[ENV].api;

/* check for a successful response */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300 && response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/* all fetch responses need to be unpacked to read */
function unpackJson(response) {
  return response.json();
}

/*
// errors will probably be displayed in the component that is
// calling the fetch function... so print error here to console
// and pass the error back to caller
*/
function printAndThrowError(error) {
  console.error(error);
  throw error;
}

const getHeaders = (auth, passedHeaders) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...passedHeaders
  });

  if (auth) {
    headers.append("Authorization", auth);
  }
  return headers;
};

/*
 * @param endpoint string (required)
 * @param passedOpts json
 * @param passedHeaders json
 */
const fetcher = (endpoint, auth, passedOpts, passedHeaders) => {
  const opts = {
    headers: getHeaders(auth, passedHeaders),
    ...passedOpts
  };

  const get_url = base_url + endpoint;

  return fetch(get_url, opts)
    .then(checkStatus)
    .then(unpackJson)
    .catch(printAndThrowError);
};

export default fetcher;
