// export * from './status-buttons.final'

export * from './status-buttons.exercise'
<<<<<<< HEAD

// 💯 Make hooks
// export * from './status-buttons.extra-1'

<<<<<<< HEAD
// 💯 Handle mutation errors properly
// export * from './status-buttons.extra-3'
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
  function handleClick() {
    if (isError) {
      reset()
    } else {
      run(onClick())
    }
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

function StatusButtons({book}) {
  const listItem = useListItem(book.id)

  const [mutate] = useUpdateListItem({throwOnError: true})
  const [handleRemoveClick] = useRemoveListItem({throwOnError: true})
  const [handleAddClick] = useCreateListItem({throwOnError: true})

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() => mutate({id: listItem.id, finishDate: null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => mutate({id: listItem.id, finishDate: Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => handleRemoveClick({id: listItem.id})}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => handleAddClick({bookId: book.id})}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
>>>>>>> 9ffd57b3d63611a41c2bcecdb7ebfc6f95fad048
