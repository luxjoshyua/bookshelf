<<<<<<< HEAD
# Cache Management

> NOTE: react-query v3 has been released and react-query is even better than
> ever! Luckily for us, there are only a handful of relatively minor changes
> that impact what you learn in EpicReact.dev. Eventually I will re-record
> everything and update the repo, but until then, you can learn about the
> differences in the
> [React Query v3 Migration Guide](https://react-query.tanstack.com/guides/migrating-to-react-query-3).
> You can find the V2 documentation
> [here](https://github.com/tannerlinsley/react-query/tree/2.x/docs/src/pages/docs).
> I also decided to try upgrading the whole finished app to use react-query v3
> and was able to do it pretty quick, and I live streamed it to my YouTube
> channel. Finish this exercise first, and then you can watch the live stream
> here: https://www.youtube.com/watch?v=umJqHUcOaUo
=======
# Context
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3

## 📝 Your Notes

Elaborate on your learnings here in `INSTRUCTIONS.md`

## Background

<<<<<<< HEAD
Application state management is arguably one of the hardest problems in
application development. This is evidenced by the myriad of libraries available
to accomplish it. In my experience, the issue is made even more challenging by
over-engineering, pre-mature abstraction, and lack of proper categorizing of
state.

State can be lumped into two buckets:

1. UI state: Modal is open, item is highlighted, etc.
2. Server cache: User data, tweets, contacts, etc.

A great deal of complexity comes when people attempt to lump these two distinct
types of state together. When this is done, UI state which should not be global
is made global because Server cache state is typically global so it naturally
causes us to just make everything global. It's further complicated by the fact
that caching is one of the hardest problems in software development in general.

We can drastically simplify our UI state management if we split out the server
cache into something separate.

A fantastic solution for managing the server cache on the client is
[`react-query`](https://react-query-v2.tanstack.com/). It is a set of React
hooks that allow you to query, cache, and mutate data on your server in a way
that's flexible to support many use cases and optimizations but opinionated
enough to provide a huge amount of value. And thanks to the power of hooks, we
can build our own hooks on top of those provided to keep our component code
really simple.

Here are a few examples of how you can use react-query that are relevant for our
exercise:

```javascript
function App({tweetId}) {
  const result = useQuery({
    queryKey: ['tweet', {tweetId}],
    queryFn: (key, {tweetId}) =>
      client(`tweet/${tweetId}`).then(data => data.tweet),
  })
  // result has several properties, here are a few relevant ones:
  //   status
  //   data
  //   error
  //   isLoading

  const [removeTweet, state] = useMutation(() => tweetClient.remove(tweetId))
  // call removeTweet when you want to execute the mutation callback
  // state has several properties, here are a few relevant ones:
  //   status
  //   data
  //   error
}
```

📜 here are the docs:

- `useQuery`: https://react-query-v2.tanstack.com/docs/guides/queries
- `useMutation`: https://react-query-v2.tanstack.com/docs/guides/mutations

That should be enough to get you going.
=======
Once we've got all our server cache state inside `react-query`, there's not a
whole lot of global state left in our application that can't be easily managed
via a combination of React state, composition, and lifting state.

That said, there are definitely still scenarios where having some UI state
that's globally available through context would be valuable. Things like
application "toast" notifications, user authentication state, or modal and focus
management can all benefit from the coordination and freedom from
[Prop Drilling](https://kentcdodds.com/blog/prop-drilling) that a single global
provider could provide.

📜 For a refresher on the APIs we'll be using:

- https://reactjs.org/docs/hooks-reference.html#usecontext
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3

## Exercise

Production deploys:

<<<<<<< HEAD
- [Exercise](https://exercises-06-cache-management.bookshelf.lol/exercise)
- [Final](https://exercises-06-cache-management.bookshelf.lol/)

👨‍💼 Our users are anxious to get going on their reading lists. Several already
have some books picked out! We've got the backend and the UI all ready to go.
Now you need to wire up our UI with those APIs and we'll be good to go.

Here are a few new client endpoints you'll need to know about:

- GET: `list-items` - get the user's list items
- POST: `list-items` with data - create user list items
- PUT: `list-items/${listItemId}` with data - update a list item
- DELETE: `list-items/${listItemId}` - delete a list item
- GET: `books/${bookId}` - get data on a specific book

This stuff touches a lot of files, but I'm confident that you can get this
working. Good luck!

NOTE: If it feels like you're doing a fair amount of copy paste (especially for
getting list items) it's because you are. We'll clean that up in an extra
credit.

One thing to keep in mind is that if you have two resources that are the same
used in two different components, you want to make sure that both the `queryKey`
is the same otherwise you'll have two entries for that resource in the cache.
Also, make sure their `queryFn` do the same thing or you'll have some pretty odd
behavior! Don't worry if this feels really complicated at first. The extra
credit will really simplify things for you!

### Files

- `src/components/status-buttons.js`
- `src/components/book-row.js`
- `src/components/rating.js`
- `src/screens/discover.js`
- `src/screens/book.js`
- `src/components/list-item-list.js`,
- `src/app.js`
- `src/utils/api-client.js`

## Extra Credit

### 1. 💯 Make hooks

How are you enjoying all this repetition? No? Yeah, I'm not a big fan either.
Here's where React hooks come in really handy! Let's make a few custom hooks.
Here are a few ideas:

- `useBook(bookId, user)`
- `useBookSearch(query, user)`
- `useListItem(user, bookId)`
- `useListItems(user)`
- `useUpdateListItem(user)`
- `useRemoveListItem(user)`
- `useCreateListItem(user)`

This should really help simplify all the components in the app that require some
data.

**Files:**

- `src/utils/books.js`
- `src/utils/list-items.js`
- `src/components/status-buttons.js`
- `src/components/rating.js`
- `src/components/book-row.js`
- `src/screens/discover.js`
- `src/screens/book.js`
- `src/components/list-item-list.js`,

### 2. 💯 Wrap the `<App />` in a `<ReactQueryConfigProvider />`

[Production deploy](https://exercises-06-cache-management.bookshelf.lol/extra-2)

Currently, we're not doing any error handling for our queries. If there's an
error, we don't show the user at all.

For example, try to go to `/book/not-a-book-id`:
http://localhost:3000/book/not-a-book-id

You'll just sit there with a loading book forever while react-query continues to
retry forever.

We already have error boundaries set up for this app to handle runtime errors.
Let's reuse those same error boundaries to handle errors in querying for data!

Another thing you might notice is react-query is pretty eager to update its
cache which results in lots of requests in our network tab. This is actually
great because it means our app's data won't have as many stale data issues.
However it's maybe a little more eager than you might want. Luckily, react-query
gives us all the knobs we need to turn to tweak how frequently to update the
cache and how many times to retry.

In the `src/index.js` file, create a queryConfig object here and enable
`useErrorBoundary` and disable `refetchOnWindowFocus` for queries (not for
mutations though). You may also consider customizing the `retry` option as well.
See if you can figure out how to make it not retry if the error status is 404 or
if the failure count is greater than 2.

📜 Learn more about error boundaries:
https://reactjs.org/docs/error-boundaries.html

📜 Learn more about query config:
https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#reactqueryconfigprovider

```javascript
const queryConfig = {
  queries: {
    /* your global query config */
  },
}

ReactDOM.render(
  <ReactQueryConfigProvider config={queryConfig}>
    <App />
  </ReactQueryConfigProvider>,
  document.getElementById('root'),
)
```

Once you're finished, try going to http://localhost:3000/book/not-a-book-id
again and it should give you an error message and not retry the request anymore.

**Files:**

- `src/index.js`

### 3. 💯 Handle mutation errors properly

[Production deploy](https://exercises-06-cache-management.bookshelf.lol/extra-3)

Currently, if there's an error during a mutation, we don't show the user
anything. Instead, we should show the error message to the user. We'll need to
do a few things to make this work everywhere.

You can test this behavior by using the app DevTools (hover over the bottom of
the page) and add a request failure config for `PUT` requests to
`/api/list-items/:listItemId`, or type "FAIL" in the notes.

Let's start with showing an error message for the notes and rating. For those,
we simply need to access the error state and display it.

The `<NotesTextarea />` component in `src/screens/book.js` will need to
destructure the `error` and `isError` properties
(`const [mutate, {error, isError}] = useUpdateListItem(user)`) and use those to
display the error inline. You can use this UI:

```javascript
import {ErrorMessage} from 'components/lib'

// ... then in the component next to the label:
{
  isError ? (
    <ErrorMessage
      error={error}
      variant="inline"
      css={{marginLeft: 6, fontSize: '0.7em'}}
    />
  ) : null
}
```

For the Rating component in `src/components/rating.js`, you'll do basically the
same thing. Put the UI next to the stars.

Next, let's handle those status buttons (the create/update/delete buttons). For
those, you'll notice that each is a `TooltipButton` in
`src/components/status-buttons.js`. The `TooltipButton` is using `useAsync` and
passing the return value of `onClick` to `run`. We need the promise `onClick`
returns, to reject so we can show the error.

To make this work, we need to update the `useMutation` functions in the
`src/utils/list-items.js` to accept options (so I should be able to call
`useUpdateListItem(user, {throwOnError: true})`).

Next, we'll need to enable `throwOnError` in `src/components/status-buttons.js`.
Here's what the `throwOnError` does:

```javascript
const [mutate] = useMutation(
  () => {
    throw new Error('oh no, mutation failed!')
  },
  {throwOnError: true},
)

const success = () => console.log('success')
const failure = () => console.log('failure')

mutate().then(success, failure)

// {throwOnError: false} (which is the default) would log: "success"
// {throwOnError: true} logs: "failure"
```

In our `TooltipButton` component, we're handling the mutation errors with our
own `useAsync` hook, so we want the error to propagate rather than be handled by
react-query. This being the case, the hooks we're calling in the `StatusButtons`
component should configure `throwOnError` to `true`.

You might also see if you can figure out how to make it so we reset the error
state if the user clicks the tooltip button when it's in an error state. (You
can call `reset` from `useAsync`).

**Files:**

- `src/utils/list-items.js`
- `src/screens/book.js`
- `src/components/rating.js`
- `src/components/status-buttons.js`

### 4. 💯 Add a loading spinner for the notes

[Production deploy](https://exercises-06-cache-management.bookshelf.lol/extra-4)

If you made it this far, then you're a real champ. I'm going to let you figure
this one out on your own. Try to add an inline loading spinner to the notes in
`src/screens/book.js`.

Tip: you can get `isLoading` from the mutation query.

**Files:**

- `src/screens/book.js`

### 5. 💯 Prefetch the book search query

[Production deploy](https://exercises-06-cache-management.bookshelf.lol/extra-5)

Right now, open up the app and do this:

1. Go to the discover page.
2. Add the first book that comes back to your list (without typing in the
   search)
3. Click that book
4. Click the back button
5. Notice that the book you added is in the search results for a moment and then
   disappears.

The reason this happens is because react-query has cached our search for an
empty string and when the user returns to this page they're looking at cached
results. However, the server will respond with only books that are _not_ in the
user's reading list already. So while we're looking at the stale data,
react-query validates that stale data, finds that the data was wrong and we get
an update.

This isn't a great user experience. There are various things we can do to
side-step this. We could clear the react-query cache (something worth trying if
you want to give that a go, be my guest!). But instead, what we're going to do
is when the user leaves the discover page, we'll trigger a refetch of that query
so when they come back we have the search pre-cached and the response is
immediate.

To do this, you'll need a `refetchBookSearchQuery` function in the `books.js`
util and an effect cleanup that calls this utility in the `discover.js`
component.

📜 You'll want to use `react-query`'s `queryCache.prefetchQuery` and
`queryCache.removeQueries` functions:

- https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycacheremovequeries
- https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycacheprefetchquery

**Files:**

- `src/utils/books.js`
- `src/screens/discover.js`

### 6. 💯 Add books to the query cache

[Production deploy](https://exercises-06-cache-management.bookshelf.lol/extra-6)

Right now, open up the app and do this:

1. Go to the discover page.
2. Click any book.
3. Notice that there's a loading state while we're loading the book's
   information

One thing you might notice about this is that we actually have all the data we
need already from the search results page! There's no reason to load the book
data. The problem is that the discover page is caching book search results and
the book page is trying to get books from the cache by a different query key.

You'll notice this same problem if you add a book to your reading list, then
refresh and click on that list item. You should have everything you need
already, but the query cache wasn't populated properly.

There are a few ways we could solve this, but the easiest is to just leave our
queries as they are and pre-populate the query cache with the books as we get
them. So when the search for books is successful, we can take the array of books
we get back and push them into the query cache with the same query key we use to
retrieve them out of the cache for the book page.

To do this, we can add an `onSuccess` handler to our book search query config.
We'll want to do something similar for the list items (because the book data
comes back with the list item as well). So when either request is successful,
you'll want to set the book data in the query cache for that book by it's ID.
Try to figure that out.

💰 You may find it helpful to create a `setQueryDataForBook` function in
`src/utils/books.js` and export that so you can use that function in
`src/utils/list-items.js`.

Keep in mind, the query cache identifies a resource by it's key. The key for a
book is: `['book', {bookId}]`.

📜 Here are some docs you might find helpful:

- `queryCache.setQueryData`:
  https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycachesetquerydata
- `config.onSuccess`:
  https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#usequery

**Files:**

- `src/utils/books.js`
- `src/utils/list-items.js`

### 7. 💯 Add optimistic updates and recovery

[Production deploy](https://exercises-06-cache-management.bookshelf.lol/extra-7)

What percent of mutation requests (requests intended to make a change to data)
in your app are successful? 50%? 70%? 90%? 99%? I would argue that the vast
majority of requests users make in your apps are successful (if not, then you
have other problems to deal with... like annoyed users). With that in mind,
wouldn't it make sense to assume that the request is going to succeed and make
the UI appear as if it had? Successful until proven otherwise?

This pattern is called "Optimistic UI" and it's a great way to make users feel
like your app is lightning fast. Unfortunately it often comes with a lot of
challenges primarily due to race-conditions. Luckily for us, `react-query`
handles all of that and makes it really easy for us to change the cache directly
and then restore it in the event of an error.

Let's make our list items optimistically update when the user attempts to make
changes. You'll know you have it working when you mark a book as read and the
star rating shows up instantly. Or if you add a book to your reading list and
the notes textarea shows up instantly.

📜 To make the proper changes to the list item mutations, you'll need to know
about the following things:

- `onMutate`, `onError` and `onSettled`:
  https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#usemutation
  (use `onMutate` to make your optimistic update, use `onError` to restore the
  original value, and use `onSettled` to trigger a refetch of all the
  `list-items` to be sure you have the very latest data). NOTE: What you return
  from `onMutate` will be the third argument received by `onError`.
- `queryCache.invalidateQueries`:
  https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycacheinvalidatequeries
- `queryCache.getQueryData`:
  https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycachegetquerydata
  (to get the data you'll restore in the event of an error)
- `queryCache.setQueryData`:
  https://github.com/TanStack/query/blob/2.x/docs/src/pages/docs/api.md#querycachesetquerydata
  (to set it to the optimistic version of the data and to restore the original
  data if there's an error)

This one is definitely a challenge. It'll take you more than a few minutes to
figure it out. I suggest you take your time and try and work it out though.
You'll learn a lot!

A good way to test this one out in the app is the rating. Click one star and
move the mouse away and the stars should show your selection immediately.

**Files:**

- `src/utils/list-items.js`
=======
- [Exercise](https://exercises-07-context.bookshelf.lol/exercise)
- [Final](https://exercises-07-context.bookshelf.lol/)

In this exercise, rather than passing the `user` object and the `login`,
`register`, and `logout` functions as props to the `AuthenticatedApp` and the
`UnauthenticatedApp`, we're going to put those values in an
`AuthContext.Provider` value and then those components will get the things they
need from context.

### Files

- `src/context/auth-context.js`
- `src/app.js`
- `src/utils/list-items.js`
- `src/utils/books.js`
- `src/components/list-item-list.js`
- `src/components/status-buttons.js`
- `src/components/rating.js`
- `src/components/book-row.js`
- `src/screens/reading-list.js`
- `src/screens/finished.js`
- `src/screens/book.js`
- `src/screens/discover.js`
- `src/authenticated-app.js`
- `src/unauthenticated-app.js`

## Extra Credit

### 1. 💯 create a `useAuth` hook

[Production deploy](https://exercises-07-context.bookshelf.lol/extra-1)

It's annoying to have to pass the `AuthContext` around to `React.useContext` and
if someone were to accidentally use `React.useContext(AuthContext)` without
rendering `AuthContext.Provider`, they would get a pretty unhelpful error
message about not being able to destructure `undefined`.

Create a `useAuth` custom hook that consumes the `AuthContext` from
`React.useContext`. This can be as simple as
`const useAuth = () => React.useContext(AuthContext)` but if you want to add a
little extra protection to ensure people only use it within a provider then you
can do that.

**Files:**

- `src/context/auth-context.js`
- `src/authenticated-app.js`
- `src/unauthenticated-app.js`
- `src/utils/books.js`
- `src/utils/list-items.js`

### 2. 💯 create an `AuthProvider` component

[Production deploy](https://exercises-07-context.bookshelf.lol/extra-2)

Rendering providers in regular application code is fine, but one nice way to
create a logical separation of concerns (which will help with maintainability)
is to create a component who's sole purpose is to manage and provide the
authentication state. So for this extra credit, you need to create an
`AuthProvider` component. Most of the code for this component will be moved from
the `src/app.js` module and you'll move it to the `src/context/auth-context.js`
module.

In that module, create an `AuthProvider` component that renders the
`AuthContext.Provider` Copy most of the code from the `App` component in the
`src/app.js` module and make sure that the `value` you pass to the provider is:
`{user, login, register, logout}`

Don't forget to export the `AuthProvider` component along with the `useAuth`
hook. And you don't need to export the `AuthContext` anymore!

**Files:**

- `src/context/auth-context.js`
- `src/app.js`
- `src/index.js` (this is where you'll render the `AuthProvider`)

### 3. 💯 colocate global providers

[Production deploy](https://exercises-07-context.bookshelf.lol/extra-3)

Typically in applications, you'll have several context providers that are global
or near-global. Most of the time, it's harmless to just make them all global and
create a single provider component that brings them all together. In addition to
general "cleanup", this can help make testing easier.

Inside the `src/context/index.js` module create an `AppProviders` component
that:

- accepts a `children` prop
- renders all the context providers for our app:
  - `ReactQueryConfigProvider` <-- get that from the `src/index.js` module
  - `Router` <-- get that from the `src/app.js` module
  - `AuthProvider` <-- you should have created that in
    `src/context/auth-context.js`
- Pass the children along to the last provider

💰 Here's how it'll look:

```javascript
function AppProviders({children}) {
  return (
    <Provider1>
      <Provider2>
        <Provider3>{children}</Provider3>
      </Provider2>
    </Provider1>
  )
}
```

Don't forget to `export {AppProviders}`

**Files:**

- `src/index.js`
- `src/context/index.js`
- `src/app.js`

### 4. 💯 create a `useClient` hook

[Production deploy](https://exercises-07-context.bookshelf.lol/extra-4)

There's a bit of duplication in our custom react-query hooks. Each one has to
get the user, and then they use the user to get the token which they then pass
to the client. But I think it would be better to have a hook that gives us an
authenticated client instead. So basically, a hook that gives us a memoized
version of:

```javascript
// token comes from useAuth().user.token
function authenticatedClient(endpoint, config) {
  return client(endpoint, {...config, token})
}
```

So create a `useClient` hook, and then use it wherever code attempts to make
authenticated client calls.

**Files:**

- `src/context/auth-context.js`
- `src/utils/list-items.js`
- `src/utils/books.js`
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

<<<<<<< HEAD
https://ws.kcd.im/?ws=Build%20React%20Apps&e=06%3A%20Cache%20Management&em=
=======
https://ws.kcd.im/?ws=Build%20React%20Apps&e=07%3A%20Context&em=
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
