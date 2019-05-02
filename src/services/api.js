// TODO: Implement REACT_ENV vars
const BASE_URL = {
  local: 'http://localhost:9292'
}

export const apiWrapper = (url, config) => {
  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  const data = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include'
  }

  return fetch(`${BASE_URL.local}${url}`, Object.assign({}, data, config))
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw res.error
      } else {
        return res
      }
    })
    .catch(err => {
      throw new Error(err)
    })
}
