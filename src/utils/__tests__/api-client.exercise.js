import {server, rest} from 'test/server'
// grab the client
import {client} from '../api-client'
import {setupServer} from 'msw/lib/node'

const apiURL = process.env.REACT_APP_API_URL

// beforeAll, start the server
beforeAll(() => server.listen())

// afterAll, stop the server
afterAll(() => server.close())

// afterEach, reset the server handlers to their original handlers
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

test.todo('adds auth token when a token is provided')
// 🐨 create a fake token (it can be set to any string you want)
// 🐨 create a "request" variable with let
// 🐨 create a server handler to handle a test request you'll be making
// 🐨 inside the server handler, assign "request" to "req" so we can use that
//     to assert things later.
//     💰 so, something like...
//       async (req, res, ctx) => {
//         request = req
//         ... etc...
//
// 🐨 call the client with the token (note that it's async)
// 🐨 verify that `request.headers.get('Authorization')` is correct (it should include the token)

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
