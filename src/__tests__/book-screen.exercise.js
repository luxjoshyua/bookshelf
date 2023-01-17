import * as React from 'react'
import {
  render,
  screen,
  waitForLoadingToFinish,
  userEvent,
  loginAsUser,
  waitFor,
} from 'test/app-test-utils'
import {buildBook, buildListItem} from 'test/generate'
import faker from 'faker'
import {App} from 'app'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'
import {formatDate} from 'utils/misc'

const fakeTimerUserEvent = userEvent.setup({
  advanceTimers: () => jest.runOnlyPendingTimers(),
})

test('renders all the book information', async () => {
  // create a book using `buildBook`
  // const book = buildBook()
  // await booksDB.create(book)
  const book = await booksDB.create(buildBook())

  // ref: https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
  const route = `/book/${book.id}`

  // reassign window.fetch to another function and handle the following requests
  // window.fetch = async (url, config) => { /* handle stuff here */ }
  // return Promise.resolve({ok: true, json: async () => ({ /* response data here */ })})

  // setting the wrapper to AppProviders means all the same providers
  // we have in the app will be available in our tests
  await render(<App />, {route})

  // assert the book's info is in the document
  expect(screen.getByRole('heading', {name: book.title})).toBeInTheDocument()
  expect(screen.getByText(book.author)).toBeInTheDocument()
  expect(screen.getByText(book.publisher)).toBeInTheDocument()
  expect(screen.getByText(book.synopsis)).toBeInTheDocument()
  expect(screen.getByRole('img', {name: /book cover/i})).toHaveAttribute(
    'src',
    book.coverImageUrl,
  )
  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()

  // check elements aren't in the document also
  // using getByRole will throw an error because it can't get anything
  expect(
    screen.queryByRole('button', {name: /remove from list/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as read/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as unread/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('textbox', {name: /notes/i}),
  ).not.toBeInTheDocument()
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument()
})

// we're testing what happens when we're on the book screen
// and we add a book to our reading list
test('can create a list item for the book', async () => {
  const book = await booksDB.create(buildBook())
  const route = `/book/${book.id}`
  // window.history.pushState({}, 'page title', route)

  await render(<App />, {route})

  // await waitForElementToBeRemoved(() => [
  //   // spresd the result of the query into an array
  //   ...screen.queryAllByLabelText(/loading/i),
  //   ...screen.queryAllByText(/loading/i),
  // ])

  // now at single book screen
  // screen.debug()
  // screen.getByRole('whakdfdf')

  // click on the add to list button
  await userEvent.click(screen.getByRole('button', {name: /add to list/i}))

  // wait for the app to settle - all the loading indicators should be gone
  // await waitForElementToBeRemoved(() => [
  //   // spresd the result of the query into an array
  //   ...screen.queryAllByLabelText(/loading/i),
  //   ...screen.queryAllByText(/loading/i),
  // ])
  await waitForLoadingToFinish()

  // verify the right elements appear on the screen now that this book has a list item
  // mark as read
  expect(
    screen.getByRole('button', {name: /mark as read/i}),
  ).toBeInTheDocument()
  // remove from list
  expect(
    screen.getByRole('button', {name: /remove from list/i}),
  ).toBeInTheDocument()
  // has date
  // notes section
  expect(screen.getByRole('textbox', {name: /notes/i})).toBeInTheDocument()

  // better has start date
  const startDateNode = screen.getByLabelText(/start date/i)
  expect(startDateNode).toHaveTextContent(formatDate(Date.now()))

  expect(
    screen.queryByRole('button', {name: /add to list/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as unread/i}),
  ).not.toBeInTheDocument()
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
})

test('can remove a list item for the book', async () => {
  // interact directly with the database
  // book loading up already has a user associated to it
  // for the user who's logged in
  const user = await loginAsUser()

  const book = await booksDB.create(buildBook())
  // associate the book with the user
  await listItemsDB.create(buildListItem({owner: user, book}))

  const route = `/book/${book.id}`
  // render the app with the route and the user
  await render(<App />, {route, user})

  // click the remove from list button
  const removeFromListBtn = screen.getByRole('button', {
    name: /remove from list/i,
  })
  await userEvent.click(removeFromListBtn)
  // after clicking, expect the button to be disabled
  expect(removeFromListBtn).toBeDisabled()

  // wait for loading state to finish
  await waitForLoadingToFinish()

  // expect add to list button to be in the document
  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()
  // expect remove from list button not to be in the document
  expect(
    screen.queryByRole('button', {name: /remove from list/i}),
  ).not.toBeInTheDocument()
})

test('can mark a list item as read', async () => {
  // setup the test
  const user = await loginAsUser()
  const book = await booksDB.create(buildBook())
  // book being loaded now has a listItem associated to it for the user who is logged in
  // the way to test whether a list item is read, is that it needs to not have finishDate
  const listItem = await listItemsDB.create(
    buildListItem({owner: user, book, finishDate: null}),
  )

  const route = `/book/${book.id}`
  await render(<App />, {route, user})

  const markAsReadBtn = screen.getByRole('button', {name: /mark as read/i})
  await userEvent.click(markAsReadBtn)
  // after clicking, expect the button to be disabled
  expect(markAsReadBtn).toBeDisabled()

  // wait for loading state to finish
  await waitForLoadingToFinish()

  expect(
    screen.getByRole('button', {name: /mark as unread/i}),
  ).toBeInTheDocument()
  // once the book is read, can rate it, so the stars should be showing
  expect(screen.getAllByRole('radio', {name: /star/i})).toHaveLength(5)

  const startAndFinishDateNode = screen.getByLabelText(/start and finish date/i)
  expect(startAndFinishDateNode).toHaveTextContent(
    `${formatDate(listItem.startDate)} — ${formatDate(Date.now())}`,
  )

  expect(
    screen.queryByRole('button', {name: /mark as read/i}),
  ).not.toBeInTheDocument()
})

test('can edit a note', async () => {
  // using fake timers to skip debounce time - approx 300ms
  jest.useFakeTimers()
  // setup the test
  const user = await loginAsUser()
  const book = await booksDB.create(buildBook())
  // associate the book with the user
  const listItem = await listItemsDB.create(buildListItem({owner: user, book}))

  const route = `/book/${book.id}`
  // render the app with the route and the user
  await render(<App />, {route, user})

  const newNotes = faker.lorem.words()
  const notesTextBox = screen.getByRole('textbox', {name: /notes/i})

  await fakeTimerUserEvent.clear(notesTextBox)
  await fakeTimerUserEvent.type(notesTextBox, newNotes)

  // this also works, is a simpler way to test notes field is editable
  // userEvent.type(notesTextBox, 'some dummy value')
  // await waitFor(() => {
  //   expect(notesTextBox).toHaveValue('some dummy value')
  // })

  // wait for the loading spinner to show up
  await screen.findByLabelText(/loading/i)
  // wait for the loading spinner to go away
  await waitForLoadingToFinish()

  expect(notesTextBox).toHaveValue(newNotes)
  // more specific
  // await waitFor(() => expect(notesTextBox).toHaveValue(newNotes))

  expect(await listItemsDB.read(listItem.id)).toMatchObject({
    notes: newNotes,
  })
})
