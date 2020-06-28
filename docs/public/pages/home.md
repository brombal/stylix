# Welcome!

**Stylix** is a new approach to styling React apps that leverages the power of the framework you
already know and love.

Stylix simply uses **props** to create styles. If you are familiar with React, you already know how
to use Stylix, and many advanced styling features (like dynamic styles and themes) are possible
using just basic React concepts.

```typescript jsx
// sandbox:config:{ "iframeStyle": "width: 600px; height: 480px; border: 0", "rootStyle": "flex-direction: column-reverse", "codeStyle": "flex: 1 1 auto; border-radius: 4px", "resultStyle": "flex: 0 0 auto; padding-bottom: 30px" }
const Button = ({ primary, ...other }) => (
  <Stylix.button
    background={primary ? '#ad1457' : 'white'}
    border="2px solid #ad1457"
    padding="10px 20px"
    border-radius={4}
    color={primary ? 'white' : '#ad1457'}
    font="inherit"
    font-size="14pt"
    width="12em"
    cursor="pointer"
    {...other} // contains a margin and onClick prop
  />
);
// sandbox:split:hidden
export default (
  <>
    <Button
      primary
      margin-right={20}
      onClick={() => window.history.pushState({}, '', '/stylix/getting-started')}
    >
      Getting Started
    </Button>
    <Button onClick={() => (window.location.href = 'https://brombal.github.io/stylix')}>
      Stylix on GitHub
    </Button>
  </>
);
```

Simple! There's no new syntax to learn. In fact, if you know React, there isn't really anything new
here. We even demonstrated two powerful features already, with only the use of basic React concepts:

- [Dynamic styles](/stylix/dynamic-styles) (the `primary` prop determined the button color)
- [Style overrides](/stylix/style-overrides) (the `margin-right` on the left button was passed
  directly to the Button component)

## Why Stylix?

Stylix is just one of many solutions out there for adding styles to your React apps. No solution is
right for every project, but Stylix offers the following advantages:

- **No more CSS class names** — Naming CSS classes in a consistent and concise manner is a challenge
  for both teams and individual developers. And the time spent mentally switching hundreds of times
  per day between different language syntaxes and structural concepts can really add up.

- **All React code, all the time** - plain **CSS** and its variants (Sass, Less, Stylus, etc) are
  traditional solutions, but offer little in terms of integration with React. Build tools such as
  Webpack are necessary to parse CSS files; dynamic styles (based on state or props) are difficult;
  and CSS generally has structural concepts and best-practices that are often at odds with the
  component-based structure of a React app.

- **No new syntax** — While solutions that use tagged template literals (i.e. ` css`` `) or
  JavaScript objects, such as **styled-components** and **emotion**, are a step in the right
  direction, they introduce additional syntax and programming patterns with their own learning
  curves. Stylix generally tries to solve problems without introducing new syntax or concepts, but
  rather by enabling you to use the features you are _already familiar with_ in React.
