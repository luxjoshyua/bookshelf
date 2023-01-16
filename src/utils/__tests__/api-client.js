// export * from './api-client.final'

export * from './api-client.exercise'

jest.mock('react-query')
jest.mock('auth-provider', () => jest.createMockFromModule('auth-provider'))

// 💯 Use `setupTests.js`
// export * from './api-client.extra-2'
