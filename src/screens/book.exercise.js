/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import debounceFn from 'debounce-fn'
import {FaRegCalendarAlt} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {useParams} from 'react-router-dom'
<<<<<<< HEAD
=======
import {useBook} from 'utils/books'
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
import {useListItem, useUpdateListItem} from 'utils/list-items'
import {formatDate} from 'utils/misc'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'
<<<<<<< HEAD
import {Textarea, ErrorMessage, Spinner} from 'components/lib'
import {Rating} from 'components/rating'
import {StatusButtons} from 'components/status-buttons'
import {useBook} from 'utils/books.exercise'

function BookScreen({user}) {
  const {bookId} = useParams()
  // the bookId and the user are what we need everytime because it's what
  // identifies that book as unique and also validates the request
  const book = useBook(bookId, user)
  const listItem = useListItem(user, book.id)
=======
import {Spinner, Textarea, ErrorMessage} from 'components/lib'
import {Rating} from 'components/rating'
import {StatusButtons} from 'components/status-buttons'

function BookScreen() {
  const {bookId} = useParams()
  const book = useBook(bookId)
  const listItem = useListItem(bookId)

>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
  const {title, author, coverImageUrl, publisher, synopsis} = book

  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{width: '100%', maxWidth: '14rem'}}
        />
        <div>
          <div css={{display: 'flex', position: 'relative'}}>
            <div css={{flex: 1, justifyContent: 'space-between'}}>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
            <div
              css={{
                right: 0,
                color: colors.gray80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: 100,
              }}
            >
<<<<<<< HEAD
              {book.loadingBook ? null : (
                <StatusButtons user={user} book={book} />
              )}
            </div>
          </div>
          <div css={{marginTop: 10, height: 46}}>
            {listItem?.finishDate ? (
              <Rating user={user} listItem={listItem} />
            ) : null}
=======
              {book.loadingBook ? null : <StatusButtons book={book} />}
            </div>
          </div>
          <div css={{marginTop: 10, height: 46}}>
            {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
            {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
      {!book.loadingBook && listItem ? (
<<<<<<< HEAD
        <NotesTextarea user={user} listItem={listItem} />
=======
        <NotesTextarea listItem={listItem} />
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
      ) : null}
    </div>
  )
}

function ListItemTimeframe({listItem}) {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{marginTop: 6}}>
        <FaRegCalendarAlt css={{marginTop: -2, marginRight: 5}} />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}

<<<<<<< HEAD
function NotesTextarea({listItem, user}) {
  // destructure the error and isError properties from our utility function
  // useMutate always returns an object with heaps of properties in it
  // https://tanstack.com/query/v4/docs/react/reference/useMutation
  const [mutate, {error, isError, isLoading}] = useUpdateListItem(user)

=======
function NotesTextarea({listItem}) {
  const [mutate, {error, isError, isLoading}] = useUpdateListItem()
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
  const debouncedMutate = React.useMemo(
    () => debounceFn(mutate, {wait: 300}),
    [mutate],
  )

  function handleNotesChange(e) {
    debouncedMutate({id: listItem.id, notes: e.target.value})
  }

  return (
    <React.Fragment>
      <div>
        <label
          htmlFor="notes"
          css={{
            display: 'inline-block',
            marginRight: 10,
            marginTop: '0',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Notes
        </label>
        {isError ? (
          <ErrorMessage
            error={error}
            variant="inline"
            css={{marginLeft: 6, fontSize: '0.7em'}}
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
      </div>
      <Textarea
        id="notes"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
        css={{width: '100%', minHeight: 300}}
      />
    </React.Fragment>
  )
}

export {BookScreen}
