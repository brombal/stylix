# Common Patterns

This guide covers practical patterns for using Stylix effectively. These patterns have emerged from real-world usage and represent idiomatic Stylix code.

---

## Creating Styled Components

### Basic Wrapper Component

The simplest pattern: wrap a Stylix element and spread style props.

```tsx
import $, { StylixProps } from '@stylix/core';

interface ButtonProps extends StylixProps {
  children: React.ReactNode;
}

function Button({ children, ...styles }: ButtonProps) {
  return (
    <$.button
      padding="10px 20px"
      border="none"
      border-radius={4}
      cursor="pointer"
      background="#0066cc"
      color="white"
      {...styles}  // Allows parent to override any style
    >
      {children}
    </$.button>
  );
}

// Usage
<Button>Default</Button>
<Button background="green">Green Button</Button>
<Button padding="20px 40px" font-size={18}>Large Button</Button>
```

The `{...styles}` spread is key—it lets parent components override any default style.

### Component with Variants

Use component props to drive style variations:

```tsx
interface ButtonProps extends StylixProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...styles
}: ButtonProps) {
  const backgrounds = {
    primary: '#0066cc',
    secondary: '#666',
    danger: '#cc0000'
  };

  const paddings = {
    sm: '6px 12px',
    md: '10px 20px',
    lg: '14px 28px'
  };

  const fontSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <$.button
      padding={paddings[size]}
      font-size={fontSizes[size]}
      background={backgrounds[variant]}
      color="white"
      border="none"
      border-radius={4}
      cursor="pointer"
      {...styles}
    >
      {children}
    </$.button>
  );
}

// Usage
<Button variant="danger" size="lg">Delete</Button>
<Button variant="secondary">Cancel</Button>
```

### Component with Complex Default Styles

When defaults include pseudo-classes or media queries, use `$css` with array merging:

```tsx
interface CardProps extends StylixProps {
  elevated?: boolean;
  children: React.ReactNode;
}

function Card({ elevated = false, children, ...styles }: CardProps) {
  return (
    <$.div
      background="white"
      border-radius={8}
      padding={16}
      {...styles}
      $css={[
        // Default complex styles
        {
          transition: 'box-shadow 0.2s, transform 0.2s',
          '&:hover': elevated ? {
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)'
          } : {}
        },
        // Allow parent overrides
        styles.$css
      ]}
    >
      {children}
    </$.div>
  );
}

// Parent can override hover behavior:
<Card
  elevated
  $css={{
    '&:hover': { transform: 'none' }  // Disable hover lift
  }}
/>
```

**Important:** When merging `$css`, parent styles (`styles.$css`) must come last to take precedence.

---

## Responsive Design

### Setting Up Breakpoints

Define breakpoints once at the app root:

```tsx
import $, { StylixProvider } from '@stylix/core';

const mediaConfig = {
  // Mobile-first approach
  sm: styles => ({ '@media (min-width: 640px)': styles }),
  md: styles => ({ '@media (min-width: 768px)': styles }),
  lg: styles => ({ '@media (min-width: 1024px)': styles }),
  xl: styles => ({ '@media (min-width: 1280px)': styles }),
};

// Or desktop-first
const mediaConfigDesktopFirst = {
  mobile: styles => ({ '@media (max-width: 767px)': styles }),
  tablet: styles => ({ '@media (max-width: 1023px)': styles }),
};

function App() {
  return (
    <StylixProvider media={mediaConfig}>
      <AppContent />
    </StylixProvider>
  );
}
```

### Using Responsive Props

```tsx
// Individual properties
<$.div
  padding={{ default: 24, md: 16, sm: 12 }}
  font-size={{ default: 18, sm: 14 }}
/>

// In $css blocks
<$.div
  $css={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    md: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 16
    },
    sm: {
      gridTemplateColumns: '1fr',
      gap: 12
    }
  }}
/>
```

### Responsive Layout Component

```tsx
import $, { StylixProps, StylixValue } from '@stylix/core';

interface StackProps extends StylixProps {
  direction?: StylixValue<'row' | 'column'>;
  gap?: StylixValue<number>;
  children: React.ReactNode;
}

function Stack({
  direction = 'column',
  gap = 16,
  children,
  ...styles
}: StackProps) {
  return (
    <$.div
      display="flex"
      flex-direction={direction}
      gap={gap}
      {...styles}
    >
      {children}
    </$.div>
  );
}

// Usage
<Stack
  direction={{ default: 'row', mobile: 'column' }}
  gap={{ default: 24, mobile: 12 }}
>
  <Item />
  <Item />
</Stack>
```

---

## Theme Support

### Light/Dark Mode via Media Config

```tsx
<StylixProvider
  media={{
    // Theme modes (assumes data-theme attribute on html/body)
    light: styles => ({ '[data-theme="light"] &': styles }),
    dark: styles => ({ '[data-theme="dark"] &': styles }),

    // Or using prefers-color-scheme
    prefersDark: styles => ({ '@media (prefers-color-scheme: dark)': styles }),

    // Breakpoints
    mobile: styles => ({ '@media (max-width: 767px)': styles }),
  }}
>
```

### Using Theme Styles

```tsx
<$.div
  background={{ light: 'white', dark: '#1a1a1a' }}
  color={{ light: '#333', dark: '#e8e8e8' }}
  border-color={{ light: '#ddd', dark: '#444' }}
/>

// Nested: dark mode + responsive
<$.div
  padding={{
    default: 24,
    mobile: 16,
    dark: {
      default: 20,
      mobile: 12
    }
  }}
/>
```

### Theme with CSS Variables

For more complex theming, combine Stylix with CSS variables defined in plain CSS:

```css
/* styles.css */
:root {
  --color-bg: white;
  --color-text: #333;
  --color-primary: #0066cc;
}

[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #e8e8e8;
  --color-primary: #4d9fff;
}
```

```tsx
// Components use the variables
<$.div
  background="var(--color-bg)"
  color="var(--color-text)"
/>
```

---

## Layout Patterns

### Container

```tsx
function Container({ children, ...styles }: StylixProps & { children: React.ReactNode }) {
  return (
    <$.div
      max-width={1200}
      margin="0 auto"
      padding={{ default: '0 24px', mobile: '0 16px' }}
      {...styles}
    >
      {children}
    </$.div>
  );
}
```

### Flex Utilities

```tsx
// Center content
<$.div
  display="flex"
  justify-content="center"
  align-items="center"
/>

// Space between
<$.div
  display="flex"
  justify-content="space-between"
  align-items="center"
/>

// As a reusable component
import $, { StylixProps, StylixValue } from '@stylix/core';

function Flex({
  justify = 'flex-start',
  align = 'stretch',
  direction = 'row',
  gap,
  wrap = 'nowrap',
  children,
  ...styles
}: StylixProps & {
  justify?: StylixValue<string>;
  align?: StylixValue<string>;
  direction?: StylixValue<'row' | 'column'>;
  gap?: StylixValue<number>;
  wrap?: StylixValue<'wrap' | 'nowrap' | 'wrap-reverse'>;
  children: React.ReactNode;
}) {
  return (
    <$.div
      display="flex"
      flex-direction={direction}
      justify-content={justify}
      align-items={align}
      gap={gap}
      flex-wrap={wrap}
      {...styles}
    >
      {children}
    </$.div>
  );
}

// Usage
<Flex justify="space-between" align="center" gap={16}>
  <Logo />
  <Nav />
</Flex>

// With responsive props
<Flex
  direction={{ default: 'row', mobile: 'column' }}
  gap={{ default: 24, mobile: 12 }}
  wrap={{ default: 'nowrap', mobile: 'wrap' }}
>
  <Sidebar />
  <MainContent />
</Flex>
```

### Grid Layout

```tsx
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <$.div
      display="grid"
      grid-template-columns={{
        default: 'repeat(4, 1fr)',
        lg: 'repeat(3, 1fr)',
        md: 'repeat(2, 1fr)',
        sm: '1fr'
      }}
      gap={{ default: 24, sm: 16 }}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </$.div>
  );
}
```

---

## Interactive States

### Hover, Focus, Active

```tsx
<$.button
  background="#0066cc"
  color="white"
  padding="10px 20px"
  border="none"
  $css={{
    transition: 'all 0.2s',
    '&:hover': {
      background: '#0052a3'
    },
    '&:focus': {
      outline: '2px solid #0066cc',
      outlineOffset: 2
    },
    '&:active': {
      transform: 'scale(0.98)'
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  }}
>
  Click me
</$.button>
```

### Focus-Visible (Keyboard Focus Only)

```tsx
<$.button
  $css={{
    outline: 'none',
    '&:focus-visible': {
      outline: '2px solid #0066cc',
      outlineOffset: 2
    }
  }}
/>
```

### Group Hover (Parent Hover Affects Child)

```tsx
<$.div
  $css={{
    '&:hover .icon': {
      transform: 'translateX(4px)'
    }
  }}
>
  <$.span>Read more</$.span>
  <$.span className="icon" transition="transform 0.2s">→</$.span>
</$.div>
```

---

## Animations

### Keyframe Animations

```tsx
import { useKeyframes } from '@stylix/core';

function FadeIn({ children }) {
  const fadeIn = useKeyframes({
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  });

  return (
    <$.div animation={`${fadeIn} 0.3s ease-out`}>
      {children}
    </$.div>
  );
}

function Spinner() {
  const spin = useKeyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  });

  return (
    <$.div
      width={24}
      height={24}
      border="3px solid #eee"
      border-top-color="#0066cc"
      border-radius="50%"
      animation={`${spin} 0.8s linear infinite`}
    />
  );
}
```

### Transition-Based Animation

For simple state changes, transitions are often simpler:

```tsx
<$.div
  opacity={isVisible ? 1 : 0}
  transform={isVisible ? 'translateY(0)' : 'translateY(10px)'}
  transition="opacity 0.3s, transform 0.3s"
/>
```

---

## Working with Third-Party Components

### Using `$el` with External Components

Pass an element instance to `$el` to apply Stylix styles. The styles are collected and a `className` prop is added to the element, so it must accept `className`.

```tsx
import { ExternalComponent } from 'some-library';

<$
  $el={<ExternalComponent customProp="value" />}
  color="red"
  padding={16}
/>
```

### Using `$render` for Full Control

```tsx
import { ComplexComponent } from 'some-library';

<$
  padding={16}
  margin={8}
  $render={(className) => (
    <ComplexComponent
      className={className}
      onSomething={handler}
      config={config}
    />
  )}
/>
```

### Wrapping for Reuse

When wrapping a third-party component, you often want to accept both style props and the component's own props. Stylix automatically passes unrecognized props through to the `$el` element.

Use `Extends` to type the combined props (it handles conflicts by letting later types override earlier ones):

```tsx
import $, { Extends, StylixProps } from '@stylix/core';
import { Dialog as RadixDialog } from '@radix-ui/react-dialog';

type DialogProps = Extends<
  RadixDialog.ContentProps,  // Third-party props first
  StylixProps,               // Style props last (later types override earlier)
  { children: React.ReactNode }
>;

function Dialog({ $css, children, ...allProps }: DialogProps) {
  return (
    <$
      $el={<RadixDialog.Content />}
      background="white"
      border-radius={8}
      padding={24}
      box-shadow="0 10px 40px rgba(0,0,0,0.2)"
      {...allProps}
      $css={[{ '&:focus': { outline: 'none' } }, $css]}
    >
      {children}
    </$>
  );
}

// Usage: accepts both style props and RadixDialog props
<Dialog onOpenAutoFocus={handleFocus} padding={32} max-width={600}>
  Content
</Dialog>
```

**Handling prop name conflicts:** If a component prop conflicts with a CSS property name (rare), put the third-party props last in `Extends` so its `color` type wins, then rename the CSS version:

```tsx
type WidgetProps = Extends<
  StylixProps,
  ThirdPartyProps,  // Last, so its `color` type wins
  { cssColor?: string }  // Renamed CSS color prop
>;

function Widget({ color, cssColor, ...allProps }: WidgetProps) {
  return (
    <$ $el={<ThirdParty color={color} />} color={cssColor} {...allProps} />
  );
}
```

---

## Conditional Styles

### Boolean Conditions

```tsx
<$.div
  opacity={isDisabled ? 0.5 : 1}
  pointer-events={isDisabled ? 'none' : 'auto'}
  background={isActive ? 'blue' : 'gray'}
/>
```

### Conditional `$css` with Arrays

```tsx
<$.div
  $css={[
    { padding: 16 },
    isLarge && { padding: 24, fontSize: 18 },
    hasError && { borderColor: 'red' },
    isDisabled && { opacity: 0.5, pointerEvents: 'none' }
  ]}
/>
```

### State-Based Styles

```tsx
type ButtonState = 'idle' | 'loading' | 'success' | 'error';

function StatefulButton({ state, children }: { state: ButtonState; children: React.ReactNode }) {
  const stateStyles = {
    idle: { background: '#0066cc' },
    loading: { background: '#666', cursor: 'wait' },
    success: { background: '#00aa00' },
    error: { background: '#cc0000' }
  };

  return (
    <$.button
      color="white"
      padding="10px 20px"
      border="none"
      {...stateStyles[state]}
    >
      {children}
    </$.button>
  );
}
```

---

## Global Styles

> **Note:** Global styles are only applied while the component is mounted. Use `useGlobalStyles` when you need Stylix features like media keywords or plugins. For static styles that don't need these features, a plain CSS file avoids the mount/unmount behavior.

`useGlobalStyles` is useful for responsive global styles that leverage your configured breakpoints:

```tsx
import { useGlobalStyles } from '@stylix/core';

function ResponsiveTypography() {
  useGlobalStyles({
    h1: {
      fontSize: { default: 32, tablet: 28, mobile: 24 },
      marginBottom: { default: 24, mobile: 16 }
    },
    h2: {
      fontSize: { default: 24, tablet: 22, mobile: 20 },
      marginBottom: { default: 20, mobile: 12 }
    },
    body: {
      fontSize: { default: 16, mobile: 14 },
      lineHeight: 1.6
    }
  });

  return null;
}
```

---

## Debugging Tips

### Inspecting Generated Styles

Stylix generates class names like `stylix-0`, `stylix-1`, etc. To see what styles are applied:

1. Inspect the element in browser DevTools
2. Look at the `<style>` tags in `<head>` (or inline for SSR)
3. Search for the class name to see the CSS rules

### Tracing Style Sources

When debugging unexpected styles, check:

1. **Direct props** on the element
2. **`$css` prop** for complex styles
3. **Spread props** (`{...styles}`) from parent components
4. **Media objects** that might apply at current viewport
5. **Global styles** that might match

### Common Issues

**Styles not applying:**
- Check if the prop name is correct (both `font-size` and `fontSize` work)
- Verify the value is valid CSS
- Check for typos in media keywords

**Styles being overridden:**
- In `$css` arrays, later items take precedence
- Check if parent components are spreading styles after your defaults
- Verify cascade layer ordering if using `@layer`

**Performance issues:**
- See the [Performance Guide](./performance.md)
