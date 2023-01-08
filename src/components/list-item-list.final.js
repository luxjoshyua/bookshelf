/** @jsx jsx */
import {jsx} from '@emotion/core'

<<<<<<< HEAD
import {useQuery} from 'react-query'
import {client} from 'utils/api-client'
import {BookListUL} from './lib'
import {BookRow} from './book-row'

function ListItemList({
  user,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })
  const filteredListItems = listItems?.filter(filterListItems)

  if (!listItems?.length) {
=======
import {useListItems} from 'utils/list-items'
import {BookListUL} from './lib'
import {BookRow} from './book-row'

function ListItemList({filterListItems, noListItems, noFilteredListItems}) {
  const listItems = useListItems()

  const filteredListItems = listItems.filter(filterListItems)

  if (!listItems.length) {
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
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
  )
}

export {ListItemList}
