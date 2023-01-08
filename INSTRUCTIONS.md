# Render a React App

# Style React Components

# Make HTTP Requests

## 📝 Your Notes

Elaborate on your learnings here in `INSTRUCTIONS.md`

## Background

The first step to any React app is to create a component and render it to the
page. In modern applications with modern tools, this means you'll import React
and ReactDOM and use them to create React elements, and render those to a `div`.
======= There are many ways to style React applications, each approach comes
with its own trade-offs, but ultimately all of them comes back stylesheets and
inline styles.

Because we're using webpack, we can import css files directly into our
application and utilize the cascading nature of CSS to our advantage for some
situations.

After developing production applications at scale, I've found great success
using a library called [emotion 👩‍🎤](https://emotion.sh). This library uses an
approach called "CSS-in-JS" which enables you to write CSS in your JavaScript.

There are a lot of benefits to this approach which you can learn about from

- [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [Maintainable CSS in React](https://www.youtube.com/watch?v=3-4KsXPO2Q4&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

There are two ways to use emotion, and typically you use both of them in any
given application for different use cases. The first allows you to make a
component that "carries its styles with it." The second allows you to apply
styles to a component.

### Making a styled component with emotion

Here's how you make a "styled component":

```javascript
import styled from '@emotion/styled'

const Button = styled.button`
  color: turquoise;
`

// <Button>Hello</Button>
//
//     👇
//
// <button className="css-1ueegjh">Hello</button>
```

This will make a button who's text color is `turquoise`. It works by creating a
stylesheet at runtime with that class name.

You can also use object syntax (this is my personal preference):

```javascript
const Button = styled.button({
  color: 'turquoise',
})
```

You can even accept props by passing a function and returning the styles!

```javascript
const Box = styled.div(props => {
  return {
    height: props.variant === 'tall' ? 150 : 80,
  }
})

// or with the string form:

const Box = styled.div`
  height: ${props => (props.variant === 'tall' ? '150px' : '80px')};
`

// then you can do:
// <Box >
```

There's lot more you can do with creating styled components, but that should get
you going for this exercise.

📜 https://emotion.sh/docs/styled

### Using emotion's css prop

The styled component is only really useful for when you need to reuse a
component. For one-off styles, it's less useful. You inevitably end up creating
components with meaningless names like "Wrapper" or "Container".

Much more often I find it's nice to write one-off styles as props directly on
the element I'm rendering. Emotion does this using a special prop and a custom
JSX function (similar to `React.createElement`). You can learn more about how
this works from emotion's docs, but for this exercise, all you need to know is
to make it work, you simply add this to the top of the file where you want to
use the `css` prop:

```javascript
/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
```

With that, you're ready to use the CSS prop anywhere in that file:

```jsx
function SomeComponent() {
  return (
    <div
      css={{
        backgroundColor: 'hotpink',
        '&:hover': {
          color: 'lightgreen',
        },
      }}
    >
      This has a hotpink background.
    </div>
  )
}

// or with string syntax:

function SomeOtherComponent() {
  const color = 'darkgreen'

  return (
    <div
      css={css`
        background-color: hotpink;
        &:hover {
          color: ${color};
        }
      `}
    >
      This has a hotpink background.
    </div>
  )
}
```

Ultimately, this is compiled to something that looks a bit like this:

```javascript
function SomeComponent() {
  return <div className="css-bp9m3j">This has a hotpink background.</div>
}
```

With the relevant styles being generated and inserted into a stylesheet to make
this all work.

📜 https://emotion.sh/docs/css-prop

> If the `/** @jsx jsx */` thing is annoying to you, then you can also install
> and configure a
> [babel preset](https://emotion.sh/docs/@emotion/babel-preset-css-prop) to set
> it up for you automatically. Unfortunately for us, `react-scripts` doesn't
> support customizing the babel configuration.
>
> Note also that for this to work, you need to disable the JSX transform feature
> new to React 17. We do this in the `.env` file with the
> `DISABLE_NEW_JSX_TRANSFORM=true` line.
>
> > > > > > > # ef80adb8ec75d25a42e6caf4065c62d0c4360881
> > > > > > >
> > > > > > > Our app wouldn't be very interesting without the ability to
> > > > > > > request data from a backend for the user to view and interact
> > > > > > > with. The way to do this in the web is using HTTP with the
> > > > > > > `window.fetch` API. Here's a quick simple example of that API in
> > > > > > > action:

```javascript
window
  .fetch('http://example.com/movies.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

All the HTTP methods are supported as well, for example, here's how you would
POST data:

```javascript
window
  .fetch('http://example.com/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // if auth is required. Each API may be different, but
      // the Authorization header with a token is common.
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data), // body data type must match "content-type" header
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

If the request fails with an unsuccessful status code (`>= 400`), then the
`response` object's `ok` property will be false. It's common to reject the
promise in this case:

```javascript
window.fetch(url).then(async response => {
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
})
```

It's good practice to wrap `window.fetch` in your own function so you can set
defaults (especially handy for authentication). Additionally, it's common to
have "clients" which build upon this wrapper for operations on different
resources.

Integrating this kind of thing with React involves utilizing React's `useEffect`
hook for making the request and `useState` for managing the status of the
request as well as the response data and error information.

You might consider making the network request in the event handler. In general I
recommend to do all your side effects inside the `useEffect`. This is because in
the event handler you don't have any possibility to prevent race conditions, or
to implement any cancellation mechanism.

📜 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

## Exercise

Production deploys:

- [Exercise](https://exercises-01-bootstrap.bookshelf.lol/exercise)
- [Final](https://exercises-01-bootstrap.bookshelf.lol/)

👨‍💼 I'm excited to get started with you! Let's start out by rendering our awesome
logo and the title of our app. We'll eventually want to allow people to login so
let's also render Login and Register buttons.

### Files

- [Exercise](https://exercises-02-styles.bookshelf.lol/exercise)
- [Final](https://exercises-02-styles.bookshelf.lol/)

👨‍💼 Our users are complaining that the app doesn't look very stylish. We need to
give it some pizazz! We need a consistent style for our buttons and we need our
form to look nice.

Your job in this exercise is to create a styled `button` component that supports
the following API:

```javascript
<Button variant="primary">Login</Button>
<Button variant="secondary">Register</Button>
```

Then you can use that for all the buttons.

Once you're finished with that, add support for the `css` prop and then use it
to make the app we have so far look better.

You may also find a few other cases where making a styled component might be
helpful. Go ahead and make styled components and use the css prop until you're
happy with the way things look.

**Don't feel like it must be perfect or exactly the same as the final**. Feel
free to express your own design taste here. Remember that the point of this
exercise is for you to learn how to use emotion to style React applications in a
consistent way.

### Files

- `src/components/lib.js`

- `src/index.js`

## Extra Credit

### 1. 💯 use the emotion macro

[Production deploy](https://exercises-02-styles.bookshelf.lol/extra-1)

Take a look at the class names that emotion is generating for you right now.
There are two kinds:

1. `css-1eo10v0-App`
2. `css-1350wxy`

The difference is the first has the name of the component where the css prop
appears and the second doesn't have any sort of label. A label can help a lot
during debugging. The `css` prop gets the label for free, but to get the label
applied to styled components, you need to use a special version of the styled
package called a "macro".

```diff
- import styled from '@emotion/styled'
+ import styled from '@emotion/styled/macro'
```

Once you've done that, then all your class names should have a label!

📜 Learn more about macros:

- https://emotion.sh/docs/babel-macros
- https://github.com/kentcdodds/babel-plugin-macros

**Files:**

- `src/components/lib.js`

### 2. 💯 use colors and media queries file

[Production deploy](https://exercises-02-styles.bookshelf.lol/extra-2)

Emotion has a fantastic theming API (📜 https://emotion.sh/docs/theming) which
is great for when users can change the theme of the app on the fly. You can also
use CSS Variables if you like.

In our case, we don't support changing the theme on the fly, but we still want
to keep colors and breakpoints consistent throughout the app. So we've defined
all our colors in `styles/colors.js` and media-queries in
`styles/media-queries.js`. So find all the places you're using those values and
replace them with a reference to the values exported from those modules.

💰 Here's a tip:

```javascript
import * as mq from 'styles/media-queries'

// you can use a media query in an object like so:
// {
//   [mq.small]: {
//     /* small styles */
//   }
// }

// or in a string like so:
// css`
//   ${mq.small} {
//     /* small styles */
//   }
// `
```

📜 https://emotion.sh/docs/media-queries

**Files:**

- `src/components/lib.js`

### 3. 💯 make a loading spinner component

[Production deploy](https://exercises-02-styles.bookshelf.lol/extra-3)

Emotion fully supports animations and keyframes. Try to create a spinner
component using this API. For now, you can render it alongside the login button.

You can get a spinner icon via:

```javascript
import {FaSpinner} from 'react-icons/fa'

// 💰 To make a regular component a "styled component" you can do:
// const Spinner = styled(FaSpinner)({/* styles here */})
```

📜 https://emotion.sh/docs/keyframes

💰 https://stackoverflow.com/a/14859567/971592

**Files:**

- `src/components/lib.js`
- # `src/index.js`
- [Exercise](https://exercises-03-data-fetching.bookshelf.lol/exercise)
- [Final](https://exercises-03-data-fetching.bookshelf.lol/)

👨‍💼 Our users are getting restless and want to start looking at some books, so
we're putting our login flow to the side for a moment so we can work on the book
search feature. The backend is ready to go for this and we've already set up an
environment variable which we can use in our code for the API url (you can see
that in `.env` and `.env.development`). The URL for the search API is:

```javascript
const endpoint = `${process.env.REACT_APP_API_URL}/books?query=Voice%20of%20War`
```

Making a request to this endpoint will return this data:

```json
{
  "books": [
    {
      "title": "Voice of War",
      "author": "Zack Argyle",
      "coverImageUrl": "https://images-na.ssl-images-amazon.com/images/I/41JodZ5Vl%2BL.jpg",
      "id": "B084F96GFZ",
      "pageCount": 372,
      "publisher": "Self Published",
      "synopsis": "..."
    }
  ]
}
```

We've also already designed the page. All that's left is to wire up our design
with the backend. But we've never made a request to the backend yet so you'll
need to create the API `client` function that we'll use for making all requests
to our API (like searching books). Once that's ready, you can use it in your
component.

### Files

- `src/discover.js`
- `src/utils/api-client.js`

## Extra Credit

### 1. 💯 handle failed requests

[Production deploy](https://exercises-03-data-fetching.bookshelf.lol/extra-1)

Our backend developers try really hard to give you the data you need, but
sometimes things just fail (💰 especially if you send the word "FAIL" as the
query... go ahead, try it).

Add support for showing the user helpful information in the event of a failure.
Our designer gave us this which you can use for the UI:

For the search icon:

```javascript
// get FaTimes from react-icons
<FaTimes aria-label="error" css={{color: colors.danger}} />
```

```javascript
// display this between the search input and the results
{
  isError ? (
    <div css={{color: colors.danger}}>
      <p>There was an error:</p>
      <pre>{error.message}</pre>
    </div>
  ) : null
}
```

💰 I wasn't joking. For some reason every time you send the backend the word
"FAIL" it results in a failure. Our backend devs are completely baffled, but it
sure makes it easier for you to test the error state out!

**Files:**

- `src/utils/api-client.js`
- `src/discover.js`

### 2. 💯 use the useAsync hook

[Production deploy](https://exercises-03-data-fetching.bookshelf.lol/extra-2)

After you finished with everything, one of the other UI devs 🧝‍♀️ was reviewing
your PR and asked why you didn't use the `useAsync` hook she wrote last week.
You respond by palming your face 🤦‍♂️ and go back to the drawing board.

`useAsync` is slightly different from what you've built. Here's an example:

```javascript
import {useAsync} from 'utils/hooks'

const {data, error, run, isLoading, isError, isSuccess} = useAsync()

// in an event handler/effect/wherever
run(doSomethingThatReturnsAPromise())
```

This seems to handle your use case well, so let's swap your custom solution with
your co-worker's `useAsync` hook.

**Files:**

- `src/discover.js`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Build%20React%20Apps&e=01%3A%20Render%20a%20React%20App&em=
https://ws.kcd.im/?ws=Build%20React%20Apps&e=02%3A%20Style%20React%20Components&em=
https://ws.kcd.im/?ws=Build%20React%20Apps&e=03%3A%20Make%20HTTP%20Requests&em=
