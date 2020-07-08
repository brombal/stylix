# Stylix ⚛ Fun React Styling!

Documentation in progress.

## Getting started

**Install it:**

```
npm i -S github:brombal/stylix
```

**Import it:**

```
import $ from 'stylix';
```

You can name the import anything you want, but we use `$` for brevity in the documentation.

**Use it:**

Create a `<StylixProvider>` wrapper near the top of your app hierarchy. You generally only need one
of these in your app, but each instance will operate its own `<style>` element.

Optionally, also add a `<StylixTheme>` wrapper. This enables you to create a theme object and
specify media queries.

> TODO: StylixProvider and StylixTheme will be merged for more convenience.

```jsx
import $, { StylixProvider, StylixTheme } from 'stylix';

function App() {
  return (
    <StylixProvider>
      <StylixTheme theme={{ ... }} media={[...]}>
        <div>...</div>
      </StylixTheme>
    </StylixProvider>
  );
}
```

### Basic styles

Basic html elements can be created using `<$.div>`, `<$.span>`, etc. These elements accept all css
properties (as hyphenated or camelCase names).

```jsx
<$.div color="red" font-weight="bold" fontSize={24}>
  ...
</$.div>
```

Numeric values (such as `{24}`) are interpreted as pixel values where appropriate (e.g. `margin`,
`padding`, `font-size`, etc).

### Media queries

If the `<StylixTheme>` wrapper is present, it can specify an array of media queries:

```jsx
<StylixTheme media={['(max-width: 1024px)', '(min-width: 1025px)']}>
  <$.div display="flex" flex-direction={['column', 'row']}>
    ...
  </$.div>
</StylixTheme>
```

Array values on any css prop will then only apply to the corresponding entries in the nearest
`<StylixTheme>`'s media queries.

If an array prop value contains more entries than the `<StylixTheme>`'s media queries, those styles
will apply without any media query specified.

### Theming

The `<StylixTheme>` wrapper can specify a theme object.

```jsx
const myTheme = {
  color: 'blue'
};

...

<StylixTheme theme={myTheme}>
  <$.div color={theme => theme.color}>
    ...
  </$.div>
</StylixTheme>
```

**Note:** For performance reasons, it is important that the theme object is pre-defined and not
recreated on each render.

As in the example, you can access the current theme using functional prop values.

You can also access the theme using the `useStylixThemeContext()` hook.

```jsx
const stylixContext = useStylixThemeContext();
console.log(stylixContext.theme.color);
```

You can nest `<StylixTheme>` wrappers to override or extend the current theme object. Theme objects
are deep-merged, so child instances of `<StylixTheme>` can override theme values from parent
instances.

```jsx
const myBlueTheme = {
  color: 'blue',
};

const myRedTheme = {
  color: 'red',
};

// ...

<StylixTheme theme={myBlueTheme}>
  <$.div color={(theme) => theme.color}>
    blue text!
    <StylixTheme theme={myRedTheme}>
      <$.div color={(theme) => theme.color}>red text!</$.div>
    </StylixTheme>
  </$.div>
</StylixTheme>;
```

**Note** theme objects are not styles. They can be an object of any structure; it is up to you to
use the object to create styles as desired.

Functional prop values can also return arrays, to combine the usage of theme objects with media
queries:

```jsx
const myTheme = {
  largeText: 24,
  smallText: 16,
};

...

<StylixTheme theme={myBlueTheme} media={['(max-width: 1024px)', '(min-width: 1025px)']}>
  <$.div color={(theme) => [theme.smallText, theme.largeText]}>
    text!
  </$.div>
</StylixTheme>
```

### Complex styles

All Stylix elements have a `$css` prop that accepts additional string- or object-based styles,
including extended syntax support for nested selectors:

```jsx
import $, { css } from 'stylix';

<$.div
  $css={css`
    a {
      color: green;

      &:hover {
        color: blue;
      }
    }
  `}
>
  <a href="...">...</a>
</$.div>;
```

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

The `$css` prop can also accept object values, and offers many of the same advantages as the `css`
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

### Plugins

Stylix is built on [postcss](https://postcss.org/), and can use any postcss plugins with the
`<StylixProvider>` `plugins` prop:

```jsx
import $, { StylixProvider } from 'stylix';
import postcssRebeccaPurple from 'postcss-color-rebeccapurple';

const rebeccapurple = postcssRebeccaPurple();

<StylixProvider plugins={[rebeccapurple]}>
  <$.div color="rebeccapurple">...</$.div>
</StylixProvider>;
```

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
