// export * from './list-item-list.final'

<<<<<<< HEAD
export * from './list-item-list.exercise'
<<<<<<< HEAD

// 💯 Make hooks
// export * from './list-item-list.extra-1'
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
import {useListItems} from 'utils/list-items'
import {BookListUL} from './lib'
import {BookRow} from './book-row'

function ListItemList({filterListItems, noListItems, noFilteredListItems}) {
  const listItems = useListItems()

  const filteredListItems = listItems.filter(filterListItems)

  if (!listItems.length) {
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
          <BookRow book={listItem.book} />
        </li>
      ))}
    </BookListUL>
  )
}

export {ListItemList}
>>>>>>> 0d8934af4e1a572a9d810768b57f69f4588453c5
