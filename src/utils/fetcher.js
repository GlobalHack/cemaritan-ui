import config from '../config'

const ENV = 'nonprod' // this is harcoded until we have two environments
const api = config[ENV].api

const endpoints = {
  connections: '/connections',
  mappings: '/mappings',
  organizations: '/organizations',
  transfers: '/transfers',
  users: '/users'
}

// base fetcher used by other fetching funcs
export const fetcher = (endpoint, passedOpts) => {
  const opts = {
    mode: 'cors',
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

// example - this could also be used in the component directly?
export const getTransfers = () => {
  return fetcher('transfers')
}
