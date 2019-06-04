import config from '../config'

// env is harcoded until we have two environments
const ENV = 'nonprod'
// this api base url is pulled from the config file imported above
const api = config[ENV].api

// organizations (options: 1, 2, 3)
const organization_id = 1;

// strings used as poster arg to map to each endpoint ex: poster('connections')
const endpoints = {
  transfers: `/organizations/${organization_id}/transfers`
}

const poster = (endpoint, data, passedOpts) => {
  // check to make sure passed endpoint is valid in endpoints object above
  if (!endpoints[endpoint]) return console.error(`'${endpoint}' is not a valid endpoint!`)
  
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
    ...passedOpts
  }
  const url = `${api}${endpoints[endpoint]}`

  return fetch(url, opts)
    .then(res => res.json())
    .catch(console.error)
}

export default poster
