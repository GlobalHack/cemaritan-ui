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
  mappings: `/organizations/${organization_id}/mappings`,
  organizations: `/organizations`,
  transfers: `/organizations/${organization_id}/transfers`,
  users: `/organizations/${organization_id}/users`,
  histories: `/organizations/${organization_id}/histories`
}

const fetcher = (endpoint, passedOpts) => {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    ...passedOpts
  }
  // check to make sure passed endpoint is valid in endpoints object above
  const url = !!endpoints[endpoint] ? `${api}${endpoints[endpoint]}` : console.error(`'${endpoint}' is not a valid endpoint!`)

  return fetch(url, opts)
    .then(res => res.json())
    .catch(console.error)
}

export default fetcher
