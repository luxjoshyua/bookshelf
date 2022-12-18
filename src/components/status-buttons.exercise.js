/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({user, book}) {
  // useQuery gets the listItem (if it exists)
  // the queryKey is 'list-items'
  // queryFn calls the list-items endpoint
  // alias the data to listItems
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    // authenticated request so need to pass the token
    queryFn: () =>
      // returns an object that has a list items property, we only want value, so go through and access that
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })
  // search through the listItems we got from react-query and find the one with the right bookId
  // check the listItems actually exist using elvis operator ? - if not, end there, don't throw error
  // is async so at times listItems will not be defined
  const listItem = listItems?.find(li => li.bookId === book.id) ?? null

  // mutate function calls the list-items/:listItemId endpoint with a PUT and the updates as data.
  // the mutate function will be called with the updates we pass as data
  const [update] = useMutation(
    ({id}) =>
      client(`list-items/${id}`, {
        method: 'PUT',
        data: {id},
        token: user.token,
      }),
    // passing onSettled gets the list-items cache updated after this query finishes, regardless of whether the request succeeds or fails
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  // update written differently
  // const [update] = useMutation(
  //   (updates) =>
  //     client(`list-items/${updates.id}`, {
  //       method: 'PUT',
  //       data: {id},
  //       token: user.token,
  //     }),
  //   // passing onSettled gets the list-items cache updated after this query finishes, regardless of whether the request succeeds or fails
  //   {onSettled: () => queryCache.invalidateQueries('list-items')},
  // )

  // mutate function calls the list-items/:listItemId endpoint with a DELETE
  const [remove] = useMutation(
    ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    // passing onSettled gets the list-items cache updated after this query finishes, regardless of whether the request succeeds or fails
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  // mutate function calls the list-items endpoint with a POST
  // and the bookId the listItem is being created for
  const [create] = useMutation(
    ({bookId}) => client('list-items', {data: {bookId}, token: user.token}),
    // passing onSettled gets the list-items cache updated after this query finishes, regardless of whether the request succeeds or fails
    {onSettled: () => queryCache.invalidateQueries('list-items')},
  )

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() => update({id: listItem.id, finishDate: null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => update({id: listItem.id, finishDate: Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => remove({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => create({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
