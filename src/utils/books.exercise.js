import {useQuery} from 'react-query'
import {client} from './api-client'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import {queryCache} from 'react-query/dist/react-query.development'

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
