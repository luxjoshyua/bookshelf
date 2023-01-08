<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import {screen, act} from '@testing-library/react'
=======
import chalk from 'chalk'
import {screen, prettyDOM, act} from '@testing-library/react'

function withMessage(cb, message, {solo = true} = {}) {
  try {
    cb()
  } catch (error) {
    if (solo) {
      // eslint-disable-next-line no-throw-literal
      throw `🚨  ${chalk.reset.red(message)}`
    } else {
      error.message = `🚨  ${chalk.reset.red(message)}\n\n${error.message}`
    }
    throw error
  }
}
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881

test('renders the app', () => {
=======
import '@testing-library/jest-dom/extend-expect'
import {screen, waitForElementToBeRemoved, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
=======
=======
>>>>>>> e7ce8cf894b2339a75ac4832f6c9be0ad2920f26
=======
import ReactDOM from 'react-dom'
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
import '@testing-library/jest-dom/extend-expect'
import {
  screen,
  waitForElementToBeRemoved,
  within,
  act,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8601780b88f7a22f13904b6d2368f8650ebbc846
=======
>>>>>>> e7ce8cf894b2339a75ac4832f6c9be0ad2920f26
=======
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
import {server} from 'test/server'

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

// this is a pretty comprehensive test and CI is pretty slow...
jest.setTimeout(25000)

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> e7ce8cf894b2339a75ac4832f6c9be0ad2920f26
=======
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
function buildUser(overrides) {
  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8601780b88f7a22f13904b6d2368f8650ebbc846
=======
>>>>>>> e7ce8cf894b2339a75ac4832f6c9be0ad2920f26
=======
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    {timeout: 4000},
  )

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
test('renders the app', async () => {
>>>>>>> 2c0c72fa461530fdfa281fa46911582830382045
=======
test('can login and use the book search', async () => {
>>>>>>> 8601780b88f7a22f13904b6d2368f8650ebbc846
=======
test('can login and use the book search', async () => {
  // setup
>>>>>>> e7ce8cf894b2339a75ac4832f6c9be0ad2920f26
=======
test('can login and use the book search', async () => {
  // setup
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
test('can login and use the book search', async () => {
  // setup
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
test('can login and use the book search', async () => {
  // setup
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  let reactRoot
  act(() => {
    reactRoot = require('..').root
  })

  screen.getByTitle('Bookshelf')
  screen.getByRole('heading', {name: /Bookshelf/i})
  screen.getByRole('button', {name: /Login/i})
  screen.getByRole('button', {name: /Register/i})

<<<<<<< HEAD
=======
  const cssEl = document.body.querySelector('[css]')
  withMessage(
    () => expect(cssEl).toBeNull(),
    `
At least one element has an attribute called "css". This means that emotion did not compile the prop correctly.

Make sure to include this at the top of the file:

/** @jsx jsx */
import {jsx} from '@emotion/core'


Here's the element that has the css attribute that wasn't compiled:

${prettyDOM(cssEl)}
    `.trim(),
  )

  withMessage(
    () => expect(document.body.querySelector('[class*=css-]')).not.toBeNull(),
    `None of the elements are styled by emotion. Make sure to render a styled component and use the css prop.`,
  )

>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881
  // cleanup
  act(() => reactRoot.unmount())
=======
=======
>>>>>>> e7ce8cf894b2339a75ac4832f6c9be0ad2920f26
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
  let rootRef
  act(() => {
    rootRef = require('..').rootRef
  })

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  await userEvent.type(screen.getByPlaceholderText(/search/i), 'voice of war')
  await userEvent.click(screen.getByLabelText(/search/i))

  await waitForLoadingToFinish()

  expect(screen.getByText(/voice of war/i)).toBeInTheDocument()

  // cleanup
  act(() => rootRef.current.unmount())
>>>>>>> 2c0c72fa461530fdfa281fa46911582830382045
=======
=======
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
  let rootRef
  act(() => {
    rootRef = require('..').rootRef
  })

<<<<<<< HEAD
  const user = buildUser()

  await userEvent.click(await screen.findByRole('button', {name: /register/i}))
=======
=======
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
  await waitForLoadingToFinish()

  const user = buildUser()

  await userEvent.click(screen.getByRole('button', {name: /register/i}))
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> e7ce8cf894b2339a75ac4832f6c9be0ad2920f26
=======
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5

  const modal = within(screen.getByRole('dialog'))
  await userEvent.type(modal.getByLabelText(/username/i), user.username)
  await userEvent.type(modal.getByLabelText(/password/i), user.password)

  await userEvent.click(modal.getByRole('button', {name: /register/i}))

  await waitForLoadingToFinish()

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  await userEvent.click(screen.getByRole('button', {name: /logout/i}))

  // cleanup
  act(() => rootRef.current.unmount())
>>>>>>> 8601780b88f7a22f13904b6d2368f8650ebbc846
=======
  await userEvent.click(screen.getAllByRole('link', {name: /discover/i})[0])

  const searchInput = screen.getByPlaceholderText(/search/i)
  await userEvent.type(searchInput, 'voice of war')

  await userEvent.click(screen.getByLabelText(/search/i))
=======
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
  await userEvent.click(screen.getAllByRole('link', {name: /discover/i})[0])

  const searchInput = screen.getByPlaceholderText(/search/i)
  await userEvent.type(searchInput, 'voice of war{enter}')

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
  await waitForLoadingToFinish()

  await userEvent.click(screen.getByText(/voice of war/i))

  expect(window.location.href).toMatchInlineSnapshot(
    `"http://localhost/book/B084F96GFZ"`,
  )

  expect(
    await screen.findByText(/to the west, a sheltered girl/i),
  ).toBeInTheDocument()

  await userEvent.click(screen.getByRole('button', {name: /logout/i}))

  expect(searchInput).not.toBeInTheDocument()

  // cleanup
  act(() => rootRef.current.unmount())
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> e7ce8cf894b2339a75ac4832f6c9be0ad2920f26
=======
>>>>>>> cb4f21cd9dda877b96f598ff2b17b79364e25b30
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
  document.body.removeChild(root)
})
