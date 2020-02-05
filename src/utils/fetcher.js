import config from "../config";

// env is harcoded until we have two environments
const ENV = "nonprod";
// this api base url is pulled from the config file imported above
const api = config[ENV].api;

// organizations (options: 1, 2, 3)
const organization_id = 1;

const headers = authToken => ({
  "Content-Type": "application/json",
  Authorization: authToken
  // 'x-dev-api-key': 'dummystringwillreplace'
});

// strings used as fetcher arg to map to each endpoint ex: fetcher('connections')

export const fetchUser = authToken =>
  fetch(`${api}/user`, { header: headers(authToken) })
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      throw err;
    });

export const fetchAll = (endpoint, authToken) => {
  return fetch(`${api}${endpoint}`, { header: headers(authToken) })
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export const fetchByOrg = (endpoint, user, passedOpts) => {
  if (!user) throw Error("need a user to access this endpoint");

  const opts = {
    headers: headers(user.authToken),
    ...passedOpts
  };

  return fetch(`${api}/organizations/${user.organization}${endpoint}`, opts)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      throw err;
    });
};

// TODO: delete from here on...
const endpoints = {
  connections: `/organizations/${organization_id}/connections`,
  downloads: `/organizations/${organization_id}/downloads`,
  histories: `/organizations/${organization_id}/histories`,
  mappings: `/organizations/${organization_id}/mappings`,
  organizations: `/organizations`,
  transfers: `/organizations/${organization_id}/transfers`,
  uploads: `/organizations/${organization_id}/uploads`,
  users: `/organizations/${organization_id}/users`,
  user: `/user`
};

const fetcher = (endpoint, authToken, objectId, passedOpts) => {
  // check to make sure passed endpoint is valid in endpoints object above
  if (!endpoints[endpoint])
    return console.error(`'${endpoint}' is not a valid endpoint!`);

  console.log(authToken);
  const opts = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
      "x-dev-api-key": "dummystringwillreplace"
    },
    ...passedOpts
  };
  let url = `${api}${endpoints[endpoint]}`;

  if (objectId) {
    url = url + `/${objectId}`;
  }

  return fetch(url, opts)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export default fetcher;
