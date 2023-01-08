<<<<<<< HEAD
# Render a React App
=======
# Style React Components
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881

## 📝 Your Notes

Elaborate on your learnings here in `INSTRUCTIONS.md`

## Background

<<<<<<< HEAD
The first step to any React app is to create a component and render it to the
page. In modern applications with modern tools, this means you'll import React
and ReactDOM and use them to create React elements, and render those to a `div`.
=======
There are many ways to style React applications, each approach comes with its
own trade-offs, but ultimately all of them comes back stylesheets and inline
styles.

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
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881

## Exercise

Production deploys:

<<<<<<< HEAD
- [Exercise](https://exercises-01-bootstrap.bookshelf.lol/exercise)
- [Final](https://exercises-01-bootstrap.bookshelf.lol/)

👨‍💼 I'm excited to get started with you! Let's start out by rendering our awesome
logo and the title of our app. We'll eventually want to allow people to login so
let's also render Login and Register buttons.

### Files

=======
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
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881
- `src/index.js`

## Extra Credit

<<<<<<< HEAD
### 1. 💯 Use `@reach/dialog`

[Production deploy](https://exercises-01-bootstrap.bookshelf.lol/extra-1)

👨‍💼 When the user clicks "Login" or "Register", we should open a modal with a
form for them to provide their username and password.

In this extra credit, get the `Dialog` component from `@reach/dialog` and make
it open when the user clicks the Login or Register button. It's a fantastic
component with a great API and fantastic accessibility characteristics.

📜 https://reacttraining.com/reach-ui/dialog

💰 as with everything, there are many ways to do this. For me, I actually render
two individual dialogs and toggle which is open based on a `openModal` state
which can be set to `none`, `login`, or `register`.

💰 Don't forget to include the styles: `import '@reach/dialog/styles.css'`

**Files:**

- `src/index.js`

### 2. 💯 Create a LoginForm component

[Production deploy](https://exercises-01-bootstrap.bookshelf.lol/extra-2)

👨‍💼 The user should be able to login or register by providing a username and
password.

For this one, create a `LoginForm` component which renders a form accepting a
username and password. When the user submits the form, it should call an
`onSubmit` prop with the `username` and `password`. Here's how it will be used:

```javascript
function Example() {
  function handleSubmit(formData) {
    console.log('login', formData)
  }
  return <LoginForm onSubmit={handleSubmit} buttonText="Login" />
}
```

That should render a form where the submit button says "Login" and when the user
clicks it, you'll get a console.log with the form's data.

**Files:**

=======
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
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881
- `src/index.js`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

<<<<<<< HEAD
https://ws.kcd.im/?ws=Build%20React%20Apps&e=01%3A%20Render%20a%20React%20App&em=
=======
https://ws.kcd.im/?ws=Build%20React%20Apps&e=02%3A%20Style%20React%20Components&em=
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881
