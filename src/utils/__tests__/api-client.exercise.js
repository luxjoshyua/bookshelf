import {server, rest} from 'test/server'
// grab the client
import {client} from '../api-client' // client is async so all our functions need to be async
import {setupServer} from 'msw/lib/node'

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

test.todo('allows for config overrides')
// 🐨 do a very similar setup to the previous test
// 🐨 create a custom config that specifies properties like "mode" of "cors" and a custom header
// 🐨 call the client with the endpoint and the custom config
// 🐨 verify the request had the correct properties

test.todo(
  'when data is provided, it is stringified and the method defaults to POST',
)
// 🐨 create a mock data object
// 🐨 create a server handler very similar to the previous ones to handle the post request
//    💰 Use rest.post instead of rest.get like we've been doing so far
// 🐨 call client with an endpoint and an object with the data
//    💰 client(endpoint, {data})
// 🐨 verify the request.body is equal to the mock data object you passed
