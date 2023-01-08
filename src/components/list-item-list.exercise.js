/** @jsx jsx */
import {jsx} from '@emotion/core'
<<<<<<< HEAD
<<<<<<< HEAD
import {useListItems} from 'utils/list-items.exercise'
import {BookListUL} from './lib'
import {BookRow} from './book-row'

function ListItemList({
  user,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {
  const listItems = useListItems(user)
  const filteredListItems = listItems?.filter(filterListItems)

  if (!listItems?.length) {
=======
=======
>>>>>>> 9ffd57b3d63611a41c2bcecdb7ebfc6f95fad048

import {useListItems} from 'utils/list-items'
import {BookListUL} from './lib'
import {BookRow} from './book-row'
<<<<<<< HEAD
=======
import {Profiler} from './profiler.exercise'
>>>>>>> 9ffd57b3d63611a41c2bcecdb7ebfc6f95fad048

function ListItemList({filterListItems, noListItems, noFilteredListItems}) {
  const listItems = useListItems()

  const filteredListItems = listItems.filter(filterListItems)

  if (!listItems.length) {
<<<<<<< HEAD
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
>>>>>>> 9ffd57b3d63611a41c2bcecdb7ebfc6f95fad048
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
  }
  if (!filteredListItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noFilteredListItems}
      </div>
    )
  }

  return (
<<<<<<< HEAD
    <BookListUL>
      {filteredListItems.map(listItem => (
        <li key={listItem.id}>
<<<<<<< HEAD
          <BookRow user={user} book={listItem.book} />
=======
          <BookRow book={listItem.book} />
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
        </li>
      ))}
    </BookListUL>
=======
    <Profiler id="bookListULProfiler">
      <BookListUL>
        {filteredListItems.map(listItem => (
          <li key={listItem.id} aria-label={listItem.book.title}>
            <BookRow book={listItem.book} />
          </li>
        ))}
      </BookListUL>
    </Profiler>
>>>>>>> 9ffd57b3d63611a41c2bcecdb7ebfc6f95fad048
  )
}

export {ListItemList}
