import * as auth from 'auth-provider'

const apiURL = process.env.REACT_APP_API_URL

// if there is data being sent, it's a POST, so that's how we handle the ternaries

function client(
  endpoint,
  {data, token, method, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    // handle the method
    method: data ? 'POST' : 'GET',
    // serialise the data, handle the body
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.status === 401) {
      await auth.logout() // log user out
      window.location.assign(window.location) // clear state of the app, wipe memory clean, send user back to homepage
      return Promise.reject({message: 'Please re-authenticate'})
    }
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
