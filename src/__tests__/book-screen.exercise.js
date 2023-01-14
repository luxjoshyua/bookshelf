import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'
import * as usersDB from 'test/data/users'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'

// after each test, clear the queryCache and log user out
afterEach(async () => {
  queryCache.clear()
  auth.logout()
  // because these aren't dependent on each other, make sure they execute at the same time
  await Promise.all([usersDB.reset(), booksDB.reset(), listItemsDB.reset()])
})

test('renders all the book information', async () => {
  // create a user using `buildUser`
  const user = buildUser()
  await usersDB.create(user)
  const authUser = await usersDB.authenticate(user)
  // authenticate the client by setting the auth.localStorageKey in localStorage
  // to the token associated with the authenticated user
  window.localStorage.setItem(auth.localStorageKey, authUser.token)

  // create a book using `buildBook`
  // const book = buildBook()
  // await booksDB.create(book)
  // does the same but shorter syntax
  const book = await booksDB.create(buildBook())

  // update the URL to `/book/${book.id}` because we need to be in that location for this test
  // window.history.pushState({}, 'page title', route)
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
  const route = `/book/${book.id}`
  window.history.pushState({}, 'page title', route)

  // reassign window.fetch to another function and handle the following requests
  // window.fetch = async (url, config) => { /* handle stuff here */ }
  // return Promise.resolve({ok: true, json: async () => ({ /* response data here */ })})
  // endsWith() ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
  // this is being handled by the src/setupTests.js now
  // const originalFetch = window.fetch
  // window.fetch = async (url, config) => {
  //   // if (!url) {
  //   //   console.warn(url, config)
  //   //   return Promise.reject(
  //   //     new Error(`Need to handle: ${url} with config: ${config}`),
  //   //   )
  //   // }
  //   // - url ends with `/bootstrap`: respond with {user, listItems: []}
  //   if (url.endsWith(`/bootstrap`)) {
  //     return Promise.resolve({
  //       ok: true,
  //       json: async () => ({
  //         // response data here
  //         user: {...user, token: 'WHATEVER_FAKE_TOKEN'},
  //         listItems: [],
  //       }),
  //     })
  //   }
  //   // - url ends with `/list-items`: respond with {listItems: []}
  //   else if (url.endsWith(`list-items`)) {
  //     return Promise.resolve({
  //       ok: true,
  //       json: async () => ({
  //         // response data here
  //         listItems: [],
  //       }),
  //     })
  //   }
  //   // - url ends with `/books/${book.id}`: respond with {book}
  //   else if (url.endsWith(`/books/${book.id}`)) {
  //     return Promise.resolve({
  //       ok: true,
  //       json: async () => ({
  //         // response data here
  //         book,
  //       }),
  //     })
  //   }
  //   console.log(url, config)
  //   return originalFetch(url, config)
  // }

  // setting the wrapper to AppProviders means all the same providers
  // we have in the app will be available in our tests
  render(<App />, {wrapper: AppProviders})

  // check app is settled / screen isnt't still loading before we start checking if the book list is rendering properly
  // await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  await waitForElementToBeRemoved(() => [
    // spresd the result of the query into an array
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ])

  // https://testing-library.com/docs/dom-testing-library/api-async#findby-queries
  // check where we're up to
  // screen.debug()
  // find the available roles
  // screen.getByRole('whatver')

  // assert the book's info is in the document
  expect(screen.getByRole('heading', {name: book.title})).toBeInTheDocument()
  expect(screen.getByText(book.author)).toBeInTheDocument()
  expect(screen.getByText(book.publisher)).toBeInTheDocument()
  expect(screen.getByText(book.synopsis)).toBeInTheDocument()
  expect(screen.getByRole('img', {name: /book cover/i})).toHaveAttribute(
    'src',
    book.coverImageUrl,
  )
  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()

  // check elements aren't in the document also
  // using getByRole will throw an error because it can't get anything
  expect(
    screen.queryByRole('button', {name: /remove from list/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as read/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as unread/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('textbox', {name: /notes/i}),
  ).not.toBeInTheDocument()
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument()
})
