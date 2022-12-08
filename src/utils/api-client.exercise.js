async function client(endpoint, customConfig = {}) {
  // create the config we pass to fetch
  const config = {
    method: 'GET',
    ...customConfig, // spread the rest of the customConfig we can pass
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  // FIRST WORKING METHOD
  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`
  let response = await window.fetch(url, config)
  if (response.ok) {
    let returnedData = await response.json()
    return returnedData
  } else {
    throw new Error(`Didn't return data: ${response.status}`)
  }

  // SECOND WORKING METHOD
  // const url = `${process.env.REACT_APP_API_URL}/${endpoint}`
  // return window.fetch(url, config).then(async response => {
  //   const data = await response.json()
  //   if (response.ok) {
  //     return data
  //   } else {
  //     return Promise.reject(data)
  //   }
  // })
}

export {client}
