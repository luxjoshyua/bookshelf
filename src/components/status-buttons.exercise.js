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
<<<<<<< HEAD
import Tooltip from '@reach/tooltip'
import {useAsync} from 'utils/hooks'
import {
  useListItem,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
} from 'utils/list-items'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run, reset} = useAsync()

  function handleClick() {
    if (isError) {
      reset() // if error, reset to the original state
    } else {
      run(onClick())
    }
=======

import Tooltip from '@reach/tooltip'
import {
  useListItem,
  useUpdateListItem,
  useCreateListItem,
  useRemoveListItem,
} from 'utils/list-items'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import {CircleButton, Spinner} from './lib'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
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

<<<<<<< HEAD
function StatusButtons({user, book}) {
  const listItem = useListItem(user, book.id)

  const [update] = useUpdateListItem(user, {throwOnError: true})
  const [remove] = useRemoveListItem(user, {throwOnError: true})
  const [create] = useCreateListItem(user, {throwOnError: true})
=======
function StatusButtons({book}) {
  const listItem = useListItem(book.id)
  const [update] = useUpdateListItem({throwOnError: true})
  const [remove] = useRemoveListItem({throwOnError: true})
  const [create] = useCreateListItem({throwOnError: true})
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3

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
