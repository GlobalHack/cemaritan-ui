import config from '../config'

// env is harcoded until we have two environments
const ENV = 'nonprod'
// this api url is pulled from the config file imported above
const api = config[ENV].api
// strings used as fetcher arg to map to each endpoint ex: fetcher('connections')
const endpoints = {
  connections: '/connections',
  mappings: '/mappings',
  organizations: '/organizations',
  transfers: '/transfers',
  users: '/users'
}

export const fetcher = (endpoint, passedOpts) => {
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
