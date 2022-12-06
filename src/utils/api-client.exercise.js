async function client(endpoint, customConfig = {}) {
  // create the config to pass to window.fetch
  // make the method default to "GET"
  const config = {
    method: 'GET',
    ...customConfig,
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  let url = `${process.env.REACT_APP_API_URL}/${endpoint}` // full URL
  // call window,fetch(fullURL, config) then handle the JSON response
  return window.fetch(url, config).then(response => response.json())
}

export {client}
