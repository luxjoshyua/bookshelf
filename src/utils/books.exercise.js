<<<<<<< HEAD
import {useQuery} from 'react-query'
import {client} from './api-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import {queryCache} from 'react-query/dist/react-query.development'
=======
import * as React from 'react'
import {useQuery, queryCache} from 'react-query'
import {useClient} from 'context/auth-context'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

<<<<<<< HEAD
const getBookSearchConfig = (query, user) => ({
  queryKey: ['bookSearch', {query}],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
=======
// note that this is not treated as a hook and is instead called by other hooks,
// so we'll continue to accept the user here
const getBookSearchConfig = (query, client) => ({
  queryKey: ['bookSearch', {query}],
  queryFn: () =>
    // client is the authenticated client
    client(`books?query=${encodeURIComponent(query)}`).then(data => data.books),
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
  config: {
    onSuccess(books) {
      for (const book of books) {
        setQueryDataForBook(book)
      }
    },
  },
})

<<<<<<< HEAD
function useBook(bookId, user) {
  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })

  return data ?? loadingBook
}

function useBookSearch(query, user) {
  // const result = useQuery({
  //   queryKey: ['bookSearch', {query}],
  //   queryFn: () =>
  //     client(`books?query=${encodeURIComponent(query)}`, {
  //       token: user.token,
  //     }).then(data => data.books),
  // })

  const result = useQuery(getBookSearchConfig(query, user))
  return {...result, books: result.data ?? loadingBooks}
}

function refetchBookSearchQuery(user) {
  // https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycacheremovequeries
  // removeQueries method can be used to remove queries from the cache based on their query keys or any other
  // functionally accessible property/state of the query
  queryCache.removeQueries('bookSearch')
  // https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycacheprefetchquery
  // prefetchQuery is an asynchronous method that can be used to fetch and cache a query response before it is needed
  // or rendered with useQuery and friends
  // set the query arg as an empty string
  queryCache.prefetchQuery(getBookSearchConfig('', user))
}

function setQueryDataForBook(book) {
  // https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycachesetquerydata
  queryCache.setQueryData(['book', {bookId: book.id}], book)
  // https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#usequery
}

export {useBook, useBookSearch, refetchBookSearchQuery, setQueryDataForBook}
=======
function useBookSearch(query) {
  const client = useClient()
  const result = useQuery(getBookSearchConfig(query, client))
  return {...result, books: result.data ?? loadingBooks}
}

function useBook(bookId) {
  const client = useClient()

  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      // client(`books/${bookId}`, {token: user.token}).then(data => data.book),
      // comes prebaked with the token so we don't need to pass it anymore
      client(`books/${bookId}`).then(data => data.book),
  })
  return data ?? loadingBook
}

// hook that:
// 1. gets the user from context
// 2. returns a memoized callback version of the refetchBookSearchQuery function,

function useRefetchBookSearchQuery() {
  // get the user from AuthContext
  const client = useClient()

  // return a memoized version of refetchBookSearchQuery
  return React.useCallback(
    async function refetchBookSearchQuery() {
      queryCache.removeQueries('bookSearch')
      await queryCache.prefetchQuery(getBookSearchConfig('', client))
    },
    [client],
  )
}

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

function setQueryDataForBook(book) {
  queryCache.setQueryData(['book', {bookId: book.id}], book, bookQueryConfig)
}

export {useBook, useBookSearch, useRefetchBookSearchQuery, setQueryDataForBook}
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
