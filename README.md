# Stylix

**Props-based CSS-in-JS for React**

```tsx
import $ from '@stylix/core';

<$.div color="teal" font-size={24} padding={16}>
  Hello, Stylix!
</$.div>
```

Stylix lets you write CSS as JSX props. If you know CSS and React, you already know Stylix.

---

## Features

- **Zero learning curve** — CSS properties become component props
- **Full CSS support** — pseudo-classes, media queries, keyframes, container queries, cascade layers
- **Type-safe** — TypeScript autocomplete and validation for all CSS properties
- **Responsive design** — define breakpoints once, use them everywhere
- **Lightweight** — no build step required, works with any React setup

---

## Installation

```sh
npm install @stylix/core
```

---

## Quick Start

### Basic Styling

Use any HTML element via the `$` namespace with CSS properties as props:

```tsx
import $ from '@stylix/core';

<$.div
  display="flex"
  gap={16}
  padding={24}
  background="#f5f5f5"
  border-radius={8}
>
  <$.span color="blue" font-weight="bold">Styled text</$.span>
</$.div>
```

Numeric values automatically get `px` units (except for unitless properties like `flex`, `opacity`, `z-index`).

### Complex Styles with `$css`

For pseudo-classes, selectors, and media queries, use the `$css` prop:

```tsx
<$.button
  padding="12px 24px"
  background="blue"
  color="white"
  border="none"
  $css={{
    '&:hover': { background: 'darkblue' },
    '&:active': { transform: 'scale(0.98)' },
    '@media (max-width: 600px)': { padding: '8px 16px' }
  }}
>
  Click me
</$.button>
```

### Responsive Props

Define breakpoints in a provider, then use them in any prop:

```tsx
import $, { StylixProvider } from '@stylix/core';

// Define once at app root
<StylixProvider
  media={{
    mobile: styles => ({ '@media (max-width: 768px)': styles }),
    tablet: styles => ({ '@media (max-width: 1024px)': styles }),
  }}
>
  <App />
</StylixProvider>

// Use anywhere
<$.div
  font-size={{ default: 18, tablet: 16, mobile: 14 }}
  padding={{ default: 32, mobile: 16 }}
/>
```

### Creating Components

Spread style props to create reusable, customizable components:

```tsx
import $, { StylixProps } from '@stylix/core';

function Button({ children, ...styles }: StylixProps & { children: React.ReactNode }) {
  return (
    <$.button
      padding="10px 20px"
      border="none"
      border-radius={4}
      cursor="pointer"
      {...styles}
    >
      {children}
    </$.button>
  );
}

// Parent can override any style
<Button background="green" color="white">Save</Button>
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Cheatsheet](./docs/cheatsheet.md) | Quick reference for common patterns |
| [Philosophy](./docs/philosophy.md) | Why Stylix exists and when to use it |
| [Patterns](./docs/patterns.md) | Detailed examples and best practices |
| [Performance](./docs/performance.md) | Optimization guidelines |

---

## How It Works

Stylix generates unique class names based on your styles and injects CSS at runtime:

```tsx
<$.div color="red" padding={16} />
```

Renders as:

```html
<div class="stylix-a1b2c3">...</div>
```

With CSS:

```css
.stylix-a1b2c3 {
  color: red;
  padding: 16px;
}
```

Identical styles share class names automatically—100 elements with the same styles create only one CSS rule.

---

## When to Use Stylix

**Good for:**
- Small-to-medium applications
- Rapid prototyping
- Teams that prefer colocated styles
- Augmenting existing styling approaches

**Consider alternatives for:**
- Large component libraries intended for external use
- Applications where bundle size is critical
- High-frequency animations (use CSS transitions or the native `style` prop)

See [Philosophy](./docs/philosophy.md) for more context on these tradeoffs.

---

## Browser Support

Stylix uses native CSS nesting for complex styles. Check [Can I use CSS Nesting](https://caniuse.com/css-nesting) for current browser support (90%+ as of 2024).

For basic prop-based styles without nesting, all modern browsers are supported.

---

## API Overview

### Exports

```tsx
import $, {
  StylixProvider,    // Context provider for configuration
  StylixProps,       // TypeScript type for style props
  useKeyframes,      // Create keyframe animations
  useGlobalStyles,   // Define global styles
  cx,                // Class name utility
} from '@stylix/core';
```

### StylixProvider Props

```tsx
<StylixProvider
  media={{ /* breakpoint definitions */ }}
  plugins={[ /* custom plugins */ ]}
  ssr={true}  // Enable server-side rendering mode
>
```

---

## License

MIT

---

## Links

- [GitHub](https://github.com/brombal/stylix)
- [npm](https://www.npmjs.com/package/@stylix/core)
- [Report an Issue](https://github.com/brombal/stylix/issues)
