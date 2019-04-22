import config from '../config'

const ENV = 'nonprod' // this is harcoded until we have two environments
const api = config[ENV].api

// base fetcher used by other fetching funcs
export const fetcher = async (endpoint, opts) => {
  const result = await fetch(`${api}${endpoint}`, opts)
    .then(res => res.json())
    .catch(console.error)

  return result
}

// example - this could also be used in the component directly?
export const getTransfers = () => {
  return fetcher('/transfers')
}
