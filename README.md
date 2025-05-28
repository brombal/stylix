# Stylix

> React, with style. Add styles to your React apps with props: the easy, natural, and low-learning-curve approach.

Stylix is a CSS-in-JS library built for React developers who want a seamless, intuitive styling experience. With Stylix, you write styles as props on components you already know, staying within the React paradigm you love.

Stylix offers:
- Props-based styling on HTML elements
- Hooks for dynamic and global styles
- Keyframe animations
- Server-side rendering
- An extensible plugin system

## Why Stylix?

We created Stylix to solve common styling pain points in React applications:
- **Co-located styles**: Keep your styles next to your components—no separate CSS files.
- **Familiar API**: Style props feel like any other React prop.
- **Type safety**: Enjoy autocompletion and validation with TypeScript.
- **Zero config**: No extra build steps or CSS preprocessors required.
- **Extensible**: Customize behavior with a flexible plugin system.

## Installation

```bash
npm install @stylix/core
# or
yarn add @stylix/core
```

Peer dependencies: `react`, `react-dom` >= 18.0.0.

## Quick Start

Let's build a simple styled card component to see Stylix in action:

```tsx
import React from 'react';
import { StylixProvider } from '@stylix/core';
import $ from '@stylix/core';

function App() {
  return (
    <StylixProvider>
      <$.div
        padding={20}
        background-color="white"
        border-radius={8}
        box-shadow="0 2px 4px rgba(0,0,0,0.1)"
        max-width={300}
        margin="auto"
      >
        <$.h2 margin-bottom={12} font-size={18} font-weight="600">
          Welcome to Stylix
        </$.h2>
        <$.p color="gray" line-height={1.5}>
          Styling your React app has never been easier.
        </$.p>
      </$.div>
    </StylixProvider>
  );
}
```

In this example:
- We wrap our app in `<StylixProvider>` to enable styling context and automatic style injection.
- We use the `$` export to render styled HTML tags like `<$.div>`, `<$.h2>`, and `<$.p>`.
- We pass CSS properties as props, supporting camelCase and kebab-case syntax.

### Styling Custom Components

When styling custom React components or third-party elements, use the `useStyles` hook to generate a `className`:

```tsx
import React from 'react';
import { useStyles } from '@stylix/core';

function Button({ children }) {
  const cn = useStyles({
    padding: 12,
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'darkblue',
    },
  });
  return <button className={cn}>{children}</button>;
}
```

### Global Styles and Keyframes

Often you need to set up global CSS rules or define animations. Stylix exposes two hooks:

- **`useGlobalStyles`**: Injects global CSS rules into the document.
- **`useKeyframes`**: Generates unique keyframe animation names.

```tsx
import React from 'react';
import { StylixProvider, useGlobalStyles, useKeyframes } from '@stylix/core';
import $ from '@stylix/core';

function GlobalStyle() {
  // Define a spin animation
  const spin = useKeyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  });

  // Apply global CSS rules
  useGlobalStyles([
    { html: { boxSizing: 'border-box' } },
    { '*, *:before, *:after': { boxSizing: 'inherit' } },
    { body: { margin: 0, fontFamily: 'sans-serif' } },
    { '.spin': { animation: `${spin} 1s linear infinite` } },
  ]);

  return null;
}

function App() {
  return (
    <StylixProvider>
      <GlobalStyle />
      <$.div className="spin">🌀 Spinning</$.div>
    </StylixProvider>
  );
}
```


## Features

- **Props-based Styling**: Style any element or component by passing style props.
- **Hooks**: `useStyles`, `useGlobalStyles`, and `useKeyframes` for dynamic, global, and animated styles.
- **Server-side Rendering**: Extract CSS on the server with `RenderServerStyles`.
- **HTML Tags**: `$` export offers all standard HTML tags with built-in style prop support.
- **Plugin System**: Extend and customize styling behavior with a flexible plugin API.
- **Utilities**: `cx` for className composition.

## API Reference

### StylixProvider

Provides styling context, media query definitions, and plugin support to your React tree.

```tsx
import React from 'react';
import { StylixProvider } from '@stylix/core';

<StylixProvider
  media={{
    mobile: (styles) => ({ '@media (max-width: 640px)': styles }),
    desktop: (styles) => ({ '@media (min-width: 1024px)': styles }),
  }}
  plugins={[/* array of StylixPlugin */]}
>
  <App />
</StylixProvider>
```

- `media?: Record<string, (styles: StylixStyles) => StylixStyles>` — Named breakpoints mapping to functions that wrap styles in media queries.
- `plugins?: StylixPlugin[]` — Additional style transformation plugins.

### `$` (Styled HTML Tags)

Stylix exports a default `$` object with all standard HTML tags, pre-wired for style props:

```tsx
import $ from '@stylix/core';

<$.button
  padding="8px 16px"
  background-color="teal"
  color="white"
  border="none"
  border-radius={4}
>
  Click me
</$.button>
```

Supports:
- Any CSS property (camelCase or kebab-case).
- Pseudo-selectors (`:hover`, `:focus`, etc.).
- Responsive props using breakpoint names (e.g., `mobile-padding`).

### useStyles

Generate a unique class name from a style object:

```tsx
import { useStyles } from '@stylix/core';

const className = useStyles({
  margin: 8,
  color: 'rebeccapurple',
  ':hover': { opacity: 0.8 },
  mobile: { display: 'none' }, // uses media queries defined in StylixProvider
});

return <div className={className}>Hover me (hidden on mobile)</div>;
```

Returns a deterministic class name string based on your style object.

### useGlobalStyles

Inject global CSS rules into your document:

```tsx
import { useGlobalStyles } from '@stylix/core';

useGlobalStyles({
  html: { boxSizing: 'border-box' },
  '*, *:before, *:after': { boxSizing: 'inherit' },
  body: { margin: 0, fontFamily: 'sans-serif' },
});
```

Accepts a single style object or an array of objects for grouping rules.

### useKeyframes

Create reusable CSS keyframe animations:

```tsx
import { useKeyframes } from '@stylix/core';

const fadeIn = useKeyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

return <$.div animation={`${fadeIn} 2s ease-in`}>Fade In</$.div>;
```

Returns a unique animation name for use in `animation` props.

### Responsive Styles (Media Queries)

Stylix lets you define custom breakpoints in `StylixProvider` and write responsive style props directly in your components.

#### Define breakpoints

```tsx
<StylixProvider
  media={{
    mobile: (styles) => ({ '@media (max-width: 640px)': styles }),
    desktop: (styles) => ({ '@media (min-width: 1024px)': styles }),
  }}
>
  {/* your app */}
</StylixProvider>
```

#### Use media objects in style props

Specify style props as objects keyed by breakpoint names:

```tsx
<$.div
  padding={{ default: 16, mobile: 8 }}
  color={{ default: 'black', mobile: 'gray' }}
>
  Responsive padding and color!
</$.div>
```

The `default` key provides fallback styles; other keys correspond to your breakpoints.

#### Top-level media prop syntax

You can also use breakpoint names as props to apply multiple styles at once:

```tsx
<$.div
  mobile={{ padding: 8, backgroundColor: 'lightgray' }}
  desktop={{ padding: 24 }}
>
  Alternate syntax
</$.div>
```

Under the hood, Stylix's `mediaObjects` plugin merges these into proper CSS media queries in the generated stylesheet.


### $css (Advanced Selectors & Pseudo-classes)

Use the `$css` prop to pass additional style objects or arrays, enabling nested selectors, pseudo-classes, and complex rules. Always use `&` in selector keys to refer to the current component’s generated class name. Without the `&`, the selector will apply to child elements instead.

```tsx
// $css accepts a StylixStyles object or array of objects
<$.button
  background-color="blue"
  color="white"
  $css={{
    '&:hover': { background-color: 'darkblue' },
    '&:active': { transform: 'scale(0.98)' },
    '.icon': { margin-right: 8 },
  }}
>
  Click me
</$.button>
```

Note: using a selector like `':hover'` without `&` will only apply to child elements. Prefix with `&` to ensure it targets the component itself.

### Plugins

Customize and extend Stylix with your own styling transforms:

```tsx
import React from 'react';
import { StylixProvider, customProps } from '@stylix/core';
import $ from '@stylix/core';

// Define a plugin for horizontal padding shorthand
const spacingPlugin = customProps({
  px: (value) => ({ paddingLeft: value, paddingRight: value }),
});

// Use the plugin in your provider
function App() {
  return (
    <StylixProvider plugins={[spacingPlugin]}>
      <$.div px={20}>Padded horizontally</$.div>
    </StylixProvider>
  );
}
```

Available:
- `defaultPlugins`: Built-in plugins for media queries, custom props, and more.
- `customProps`: Factory to create custom style prop mappings.
- Types: `StylixPlugin`, `StylixPluginFunctionContext`.

### Utilities

#### cx
Compose class names safely:

```ts
import { cx } from '@stylix/core';

const isActive = true;
const cls = cx('btn', isActive && 'active', undefined, null);
// -> 'btn active'
```

### Types

- `StylixProps` — Style prop interface.
- `StylixHTMLProps` — Props for stylable HTML elements.
- `StylixStyles` — Style object for hooks.
- `StylixPlugin` — Plugin function type.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for our contribution guidelines, code of conduct, and development setup instructions. Feel free to open issues or submit pull requests on our GitHub repository.

## License

MIT © [Alex Brombal](https://github.com/brombal)
