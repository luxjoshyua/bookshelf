<<<<<<< HEAD
# Testing Hooks and Components
=======
# Integration Testing
>>>>>>> 459d74fdddc904da339c6619ef4937bd302cc6ae

## 📝 Your Notes

Elaborate on your learnings here in `INSTRUCTIONS.md`

## Background

<<<<<<< HEAD
The two building blocks of React applications are Hooks and Components. You can
make a custom hook out of anything that uses another hook, and you can split a
component into a million different slices as well. But that doesn't mean you
should test every single one of them. Following the advice in
[How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
and
[Static vs Unit vs Integration vs E2E Testing for Frontend Apps](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests),
we want to make sure that we're focusing our efforts in the right place and not
testing at too low of a level unnecessarily (painting a wall with a tiny
paintbrush or painting the corners with a bucket of paint).

Typically, you'll get confidence that your components are working when you run
them as part of integration tests with other components. However, highly
reusable or complex components or hooks can really benefit from a solid suite of
tests dedicated to them specifically. Sometimes this means that you mock some or
all of their dependencies and other times they don't have any dependencies at
all.

You'll find that some people don't consider a test a "unit test" if it's not
mocking out all dependencies (like React hooks or other components). Honestly,
it really doesn't matter, so if you want to call these "Component Tests" and
"Hooks Tests" or even "lower level Integration Tests" that's cool with me. I
just care about getting confidence my stuff's not busted.

### Testing components

For testing components, we'll be using
[React Testing Library](https://testing-library.com/react), the de-facto
standard testing library for React and we'll use
[`@testing-library/user-event`](https://github.com/testing-library/user-event)
to help with our user interactions. We already have those packages installed in
this repository. We also have
[`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom)
installed in our `package.json` (but you'll need to make sure to enable it in
the exercise).

Here's a quick example of how to test a component with React Testing Library:

```javascript
import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MyComponent} from '../my-component'

test('renders click me button', () => {
  render(<MyComponent />)
  const button = screen.getByRole('button', {name: /click me/i})
  await userEvent.click(button)

  expect().toBeInTheDocument()
})
```

> NOTE: The latest version of `userEvent` returns promises for _all_ API calls,
> so you'll need to add `await` to any interaction you do.

### Testing hooks

Most of your custom hooks should be covered by testing the components that use
them. Doing this will help avoid our natural tendency to over-abstract your
custom hook to support things that your components don't actually need.

However, sometimes a custom hook is reusable (a library) or sufficiently complex
that testing it in isolation is a good idea. In that case you have two
approaches:

1. Create a test component that uses the hook in the typical way the hook would
   be used by consumers and test that component
2. `renderHook` from `@testing-library/react`

Learn more about the nuances between these approaches in
[How to test custom React hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks).

Here's an example of how you'd test a custom hook with `@testing-library/react`:

```javascript
import {renderHook, act} from '@testing-library/react'
import useCounter from '../use-counter'

test('should increment counter', () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(1)
})
```

Learn more about that funny `act` function from
[Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning).
=======
Let's take a step back and pretend that testing doesn't exist. Imagine you're
getting a bunch of bug reports and your users are annoyed about this. So you and
your co-worker sit down to talk about this with the product manager. "What if we
check everything before shipping updates?" you ask. Your co-worker agrees that's
a great idea and the PM signs up to do it.

After a few releases, the PM complains that he's spending all of his time
testing things, so you start a program where everyone at the company starts
doing this manual testing as well. Eventually users start complaining that it's
taking too long to get new features. And you're not super jazzed about doing
manual quality assurance testing either.

So then you have the brilliant idea to automate the testing and you get to work.
You start with simple scripts that you run in the app and you click around just
like you would if you were manually testing. Your co-worker is amazed at how
fast you get your manual tests all finished and they start doing it too.
Eventually, you realize that some of the tests are really slow and you want to
speed them up and test more granular things so when something fails you have a
better idea of what's causing the failure.

This is how I think about testing. Everything that you do in testing should
reflect the way you would test it manually, however there are good reasons to
test more granularly. There are many levels of testing, but you can sort of put
them each in one of these buckets:

- End-to-end
- Integration
- Unit
- Static

If we were to put those layers into a shape to indicate the relative amount of
use cases we cover, it would resemble a trophy:
[Static vs Unit vs Integration vs E2E Testing for Frontend Apps](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests).

This means that we should get most of our use case coverage from the Integration
type tests. This is because they give us the most bang for our buck in regards
to the level of confidence we can achieve relative to the amount of work they
take.

> [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)

The setup required for a single integration test typically takes a fair amount
more setup than a single unit tests. Luckily, if done right, that setup can
apply to all integration tests. Also, if you tried to get the same confidence
using unit tests, you'd have to write a lot more of them and you'll find that
you're ultimately doing less work with a handful of integration tests anyway.

With unit tests, you often mock out dependencies. With integration tests you'll
do this as well, but what you consider a dependency is pushed out to the
boundaries of your application. To be more specific, you're typically only going
to need to mock out HTTP requests and _sometimes_ third party modules as well.

Because of this, you'll find that you eventually need to create a mock
implementation for pretty much every request your application makes. Remember,
if you were to unit test everything to the point that you get the same coverage
you get from integration tests you'll end up having to mock just as much, but
it'll be spread throughout your codebase, so this _does_ end up being less work,
it just doesn't feel like it at first.

You'll also want to make sure that the screen you're testing has all the context
providers it needs. For this we'll be using the `wrapper` option in
`@testing-library/react`'s `render` function.

At the end of the day, you'll find that you get a lot of confidence from getting
the bulk of your coverage from integration tests and reserving unit tests for
pure functions of complex logic and highly reusable code/components.

One note on authentication. When I was at PayPal, I pulled up the app and
scoured, `localStorage`, `sessionStorage`, and the cookies to figure out what it
was that made it possible to make authenticated requests. I discovered the
authentication cookie and I was able to simulate the authenticated state by
setting that before running tests. It worked out really nicely for integration
tests (and allowed my end-to-end tests to not have to go through the entire
authentication flow each time as well). Sometimes you'll have to mock your auth
provider module, but if you can manage it, try and figure out how you can
simulate a logged in state.
>>>>>>> 459d74fdddc904da339c6619ef4937bd302cc6ae

## Exercise

Production deploys:

<<<<<<< HEAD
- [Exercise](https://exercises-12-testing-hooks-and-components.bookshelf.lol/exercise)
- [Final](https://exercises-12-testing-hooks-and-components.bookshelf.lol/)

In this project, we have one reusable hook called `useAsync` and a set of
compound components for modals: `Modal`, `ModalContents`, `ModalOpenButton`. For
this exercise, you'll be adding tests for these things!

💰 One thing to keep in mind, we want to try and use our code in the same way we
expect users to use them. So when testing the modal compound components, we'll
render them all together, rather than trying to render them separately from one
another. This is totally fine:

```javascript
render(
  <Parent>
    <Child1 />
    <Child2>Hello</Child2>
  </Parent>,
)
```

💰 For the `useAsync` hook tests, you'll be asserting on the value returned by
the hook, that means you'll be using `toEqual({})` a fair amount. But how do you
assert that the `run`, `reset`, `setData`, and `setError` functions are correct?
You can't really, not without calling them (which you'll be doing throughout the
tests). But with `toEqual`, you _have_ to include all properties. You can use
[the `expect.any` asymetric matcher](https://jestjs.io/docs/en/expect#expectanyconstructor).
Here's how you can do that:

```javascript
const foo = () => {}
expect({foo}).toEqual({foo: expect.any(Function)})
```

Alternatively, you could assert using
[`.toMatchObject()`](https://jestjs.io/docs/en/expect#tomatchobjectobject) and
just ignore the functions. That would technically work as well. However, I
prefer the asymetric matcher in this case because I'm able to maintain
confidence that these functions are always included.

### Files

- `src/setupTests.js`
- `src/components/__tests__/modal.js`
- `src/utils/__tests__/use-async.js`

## Extra Credit

### 1. 💯 AHA Testing

[Production deploy](https://exercises-12-testing-hooks-and-components.bookshelf.lol/extra-1)

[AHA Programming](https://kentcdodds.com/blog/aha-programming) stands for "Avoid
Hasty Abstractions" and it suggests that you should "prefer duplication over the
wrong abstraction" and "optimize for change first."
[When applied to testing](https://kentcdodds.com/blog/aha-testing), it can
seriously improve the way the tests can be understood. You can communicate what
matters through the abstractions you write.

Every test for `hooks.js` is asserting on the return value of our hook, which
includes the following properties: `status`, `data`, `error`, `isIdle`,
`isLoading`, `isError`, `isSuccess`, `run`, `reset`, `setData`, and `setError`.

Including all of these problems is not only a bit of a pain, but also makes it
harder to determine the parts that are different between assertions which makes
it harder to understand the intent of the test. Remember, the "customer" of the
test is developers, so you want to make it as easy for them to understand as
possible so they can work out what's happening when a test fails.

Typically you can clean up tests via helper functions or "Test Object Factory"
functions. So we could create a function like this:

```javascript
function getAsyncState(overrides) {
  return {
    data: null,
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,

    error: null,
    status: 'idle',
    run: expect.any(Function),
    reset: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
    ...overrides,
  }
}
```

You can go ahead and do that, or because the object is so simple, you could
simply create that object and manually merge it in each assertion. Whatever you
choose to do, implement it in the tests and observe how much it improves the
readability of each test.

**Files:**

- `src/utils/__tests__/use-async.js`
=======
- [Exercise](https://exercises-13-integration-testing.bookshelf.lol/exercise)
- [Final](https://exercises-13-integration-testing.bookshelf.lol/)

For this exercise, we'll be testing the book screen (`src/screens/book.js`).
This is an authenticated page (you can only see it once you've logged in) which
means you'll need to "log in" before rendering the component. This will be
different depending on the authentication provider you're using, but it's
possible that you'll need to mock out the module you're using to interact with
the provider. For our auth provider, we can set a string value in `localStorage`
with the key: `__auth_provider_token__`.

In addition, because we want to test at as high a level as possible, we'll be
rendering the `App` component with all the `AppProviders`. We'll also want to
mock `window.fetch` so we can respond with fake data, and then we can instruct
our test to wait the loading indicators to go away. Once that's all done, then
we can start interacting with the page.

🦉 You'll want to make sure that react-query's `queryCache` is cleared before
each test. You'll use
[`queryCache.clear()`](https://github.com/tannerlinsley/react-query/tree/66f462c2f9552ca2bbda8ac0fd7595bdb1a4008e#querycacheclear)
to do that.

> NOTE: More recent versions of React Query are easier to test. If you haven't
> already, [watch my video](https://www.youtube.com/watch?v=umJqHUcOaUo)
> demonstrating what changes in later versions of React Query.

💰 Use this to figure out which `window.fetch` requests you should mock out:

```javascript
window.fetch = async (url, config) => {
  console.warn(url, config)
  return Promise.reject(new Error(`NEED TO HANDLE: ${url}`))
}
```

### Files

- `src/__tests__/book-screen.js`

## Extra Credit

### 1. 💯 Create mock server for all fetch requests

[Production deploy](https://exercises-13-integration-testing.bookshelf.lol/extra-1)

You may feel a little uncomfortable with the idea of mocking out `window.fetch`
the way we're doing in that test. In larger applications there could be a LOT of
requests that your components make, or maybe you're using GraphQL and mocking
out fetch like this is not feasible.

The fact is, we've decided to not make real requests because that requires
significantly more setup and makes our tests take a lot longer. However, we
can't get around telling our app the response to the requests that it's going to
be making. We can, however, make it a lot easier to write these mock request
handlers and we're going to use [`msw`](https://github.com/mswjs/msw) to do it.

Let's take a step back. When you're developing your application, you've probably
got a backend server you're interacting with. That backend serves (among other
things) as the intermediary between the client that you're writing and the
database and other services your application is using. Maybe you're working on
both the frontend and the backend. Maybe you're on the same team as the backend
devs. Maybe you're on completely different teams. Maybe you're using services
and their backend devs are at a completely different company.

In any case, it's quite possible that you could be working on features in the
frontend that don't have a backend ready. Or maybe you want to load your
components up in an isolated environment during development (like
[Storybook](https://storybook.js.org/)). Or perhaps you'd like to be able to
continue development of the frontend without a connection to a remote service.
Or maybe the remote service is slower than you like. For a myriad of reasons,
you may find it preferable to not hit the _actual_ backend during development.

This is the problem that [msw](https://github.com/mswjs/msw) was built to solve.
It allows you to create request handlers (regular HTTP calls as well as GraphQL
queries) and return mock responses. It does this using a ServiceWorker, so
you'll see the fetch requests in the network tab, but as long as you have a mock
handler, a real fetch call will not be made and instead your request handler can
handle the request for you.

The bookshelf app you've been working on is using this mechanism right now. It's
implemented a "database" (which is really just `localStorage`) and when you make
network requests, a client-side request handler is called which interacts
directly with that database layer. In production, you can swap `msw` with a real
production server (after running your true E2E tests to make sure things are
good to go) and you've got yourself a great development experience.

> 💰 If you'd like to check out how all of this works, start in
> `src/test/server`

So, bringing this back to testing, because we've essentially re-implemented the
basics of our backend with msw handlers, we can use those _exact same_ handlers
for our tests as well using `msw`'s `setupServer` function:

```javascript
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'

const mockServer = setupServer(...handlers)
mockServer.listen()
// ready to start accepting requests
// and when you're done, call `mockServer.close()`
```

That's already handled for you in `src/test/server/test-server.js`. So all you
need to do is import the `server` from `test/server` and you'll be able to start
it up and stop it.

So for this extra credit, let's delete all the `window.fetch = ...` stuff and
use the mock server that we previously configured in our `src/setupTests.js`
instead! NOTE: you don't need to worry about setting it up because we already
did it in a previous exercise. Just delete the `fetch` mock and they'll be
handled by `msw` already.

Another thing you'll need to do is "seed" the database that our `msw` handlers
interact with with data so when requests are handled, the database is ready with
the data. So you're going to want these:

```javascript
import * as usersDB from 'test/data/users'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'
```

To create an authenticated user, do this:

```javascript
const user = buildUser()
await usersDB.create(user)
const authUser = await usersDB.authenticate(user)
// this is what our auth provider does to persist the user's
// logged in state so it can give us a token without making a request
// every provider will be different and you'll need to adjust this
// to whatever they do (you may even have to mock more of their functions).
window.localStorage.setItem(auth.localStorageKey, authUser.token)
```

You'll also want to actually _insert_ the fake book into the database as well.
Use `booksDB.create` to do that.

Learn more about this from
[Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch)

As a part of this, you'll want to cleanup the databases, you can do this with

```javascript
await usersDB.reset()
await booksDB.reset()
await listItemsDB.reset()
```

**Files:**

- `src/__tests__/book-screen.js`

### 2. 💯 Write second integration test

[Production deploy](https://exercises-13-integration-testing.bookshelf.lol/extra-2)

For this extra credit, we're going to add another test. Here's a title for you
to use:

> can create a list item for the book

You'll do mostly the same stuff in the first part of the test (the "arrange"
portion), and once the app is ready to go, then click on the "Add to list"
button, wait for the app to settle again (loading indicators should be gone),
then verify the right elements appear on the screen now that this book has a
list item.

> 💰 It may be a good idea to pull the app up and see what changes when you're
> on the book screen and add a book to your reading list. That's what you're
> doing in this test.

**Files:**

- `src/__tests__/book-screen.js`

### 3. 💯 Create test utilities

[Production deploy](https://exercises-13-integration-testing.bookshelf.lol/extra-3)

You may have noticed you're doing a bit of the same work in multiple tests. This
extra credit is all about
[AHA Programming](https://kentcdodds.com/blog/aha-programming) applied to
[testing](https://kentcdodds.com/blog/aha-testing). See if you can identify a
few places for abstraction between these two tests.

> 💰 In my solution I have a custom `render`, a `loginAsUser`, and a
> `waitForLoadingToFinish`

**Files:**

- `src/__tests__/book-screen.js`

### 4. 💯 Move test utilities to global utils

[Production deploy](https://exercises-13-integration-testing.bookshelf.lol/extra-4)

Typically, you're going to want to use utilities like the ones we made in the
last extra credit in lots more tests throughout the app. Not only the utilities,
but also things like cleaning up the `queryCache`.

For the setup with our test hooks (our `afterEach`), we can put those kinds of
general things in the `src/setupTests.js` file and those will get run
automatically for each test. So in this extra credit move things from our test
file to that file.

For the utilities, we have a file in `src/test/app-test-utils.js` which you can
use for these kinds of utilities. Let's turn that into the test utils talked
about in the React Testing Library docs under the
["Custom Render"](https://testing-library.com/docs/react-testing-library/setup#custom-render)
section.

By the end of this extra credit, you should be able to swap your import of
`@testing-library/react` with an import from `test/app-test-utils`.

**Files:**

- `src/__tests__/book-screen.js`
- `src/setupTests.js`
- `src/test/app-test-utils.js`

### 5. 💯 Cover more use cases

[Production deploy](https://exercises-13-integration-testing.bookshelf.lol/extra-5)

Alright, now that we have some solid utilities and setup going, let's test more
use cases for our Book Screen. Here are a few test titles you might think about
writing tests for:

> 1. can remove a list item for the book
> 2. can mark a list item as read
> 3. can edit a note

For these, you _could_ have them each create a list item as part of the test,
but that's what we call "over testing" because that user flow has already been
well covered by an existing integration test. So instead, you can interact
directly with the database as part of the setup for your test. Here's how that
might look:

```javascript
const user = await loginAsUser()
const book = await booksDB.create(buildBook())
await listItemsDB.create(buildListItem({owner: user, book}))
```

With that, the book you're loading up already has a listItem associated to it
for the user who's logged in so you should be good to rock and roll.

> 💰 keep in mind that to mark a list item as read, it needs to not have
> finishDate: `buildListItem({owner: user, book, finishDate: null})`

Editing the note works just fine, but you do have to wait 300ms for the debounce
feature. See if you can figure out how to use `jest.useFakeTimers()` and
`jest.useRealTimers()` to speed that up (it takes fewer changes than you think).

💰 Long after recording the videos, I discovered a critical issue that lead to
some flaky tests when using fake timers and react-query together. After much
agonizing pain, I finally figured out the solution to the problem and I've
updated the codebase to handle this. I suggest for this extra credit you take a
look at the `src/setupTests.extra-5.js` file and just copy/paste the `afterEach`
at the end of that rather than subject yourself to the same pain I went through.
Hopefully the code comments there help give you an idea of what's going on
there.

> NOTE: In the latest version of `@testing-library/user-event`, if you use fake
> timers (like we will in this extra credit) you need to create a special
> instance of userEvent that uses the `advanceTimers` option to call
> `jest.runOnlyPendingTimers`. You can copy this:
>
> ```js
> const fakeTimerUserEvent = userEvent.setup({
>   advanceTimers: () => jest.runOnlyPendingTimers(),
> })
> ```
>
> Stick that right under the imports and the use
> `const fakeTimerUserEvent = userEvent.setup({ advanceTimers: () => jest.runOnlyPendingTimers(), }) `
> in place of `userEvent` for any tests that use `jest.useFakeTimers()`. For
> example:
>
> ```diff
> - await userEvent.click(element)
> + await fakeTimerUserEvent.click(elemenet)
> ```

**Files:**

- `src/__tests__/book-screen.js`
- `src/setupTests.js`

### 6. 💯 Create a component-specific utility

[Production deploy](https://exercises-13-integration-testing.bookshelf.lol/extra-6)

Sometimes when you're testing a screen, you'll notice you're doing some things
repeatedly that are specific to that screen and not generally applicable to
other screens. When that happens, it could make sense to create testing
utilities for that screen.

Create a function like this:

```javascript
async function renderBookScreen({user, book, listItem} = {}) {
  // do stuff here
}
```

This should handle automatically creating a user, book, and listItem if they're
not provided.

> 💰 if I don't _want_ a listItem for a book, then I set it to `null`
> explicitly. Handle that in your implementation.

**Files:**

- `src/__tests__/book-screen.js`

### 7. 💯 Write error state tests

[Production deploy](https://exercises-13-integration-testing.bookshelf.lol/extra-7)

Let's write two more tests for error cases:

> 1. shows an error message when the book fails to load
> 2. note update failures are displayed

For the first, you'll need to create a book with an ID that doesn't actually
exist in the database (and that will not have a `listItem` so set that to `null`
as well). Then you can assert that an error message appears.

For the second, you'll need to add a server handler _after_ the server has
already started. Try:

```javascript
const apiURL = process.env.REACT_APP_API_URL

const testErrorMessage = '__test_error_message__'
server.use(
  rest.put(`${apiURL}/list-items/:listItemId`, async (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({status: 400, message: testErrorMessage}),
    )
  }),
)
```

Good luck!

**Files:**

- `src/__tests__/book-screen.js`
>>>>>>> 459d74fdddc904da339c6619ef4937bd302cc6ae

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

<<<<<<< HEAD
https://ws.kcd.im/?ws=Build%20React%20Apps&e=12%3A%20Testing%20Hooks%20and%20Components&em=
=======
https://ws.kcd.im/?ws=Build%20React%20Apps&e=13%3A%20Integration%20Testing&em=
>>>>>>> 459d74fdddc904da339c6619ef4937bd302cc6ae
