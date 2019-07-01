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

const putter = (endpoint, objectId, data, passedOpts) => {
  // check to make sure passed endpoint is valid in endpoints object above
  if (!endpoints[endpoint]) return console.error(`'${endpoint}' is not a valid endpoint!`)

  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(data),
    ...passedOpts
  }
  const url = `${api}${endpoints[endpoint]}/${objectId}`

  return fetch(url, opts)
    .then(res => {
      // first check 200 status code to determine success
      if (res.status === 200) {
        console.log('success?');
        return res.json()
      }
      throw res.json().message;
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}

export default putter;
