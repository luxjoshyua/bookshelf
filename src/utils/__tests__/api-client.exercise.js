import {server, rest} from 'test/server'
// grab the client
import {client} from '../api-client' // client is async so all our functions need to be async

const apiURL = process.env.REACT_APP_API_URL

// beforeAll, start the server
beforeAll(() => server.listen())

// afterAll, stop the server
afterAll(() => server.close())

// afterEach test, reset the server handlers to their original handlers so between each test, we reset the server handlers
afterEach(() => server.resetHandlers())

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  // add a server handler to handle a test request we'll be making
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'TEST VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  // call the client (remember it's asynchronous)
  const result = await client(endpoint)
  // assert that the resolved value from the client call is correct
  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  // create a fake token - can be any string we want
  const token = 'abc123'
  // create a request variable with let
  let request

  // create a server handler to handle test request
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'TEST VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      // assign request to req so we can use that to assert things later
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  // call the client with the token (remember it's asynchronous)
  await client(endpoint, {token})

  // verify that `request.headers.get('Authorisation')` is correct (it should include the token)
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  // setup similar to previous test
  // create a server handler to handle test request
  let request
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'TEST VALUE'}

  // create a custom config that specifies properties like "mode" of "cors" and a custom header
  const customConfig = {
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain',
    },
  }

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      // assign request to req so we can use that to assert things later
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  // call the client with the endpoint and the custom config
  await client(endpoint, customConfig)

  // console.dir(headers)
  // verify the request had the correct properties
  expect(request.headers.get('Content-Type')).toBe(
    customConfig.headers['Content-Type'],
  )
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  // create a mock data object
  const data = {
    firstName: 'Sam',
    address: 'Collaroy',
  }
  let request
  const endpoint = 'test-endpoint'

  // create a server handler very similar to the previous ones to handle the post request,
  // except it's rest.post insead of rest.get
  // useful ref: https://blog.openreplay.com/mocking-api-servers-with-mock-service-worker-msw/
  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      // return res(ctx.json({message: data}))
      return res(ctx.json(req.body))
    }),
  )

  // call client an endpoint and an object with the data
  await client(endpoint, {data})

  // verify the request.body is equal to the mock data object just passed
  expect(request.body).toEqual(data)
})

test('correctly rejects the promise if there is an error', async () => {
  const testErrorMessage = {
    message: 'Test error message',
  }

  // create a server handler to handle test request
  const endpoint = 'test-endpoint'
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testErrorMessage))
    }),
  )

  // the response.ok is now false because the status is outside 200-299. so check the promise is rejected
  // with the data returned from the server
  await expect(client(endpoint)).rejects.toEqual(testErrorMessage)
})
