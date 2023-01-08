import {server} from 'test/server'
// this isn't used in the solution. Only in the extra credit
// export * from './utils/__tests__/api-client.exercise'

// this file is configured to be used in every single tests,
// so we don't have to write this stuff every time

// we do this for all our tests everytime, so move here
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
