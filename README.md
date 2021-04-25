# Stylix ⚛ Fun React Styling!

Stylix is a core-level library that lets you style your app using props and other React-friendly
features:

```jsx
<$.div color="#0066FF" font="24px Open Sans, sans-serif" background-color="#CCFFEE">
  Welcome to Stylix!
</$.div>
```

At first, this may seem like a step backwards in terms of separation of concerns. But think about
it: you already merge your JavaScript and HTML markup together (which was once "forbidden") when you
switched to React. Why not your CSS too?

It might also seem bad for code reusability. But React has already redefined the way we structure
code. When you start to think about styles as an _equally important_ aspect of your React code
instead of relegating them to external files (with a completely different syntax, code structure,
and idioms), you can write styles—just like markup and business logic—in ways that take advantage of
React concepts and features that promote reusable, concise, and maintainable code.

## Getting started

**Install it:**

```
npm i -S github:brombal/stylix
```

**Import it:**

```
import $ from 'stylix';
```

You can name the import anything you want, but we like using `$` for brevity.

**Use it:**

Create a `<StylixProvider>` wrapper near the top of your app hierarchy, then use the Stylix DOM
components to create styled elements:

```jsx
import $, { StylixProvider } from 'stylix';

function App() {
  return (
    <StylixProvider>
      <$.div color="red" font-size={24} background-color="yellow">
        text
      </$.div>
    </StylixProvider>
  );
}
```

---

Let's dive right into how to do some basic styling. If you want to see more on how to configure
Stylix, check out [Configuration](#Configuration) below.

## Basics

Stylix provides all the standard DOM elements as properties of `$`:

```jsx
<$.div>
  <$.p>
    This is paragraph text with a <$.a href="#">link.</$.a>
  </$.p>
</$.div>
```

Et cetera. Of course, it's only necessary to use these components if you want to style them.

Stylix components accept all standard CSS properties (as hyphenated or camelCase names). Any other
unrecognized prop will be passed to the underlying component or DOM element. Numeric values (such as
`{24}`) are interpreted as pixel values where appropriate (e.g. `margin`, `padding`, `font-size`,
etc).

```jsx
<$.div color="red" font-weight="bold" fontSize={24}>
  Bold red 24px text!
</$.div>
```

You can also style custom components. Any component that accepts a className prop can be passed to
the `$el` prop of the `$` component:

```jsx
<$ $el={MyComponent} color="red" font-weight="bold" fontSize={24}>
  ...
</$>
```

The `$el` prop is great for 3rd-party components, but your own components can more easily accept
Stylix props using the spread (`...`) operator:

```jsx
function PurpleHeader(props) {
  const { children, ...styles } = props;

  // Notice how the ordering of the props can be utilized:
  // `color` cannot be overridden by the passed-in props - PurpleHeader is always purple!
  return (
    <$.div font-weight="bold" fontSize={24} {...styles} color="purple">
      {children}
    </$.div>
  );
}

function Main() {
  // Notice that font-size here overrides the prop in PurpleHeader.
  return <PurpleHeader font-size={30}>...</PurpleHeader>;
}
```

React's support for the spread operator lets you easily make your own styled components both
reusable and customizable.

---

Now that we have some basics down, let's go back and look at the configuration options.

## Configuration

The `<StylixProvider>` component is used to configure Stylix and should appear near the top of your
app's component hierarchy. You generally only need one of these elements—and they **can't** be
nested.

> Having multiple `<StylixProvider>` elements would allow each one to have its own configuration and
> operate its own `<style>` node, etc. but this would be a rare usage scenario—perhaps useful to
> build a component library 😉

The `<StylixProvider>` component accepts the following props (all of them are optional):

- `id: string` - An optional string identifier used as the `<style>` element's `id` attribute and
  generated className prefix.

- `devMode: boolean` - If true, outputs CSS as a `<style>` element's innerHTML property so they can
  be viewed in the browser's inspector. Otherwise, the more performant stylesheet API is used. By
  default, the value is false when `process.env.NODE_ENV === 'production'` and true otherwise.

- `plugins: any[]` - An array of Stylix plugins. See **Plugins** below.

- `styleElement: HTMLStyleElement` - If you want to explicitly tell Stylix to use an existing
  `<style>` DOM node to write styles to, you can specify it here. By default, Stylix will create a
  new style element and append it to the document head.

- `theme: any` - A theme object. See **Themes** below.

- `media: string[]` - A media query array. See **Media queries** below.

---

Now that that's out of the way, let's go back to some more advanced usages of Stylix.

## CSS-like objects

Remember that React props are really just object key/value pairs. Any CSS-like object can be spread
to a Stylix element, even with properties that would normally be considered invalid syntax for a JSX
prop name (like vendor-specific names, such as `-webkit-font-smoothing`). Stylix supports nested CSS
structures (similar to Sass, Less, JSS, etc), so you can use CSS selectors as property names too.

```jsx
const styles = {
  color: 'red',
  fontWeight: 'bold',

  // JSX-invalid prop names are okay 👌
  '-webkit-font-smoothing': 'antialiased',

  // Nested selectors 👌
  li: {
    listStyleType: 'circle',
  },
  '> :first-child': {
    color: 'red',
  },

  // "&" references 👌
  '&:hover': {
    textDecoration: 'underline',
  },
  'body.is-ie &': {
    display: 'none',
  },
};

// ...spread it!
<$.ul {...styles}>
  <li>Apples</li>
  <li>Oranges</li>
  <li>Bananas</li>
</$.ul>;
```

Stylix generates a class name which is passed to the underlying component. Any nested selectors are
scoped within this class name, and you can use the `&` symbol to refer to it within the selector.

An example of the full HTML and CSS output of the above code might look like this:

```css
/* CSS output - abc123 is the generated class name */
.abc123 {
  color: red;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
}
.abc123 li {
  list-style-type: circle;
}
.abc123 > :first-child {
  color: red;
}
.abc123:hover {
  text-decoration: underline;
}
body.is-ie .abc123 {
  display: none;
}
```

```html
<!-- html output -->
<div class="abc123">...</div>
```

> Keep in mind that some pseudo-selectors will require you to use `&` to achieve the desired
> results. In the above example, notice that `&:hover` was rendered as `.abc123:hover` (no space
> between), but `> :first-child` was rendered as `.abc123 :first-child` (with a space), referring to
> the first child under the `<ul>`.

---

There are yet more ways to add styles to your components (like [the `$css` prop](#the-css-prop)),
but for now let's take a break and look at **theming** and **media queries**.

## Theming

Using the `<StylixProvider>` (or `<StylixTheme>`—see
[what's the difference?](#stylixprovider-vs-stylixtheme---whats-the-difference)), you can provide a
theme object that can be used to pass values to descendent components. Stylix props can then use
functions to access the current theme object:

```jsx
const myTheme = {
  color: 'blue',
};

function Main() {
  // Important: The theme object is defined outside of this component,
  // where it will not be recreated on each render!
  return (
    <StylixTheme theme={myTheme}>
      {/* Access the theme object in any Stylix prop using a function */}
      <$.div color={(theme) => theme.color}>...</$.div>
    </StylixTheme>
  );
}
```

Theme objects themselves are not necessarily CSS-like objects. They can be an object of any
structure; it is up to you to use the object to create styles as desired.

### Use theme functions anywhere

This feature is not limited to Stylix component props. You can provide theme functions deep within
CSS-like objects too—anywhere that a 

### The `useStylixTheme` hook

You can also access the theme object with the `useStylixTheme()` hook:

```jsx
function MyComponent() {
  const theme = useStylixTheme();
  return <$.div color={theme.color}>...</$.div>;
}
```

### Nesting and overriding themes

You can nest `<StylixTheme>` elements to override the current theme object. Theme objects of
descendent `<StylixTheme>` elements are deep-merged with ancestor themes.

```jsx
// Parent.jsx:

const parentTheme = {
  fontSize: 12,
  color: 'blue',
};

function Parent() {
  return (
    <StylixTheme theme={parentTheme}>
      <$.div color={(theme) => theme.color} font-size={(theme) => theme.fontSize}>
        12px blue text!
        <Child />
      </$.div>
    </StylixTheme>
  );
}

// Child.jsx:

const childTheme = {
  color: 'red',
};

function Child() {
  // Notice that childTheme does not have fontSize defined,
  // but the theme object "inherits" it from parentTheme.
  return (
    <StylixTheme theme={childTheme}>
      <$.div color={(theme) => theme.color} font-size={(theme) => theme.fontSize}>
        12px red text!
      </$.div>
    </StylixTheme>
  );
}
```

### `<StylixProvider>` vs `<StylixTheme>` - what's the difference?

A `<StylixProvider>` is the top-level element that defines the configuration for a Stylix context.
You only need one of these elements at the top of your app hierarchy (in most cases), and they
cannot be nested.

A `<StylixTheme>` only provides a theme object and media query array to its descendents (via a React
context). You can define multiple nested `<StylixTheme>` elements to override themes and media
queries anywhere in your app, if you want.

The trick is that a `<StylixProvider>` is _also_ a wrapper around a `<StylixTheme>`, so you can
define the Stylix configuration, theme, and media queries with a single element.

Anywhere that `<StylixTheme>` is referenced in the documentation, you can do the same thing with the
`<StylixProvider>` if it suits your needs.

## Media queries

Media queries can be implemented a few different ways.

### Media query arrays

The most idiomatic way to do this with Stylix is to provide an array of media query strings using
the `<StylixProvider>` element's `media` prop.

Then, any Stylix prop can accept an array of values that correspond to each media query. For
example:

```jsx
<StylixProvider media={['(max-width: 768px)', '(max-width: 1024px)']}>
  <$.ul font-size={[16, 18, 20]}>
    <li>16px on screens up to 768px</li>
    <li>18px on screens up to 1024px</li>
    <li>20px on all other sizes</li>
  </$.ul>
</StylixProvider>
```

The order of media query strings is up to you—the value arrays must simply correspond to the
appropriate media query. Any extra values that do not correspond to a media query array will simply
be treated as not being media-specific.

You can also use an empty string as one of the media queries, and corresponding array values will
also be treated as not media-specific.

```jsx
<StylixProvider media={['', 'max-width: 1024px', 'max-width: 768px']}>
  <$.ul font-size={[20, 18, 16]}>
    <li>20px by default (no media query)</li>
    <li>18px on screens up to 1024px</li>
    <li>16px on screens up to 768px</li>
  </$.ul>
</StylixProvider>
```

#### Overriding media queries

You can override the media query array at any point in your hierarchy using a new `<StylixTheme>`
element:

```jsx
<StylixProvider media={['', 'max-width: 1024px', 'max-width: 768px']}>
  <$.ul font-size={[20, 18, 16]}>
    <li>20px by default (no media query)</li>
    <li>18px on screens up to 1024px</li>
    <li>16px on screens up to 768px</li>
  </$.ul>

  <StylixTheme media={['max-width: 500px', '(min-width: 501px) and (max-width: 1000px)']}>
    <$.ul font-size={[10, 20, 30]}>
      <li>10px on screens up to 500px</li>
      <li>20px on screens between 501px and 1000px</li>
      <li>30 by default (no media query)</li>
    </$.ul>
  </StylixTheme>
</StylixProvider>
```

#### Media query syntax/usage notes

- The outermost parentheses on the entire media query are not necessary, but other parentheses may
  be necessary to separate conditions.

- Higher-index media queries take precedence (have higher CSS specificity) over lower-indexes, so
  even if earlier queries appear more restrictive, they may not override as expected. For example:

  `media={['max-width: 768px', 'max-width: 1024px']}`

  This will probably produce unexpected results at widths under 768px, because `max-width: 1024px`
  takes precedence and therefore will still be applied even at (e.g.) 700px.

### Media arrays in the `$css` prop

Just like style props, the `$css` prop also accepts arrays, and will apply styles according to the
corresponding media query, just like props.

```jsx
<StylixProvider media={['max-width: 1200px', 'min-width: 1201px']}>
  <$.div $css={['font-size: 14px;', 'font-size: 18px;']}>...</$.div>
</StylixProvider>
```

Unlike other style props, however, `$css` can also apply entire media-specific style objects or
strings when given an array:

```jsx
<StylixProvider media={['max-width: 1200px', 'min-width: 1201px']}>
  <$.div
    display="flex"
    $css={[
      {
        fontSize: 14,
        flexDirection: 'column',
      },
      {
        fontSize: 18,
        flexDirection: 'row',
      },
    ]}
  >
    ...
  </$.div>
</StylixProvider>
```

### Plain old `@media` queries

The more traditional approach is to use `@media` queries in the `$css` prop. It is not recommended,
but demonstrates that the option exists in case media query arrays can't handle your needs.

```jsx
<$.div
  $css="
    font-size: 14pt;

    @media (max-width: 1024px) {
      font-size: 10pt; 
    }
  "
>
  ...
</$.div>
```

## Combining themes and media queries

Theme functions can return arrays, so you can utilize theming and media queries in one go:

```jsx
const myTheme = {
  largeText: 24,
  smallText: 16,
};

<StylixTheme theme={myTheme} media={['(max-width: 1024px)', '(min-width: 1025px)']}>
  <$.div color={(theme) => [theme.smallText, theme.largeText]}>
    This text will be 16px on small screens and 24px on large screens.
  </$.div>
</StylixTheme>;
```

Just remember that the prop value must be a function that returns an array, not an array of
functions!

## The `$css` prop

Stylix components have a special `$css` prop to add styles to Stylix components. It is somewhat like
a catch-all for scenarios that can't be handled by regular props or object spreading.

`$css` can accept strings (any valid CSS string that can be parsed by PostCSS):

```jsx
<$.a
  href="/"
  $css="
    text-decoration: none;
    &:hover { color: red; }
  "
>
  Red on hover
</$.a>
```

`$css` can also accept CSS-like objects. Sometimes you may encounter scenarios where simple object
spreading (described above) is not ideal or sufficient. Inlining a CSS object is an example, where
the double curly-brace syntax may strike you as awkward (e.g. `{...{ color: 'blue' }}`). Instead:

```jsx
<$.a
  href="/"
  $css={{
    textDecoration: 'none',
    '&:hover': { color: 'red' },
  }}
>
  Red on hover
</$.a>
```

Another situation is with media arrays. If you want an entire CSS object to only apply to a
particular media query, spreading will not work. In these scenarios, `$css` can accept an array
(just like any Stylix prop), and the entire value will only apply to the corresponding media query:

```jsx
<$.div $css={[mobileStyles, desktopStyles]}>...</$.div>
```

### `$css` all the way down

`$css` is not, in fact, just a React element prop. It is a special property of _any_ CSS-like object
in Stylix. Any styles in an object's `$css` property will effectively be merged into the parent
object. The benefit of `$css` is that it accepts nearly _anything_, including CSS strings, objects,
tagged template literals, arrays (for media queries), and functions (for theme object access).

## `useCss()` hook and CSS template literals

Another powerful feature supported by the `$css` prop is the `useCss()` hook. This hook returns a
JavaScript template literal tag that allows embedding CSS-like objects, theme functions, and media
arrays within a CSS string:

```jsx
import $, { useCss } from 'stylix';

function MyComponent() {
  // Create the template literal tag
  const css = useCss();

  // Example CSS-like object
  const flexbox = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  };

  // Note that the following example could more easily and concisely be implemented with
  // regular props, but is given to demonstrate the abilities of the `css` template literal.
  return (
    <$.div
      $css={css`
        // Embedded CSS-like objects will be converted to CSS strings
        ${flexbox}

        // Functions can be used to access the theme object from the current Stylix context
        color: ${(theme) => theme.color}; 

        // Arrays can be used to apply styles to media queries from the Stylix context
        font-size: ${[24, 20, 16]};
      `}
    >
      ...
    </$.div>
  );
}
```

Because it needs access to the current Stylix context to interpolate theme functions and media
arrays, `useCss` is a React hook and must follow the
[Rules of Hooks](https://reactjs.org/docs/hooks-rules.html).

### Complex styles

All Stylix elements have a `$css` prop that accepts additional string- or object-based styles,
including extended syntax support for nested selectors:

The `$css` prop accepts plain strings, but the `css` template tag offers several advantages:

- IDEs can recognize this tag as containing css and will offer syntax highlighting and
  auto-completion.

- Interpolation of variables, theme functions, and media query arrays:

```jsx
<$.div
  $css={css`
    font-weight: bold; // Literal values
    font-size: ${myFontSize}; // Variables
    color: ${(theme) => theme.color} // Theme functions
    width: ${[768, 1024]}; // Media query arrays
  `}
/>
```

The `$css` prop can also accept object values, which offer many of the same advantages as the `css`
template literal tag:

```jsx
<StylixTheme media={['(max-width: 1024px)', '(min-width: 1025px)']}>
  <$.div
    $css={{
      fontWeight: 'bold',
      fontSize: myFontSize,
      color: (theme) => theme.color,
      width: [768, 1024],

      // Pseudo-selectors
      '&:hover': { textDecoration: 'underline' },

      // Note the use of a pseudo-selector as a key, as well as a media query array
      '&:first-child': [{ color: 'green' }, { color: 'red' }],

      // Nested $css key allows entire sections of css to be restricted to media queries
      $css: [
        { flexDirection: 'column', justifyContent: 'center' },
        { flexDirection: 'row', alignItems: 'center' },
      ],
    }}
  >
    ...
  </$.div>
</StylixTheme>
```

## Plugins

Stylix is built on [PostCSS](https://postcss.org/), and is compatible with just about any PostCSS
plugin.

Stylix already includes a handful of PostCSS plugins that enable support for
[nested styles](https://github.com/postcss/postcss-nested) and
[inline media queries](https://github.com/dimitrinicolas/postcss-inline-media).

You can add additional PostCSS plugins with the `<StylixProvider>` `plugins` prop:

```jsx
import $, { StylixProvider } from 'stylix';
import postcssRebeccaPurple from 'postcss-color-rebeccapurple';

const rebeccapurple = postcssRebeccaPurple();

<StylixProvider plugins={[rebeccapurple]}>
  <$.div color="rebeccapurple">...</$.div>
</StylixProvider>;
```

Any features that plugins provide can generally be used anywhere that CSS-like objects or strings
are accepted (including the `$css` prop).

### Custom style props

If a plugin provides (or allows you to define) custom css properties, you can tell Stylix about them
using the `customProps` prop of `<StylixProvider>`:

```jsx
import $, { StylixProvider } from 'stylix';
import postcssAlias from 'postcss-alias';

<StylixProvider plugins={[postcssAlias]} customProps={['m']}>
  <$
    $global={css`
      @alias {
        m: margin;
      }
    `}
  />
  <$.div m={20}>...</$.div>
</StylixProvider>;
```

Without telling Stylix about custom props, they would be passed through to the component as regular
props or html attributes.

## Development

### Scripts

Many of the scripts present in package.json are atomic scripts that are composed together or run
concurrently by other scripts. The following scripts are the most useful:

- `build` - Builds all library modules (node and browser) to the `dist` folder for production.

- `docs` - Serves the documentation site at `http://localhost:3000/stylix`, and watches all library
  source files, running a development build on changes. The documentation site will pull the Stylix
  library from the local development code. The browser version of the Stylix library is served at
  `http://localhost:8080/stylix.js`.

- `docs:deploy` - Builds and deploys the documentation site to GitHub pages. Note that the
  documentation site will use the locally-built production version of Stylix for the site itself,
  and the code example sandboxes will use the public unpkg version of Stylix.
