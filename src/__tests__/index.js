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
import {server} from 'test/server'

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

// this is a pretty comprehensive test and CI is pretty slow...
jest.setTimeout(25000)

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    {timeout: 4000},
  )

test('renders the app', async () => {
>>>>>>> 2c0c72fa461530fdfa281fa46911582830382045
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)

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
  let rootRef
  act(() => {
    rootRef = require('..').rootRef
  })

  await userEvent.type(screen.getByPlaceholderText(/search/i), 'voice of war')
  await userEvent.click(screen.getByLabelText(/search/i))

  await waitForLoadingToFinish()

  expect(screen.getByText(/voice of war/i)).toBeInTheDocument()

  // cleanup
  act(() => rootRef.current.unmount())
>>>>>>> 2c0c72fa461530fdfa281fa46911582830382045
  document.body.removeChild(root)
})
