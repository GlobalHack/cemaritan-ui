import config from '../config'

// env is harcoded until we have two environments
const ENV = 'nonprod'
// this api base url is pulled from the config file imported above
const api = config[ENV].api

// organizations (options: 1, 2, 3)
const organization_id = 1;

// strings used as fetcher arg to map to each endpoint ex: fetcher('connections')
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
}

const fetcher = (endpoint, objectId, passedOpts, authToken) => {
  // check to make sure passed endpoint is valid in endpoints object above
  if (!endpoints[endpoint]) return console.error(`'${endpoint}' is not a valid endpoint!`)

  const opts = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken
      // 'x-dev-api-key': 'dummystringwillreplace'
    },
    ...passedOpts
  }
  let url = `${api}${endpoints[endpoint]}`

  if (objectId){
    url = url + `/${objectId}`;
  }

  return fetch(url, opts)
    .then(res => res.json())
    .catch(console.error)
}

export default fetcher
