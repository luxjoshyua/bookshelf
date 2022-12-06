/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from 'utils/api-client.exercise'

function DiscoverBooksScreen() {
  const [status, setStatus] = React.useState('idle')
  const [query, setQuery] = React.useState('')
  const [data, setData] = React.useState(null)
  // don't want to run the search until user has submitted the form,
  // this boolean is for that
  const [queried, setQueried] = React.useState(false)

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  // useEffect makes the request with the client,
  // and updates the status and data
  // remember react calls the callback immediately, so add dependency list
  const endpoint = `books?query=${encodeURIComponent(query)}`
  React.useEffect(() => {
    // if already queried, return early, because effect callbacks are called on
    // the initial render too
    if (!queried) {
      return
    }
    setStatus('loading')
    // window
    //   .fetch('https://dummyjson.com/products/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))

    client(endpoint).then(responseData => {
      setData(responseData)
      setStatus('success')
    })
  }, [endpoint, queried, query])

  function handleSearchSubmit(event) {
    event.preventDefault() // prevent full page reload
    setQuery(event.target.elements.search.value) // set the query value
    // console.log(event.target.elements.search.value)
    setQueried(true)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
