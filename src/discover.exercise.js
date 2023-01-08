/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as colors from './styles/colors'
import * as React from 'react'
import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from 'utils/api-client.exercise'
// import {useAsync} from 'utils/hooks'

function DiscoverBooksScreen() {
  const [query, setQuery] = React.useState('')
  const [status, setStatus] = React.useState('idle') // idle, loading, success
  const [data, setData] = React.useState(null)
  // don't want to run the search until user has submitted form
  const [queried, setQueried] = React.useState(false)
  const [error, setError] = React.useState(null)

  // const {data, error, run, isLoading, isError, isSuccess} = useAsync()

  // makes the request with the client and updates the status and data
  React.useEffect(() => {
    // if user has already submitted form, end early, because effect callbacks
    // are called on the initial render too
    if (!queried) {
      return
    }

    setStatus('loading')

    // run(client(`books?query=${encodeURIComponent(query)}`))

    client(`books?query=${encodeURIComponent(query)}`).then(
      responseData => {
        setStatus('success')
        setData(responseData)
      },
      error => {
        setStatus('error')
        setError(error)
        console.log(`error in useEffect: ${error}`)
      },
    )
  }, [queried, query])

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  function handleSearchSubmit(event) {
    event.preventDefault() // prevent full page reload
    setQueried(true) // set queried state to true
    const searchValue = event.target.elements.search.value // set query value
    setQuery(searchValue)
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

      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

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
