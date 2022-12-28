import * as React from 'react'
import {useQuery, queryCache} from 'react-query'
import {useAuth} from 'context/auth-context'
import {client} from './api-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'

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

// note that this is not treated as a hook and is instead called by other hooks,
// so we'll continue to accept the user here
const getBookSearchConfig = (query, user) => ({
  queryKey: ['bookSearch', {query}],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
  config: {
    onSuccess(books) {
      for (const book of books) {
        setQueryDataForBook(book)
      }
    },
  },
})

function useBookSearch(query) {
  const {user} = useAuth()
  const result = useQuery(getBookSearchConfig(query, user))
  return {...result, books: result.data ?? loadingBooks}
}

function useBook(bookId) {
  const {user} = useAuth()

  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })
  return data ?? loadingBook
}

// hook that:
// 1. gets the user from context
// 2. returns a memoized callback version of the refetchBookSearchQuery function,

function useRefetchBookSearchQuery() {
  // get the user from AuthContext
  const {user} = useAuth()

  // return a memoized version of refetchBookSearchQuery
  return React.useCallback(
    async function refetchBookSearchQuery() {
      queryCache.removeQueries('bookSearch')
      await queryCache.prefetchQuery(getBookSearchConfig('', user))
    },
    [user],
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
