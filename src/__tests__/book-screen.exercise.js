import * as React from 'react'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'

// after each test, clear the queryCache and log user out
afterEach(() => {
  queryCache.clear()
  auth.logout()
})

test('renders all the book information', async () => {
  // authenticate the client by setting the auth.localStorageKey in localStorage
  // to some string value (can be anything for now)
  window.localStorage.setItem(auth.localStorageKey, 'WHATEVER_FAKE_TOKEN')

  // create a user using `buildUser`
  const user = buildUser()
  // create a book using `buildBook`
  const book = buildBook()
  // update the URL to `/book/${book.id}`
  // window.history.pushState({}, 'page title', route)
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
  const route = `/book/${book.id}`
  window.history.pushState({}, 'page title', route)

  // reassign window.fetch to another function and handle the following requests
  // window.fetch = async (url, config) => { /* handle stuff here */ }
  // return Promise.resolve({ok: true, json: async () => ({ /* response data here */ })})
  // endsWith() ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
  window.fetch = async (url, config) => {
    if (!url) {
      console.warn(url, config)
      return Promise.reject(new Error(`Need to handle: ${url}`))
    }
    // - url ends with `/bootstrap`: respond with {user, listItems: []}
    if (url.endsWith(`/bootstrap`)) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          // response data here
          user,
          listItems: [],
        }),
      })
    }
    // - url ends with `/list-items`: respond with {listItems: []}
    if (url.endsWith(`list-items`)) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          // response data here
          listItems: [],
        }),
      })
    }
    // - url ends with `/books/${book.id}`: respond with {book}
    if (url.endsWith(`/books/${book.id}`)) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          // response data here
          book,
        }),
      })
    }
    console.warn(`shouldn't be able to reach here`)
  }

  // setting the wrapper to AppProviders means all the same providers
  // we have in the app will be available in our tests
  render(<App />, {wrapper: AppProviders})

  // 🐨 use findBy to wait for the book title to appear
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#findby-queries
  // check screen isnt't still loading
  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ])

  // 🐨 assert the book's info is in the document
})
