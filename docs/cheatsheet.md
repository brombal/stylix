# Stylix Cheatsheet

Quick reference for common Stylix patterns.

---

## Basic Styling

```tsx
import $ from '@stylix/core';

// Style props on HTML elements
<$.div color="red" font-size={16} margin={12}>
  Content
</$.div>

// Both formats work: hyphenated or camelCase
<$.div font-weight="bold" />
<$.div fontWeight="bold" />

// Numeric values get 'px' automatically (except unitless props)
<$.div margin={12} />        // margin: 12px
<$.div line-height={1.5} />  // line-height: 1.5 (unitless)
```

---

## The `$css` Prop

Use `$css` for pseudo-classes, selectors, media queries, and complex styles.

```tsx
<$.div
  $css={{
    // Pseudo-classes
    '&:hover': { color: 'blue' },
    '&:focus': { outline: '2px solid blue' },
    '&:active': { transform: 'scale(0.98)' },

    // Pseudo-elements
    '&::before': { content: '"→ "' },
    '&::after': { content: '""', display: 'block' },

    // Descendant selectors
    'p': { margin: 0 },
    '.child-class': { color: 'red' },
    '& > span': { fontWeight: 'bold' },

    // Media queries
    '@media (max-width: 600px)': {
      fontSize: 14
    },

    // Container queries
    '@container (min-width: 400px)': {
      display: 'grid'
    },

    // Cascade layers
    '@layer myLayer': {
      color: 'purple'
    }
  }}
/>
```

---

## Responsive Styles (Media Objects)

### Setup in Provider

Define keywords that map to style wrappers. These can be breakpoints, theme modes, or any condition:

```tsx
import $, { StylixProvider } from '@stylix/core';

<StylixProvider
  media={{
    // Breakpoints
    mobile: styles => ({ '@media (max-width: 480px)': styles }),
    tablet: styles => ({ '@media (max-width: 1024px)': styles }),
    // Theme modes (assumes data-theme attribute on html/body)
    dark: styles => ({ '[data-theme="dark"] &': styles }),
    light: styles => ({ '[data-theme="light"] &': styles }),
  }}
>
  <App />
</StylixProvider>
```

### Usage

```tsx
// On individual props
<$.div
  font-size={{ default: 16, tablet: 14, mobile: 12 }}
  padding={{ default: 24, mobile: 12 }}
/>

// In $css
<$.div
  $css={{
    display: 'flex',
    flexDirection: 'row',
    mobile: { flexDirection: 'column' }
  }}
/>

// Nested combinations (e.g., dark mode + mobile)
<$.div
  color={{
    dark: {
      default: '#e8e8e8',  // dark mode default
      mobile: '#fff'       // dark mode on mobile
    }
  }}
/>
```

---

## Styled Components

### Basic Pattern

```tsx
import $, { StylixProps } from '@stylix/core';

function Button({ children, ...styles }: StylixProps & { children: React.ReactNode }) {
  return (
    <$.button
      padding="10px 20px"
      border="none"
      cursor="pointer"
      {...styles}
    >
      {children}
    </$.button>
  );
}

// Usage - can override any style
<Button color="white" background="blue">Click me</Button>
```

### With Variants

```tsx
interface ButtonProps extends StylixProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

function Button({ variant = 'primary', children, ...styles }: ButtonProps) {
  return (
    <$.button
      padding="10px 20px"
      background={variant === 'primary' ? 'blue' : 'gray'}
      color="white"
      {...styles}
    >
      {children}
    </$.button>
  );
}
```

### Allowing Style Overrides via `$css`

```tsx
function Card({ $css, ...props }: StylixProps) {
  return (
    <$.div
      $css={[
        {
          padding: 16,
          borderRadius: 8,
          '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
        },
        $css  // Parent overrides come last
      ]}
      {...props}
    />
  );
}

// Parent can override anything:
<Card $css={{ '&:hover': { boxShadow: 'none' } }} />
```

---

## Arrays in `$css`

Arrays merge styles with later values taking precedence:

```tsx
<$.div
  $css={[
    { color: 'red', fontSize: 16 },
    { color: 'blue' },  // Overrides red
    condition && { fontWeight: 'bold' },  // Conditional
  ]}
/>
// Result: color: blue, fontSize: 16, fontWeight: bold (if condition)
```

---

## Keyframe Animations

```tsx
import { useKeyframes } from '@stylix/core';

function Spinner() {
  // Accepts any valid CSS keyframes (from/to, percentages, etc.)
  const spin = useKeyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
    // e.g., '0%, 100%': { ... }, '50%': { ... }
  });

  return (
    <$.div animation={`${spin} 1s linear infinite`} />
  );
}
```

---

## Global Styles

> **Note:** Global styles are only applied while the component is mounted. Use sparingly—primarily when you need media keywords or plugin capabilities. For static styles (resets, base typography), use a plain CSS file instead.

```tsx
import { useGlobalStyles } from '@stylix/core';

// Good use case: responsive global styles using media keywords
function ResponsiveTypography() {
  useGlobalStyles({
    h1: { fontSize: { default: 32, mobile: 24 } },
    h2: { fontSize: { default: 24, mobile: 20 } },
    body: { fontSize: { default: 16, mobile: 14 } }
  });
  return null;
}
```

---

## Using with Custom Components

### With `$el`

Pass an element instance. Stylix adds a `className` prop, so the component must support it.

```tsx
import MyComponent from './MyComponent';

<$ $el={<MyComponent someProp="value" />} color="red" padding={16} />
```

### With `$render`

```tsx
<$
  color="red"
  padding={16}
  $render={(className, props) => (
    <MyComponent className={className} {...props} />
  )}
/>
```

---

## Cascade Layers

Control specificity for parent/child overrides:

```tsx
// Child component defines a layer
const Widget = (props) => (
  <$.div
    $css={[
      {
        '@layer WidgetStyles': {
          '&:hover:not(.disabled)': { color: 'red' }
        }
      },
      props.$css
    ]}
  />
);

// Parent can override despite lower specificity
<Widget $css={{ color: 'blue' }} />

// Explicit layer ordering
$css={{
  '@layer': 'base, components, overrides',
  '@layer overrides': { color: 'green' }
}}
```

---

## Utilities

### `cx()` - Class Names

```tsx
import { cx } from '@stylix/core';

cx('foo', 'bar')                    // 'foo bar'
cx('a', false, 'b')                 // 'a b'
cx({ active: true, disabled: false }) // 'active'
cx(['a', 'b'], 'c')                 // 'a b c'
```

---

## Quick Type Reference

```tsx
import $, {
  StylixProps,           // All CSS props + $css
  StylixHTMLProps,       // CSS props + HTML element props
  StylixStyles,          // Style object type
  StylixValue,           // Value or media object
  Extends,               // Merge prop types
} from '@stylix/core';

// Extend for custom components
type MyProps = Extends<StylixProps, { variant: 'a' | 'b' }>;

// HTML-specific props
type InputProps = StylixHTMLProps<'input'>;
```

---

## Unitless Properties

These properties remain unitless when given numeric values:

```
aspect-ratio, column-count, columns, fill-opacity, flex, flex-grow,
flex-shrink, font-weight, line-height, opacity, order, orphans,
stroke-opacity, widows, z-index, zoom
```

All other numeric values receive `px` automatically.
