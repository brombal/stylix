# Performance Guide

Stylix is a runtime CSS-in-JS library. This means styles are generated and injected into the DOM at runtime, rather than at build time. For most applications, this has negligible performance impact. However, understanding how Stylix works can help you avoid patterns that cause unnecessary work.

---

## How Stylix Works

When a Stylix component renders:

1. **Style props are collected** and combined with any `$css` prop
2. **Styles are normalized** ("preprocessing" - minimal; falsy values are removed)
3. **A cache key is created** by serializing the style object
4. **If the key is new**, a className is generated, plugins process the styles into CSS (resolving media keywords, adding units, etc.), and the rules are stored
5. **If the key exists**, the existing className is reused (no new CSS generated)
6. **Reference counting** tracks how many components use each style
7. **The stylesheet is updated** via `useInsertionEffect`, batching changes efficiently

This means:
- **Identical styles share a class name** — rendering 100 `<$.div color="red" />` elements creates only one CSS rule
- **Style generation is cached** — the same styles produce the same class name
- **Unused styles are cleaned up** — when no components reference a style, it's removed

---

## Do's

### Do: Keep Style Objects Stable

For extra high performance (100+ reuses of a component), define style objects outside the component:

```tsx
// Good: Object reference is stable
const cardStyles = {
  padding: 16,
  borderRadius: 8,
  '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
};

function Card({ children }) {
  return <$.div $css={cardStyles}>{children}</$.div>;
}
```

Even if styles are only simple CSS properties, using `$css` with a stable object reference avoids unnecessary hashing work.

### Do: Define Media Config at App Root

Define breakpoints once, not in every component:

```tsx
// Good: Single definition at root
<StylixProvider
  media={{
    mobile: styles => ({ '@media (max-width: 767px)': styles }),
    tablet: styles => ({ '@media (max-width: 1023px)': styles }),
  }}
>
  <App />
</StylixProvider>
```

### Do: Use CSS Transitions for Animations

For property changes, CSS transitions are more efficient than re-rendering:

```tsx
// Good: Browser handles the animation
<$.div
  opacity={isVisible ? 1 : 0}
  transform={isVisible ? 'translateY(0)' : 'translateY(-10px)'}
  transition="opacity 0.3s, transform 0.3s"
/>
```

### Do: Use `useKeyframes` for Complex Animations

Keyframes are hoisted and deduplicated automatically:

```tsx
const fadeIn = useKeyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

// The keyframes are only injected once, even if many components use them
<$.div animation={`${fadeIn} 0.3s ease-out`} />
```

---

## Don'ts

### Don't: Create New Style Objects Every Render

For extra high performance (100+ reuses of a component), don't use inline style objects, which are recreated on every render:

```tsx
// Avoid: New object every render
function Card({ children }) {
  return (
    <$.div
      $css={{  // New object reference every render
        padding: 16,
        '&:hover': { boxShadow: '...' }
      }}
    >
      {children}
    </$.div>
  );
}
```

**Why it matters:** While Stylix caches styles by content (so the CSS won't be regenerated), it still has to hash and compare the object each render. For frequently-rendered components, this adds up.

**Fix:** Extract the styles or memoize them:

```tsx
// Better: Stable reference
const cardStyles = {
  padding: 16,
  '&:hover': { boxShadow: '...' }
};

function Card({ children }) {
  return <$.div $css={cardStyles}>{children}</$.div>;
}
```

### Don't: Generate Many Unique Style Combinations Dynamically

```tsx
// Avoid: Potentially thousands of unique styles
function DataCell({ value }) {
  return (
    <$.td
      background={`hsl(${value * 3.6}, 70%, 50%)`}  // Unique for each value 0-100
    />
  );
}

// Used in a large table:
{data.map((row, i) => (
  <tr key={i}>
    {row.map((value, j) => (
      <DataCell key={j} value={value} />  // Could generate 100+ unique styles
    ))}
  </tr>
))}
```

**Why it matters:** Each unique style combination creates a new CSS rule. Hundreds of rules slow down both generation and browser style calculation.

**Fix:** Use the native `style` prop for truly dynamic values, or bucket values into ranges:

```tsx
// Better: Use style prop for per-cell values
function DataCell({ value }) {
  return (
    <$.td style={{ background: `hsl(${value * 3.6}, 70%, 50%)` }} />
  );
}

// Or: Bucket into classes
function DataCell({ value }) {
  const bucket = Math.floor(value / 10) * 10;  // 0, 10, 20, ... 100
  return <$.td background={`var(--heat-${bucket})`} />;
}
```

### Don't: Use Stylix for High-Frequency Updates

```tsx
// Avoid: Style changes 60 times per second
function AnimatedElement({ progress }) {
  return (
    <$.div
      transform={`translateX(${progress * 100}px)`}  // Changes every frame
    />
  );
}
```

**Why it matters:** Generating and comparing styles on every animation frame adds overhead. Browsers are optimized for inline style updates, not class changes.

**Fix:** Use the native `style` prop or CSS animations:

```tsx
// Better: Use style prop for frame-by-frame updates
function AnimatedElement({ progress }) {
  return (
    <$.div
      style={{ transform: `translateX(${progress * 100}px)` }}
    />
  );
}

// Best: Use CSS for the animation entirely
function AnimatedElement() {
  const slide = useKeyframes({
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(100px)' }
  });

  return <$.div animation={`${slide} 1s ease-out forwards`} />;
}
```

### Don't: Redefine Media Config in Multiple Places

```tsx
// Avoid: Inconsistent breakpoints
function ComponentA() {
  return (
    <StylixProvider media={{ mobile: s => ({ '@media (max-width: 768px)': s }) }}>
      ...
    </StylixProvider>
  );
}

function ComponentB() {
  return (
    <StylixProvider media={{ mobile: s => ({ '@media (max-width: 480px)': s }) }}>
      ...  // Different breakpoint!
    </StylixProvider>
  );
}
```

**Fix:** Define once at app root, use everywhere. This is less about performance and more about consistency.

---

## When to Use Native `style` Prop

The native `style` prop bypasses Stylix entirely and applies styles inline. Use it for:

1. **Values that change very frequently** (animations, drag position)
2. **Truly unique values** that won't benefit from class sharing
3. **Values from user input** (sliders, color pickers)

```tsx
<$.div
  // Static styles via Stylix (cached, deduplicated)
  padding={16}
  border-radius={8}
  background="white"
  transition="transform 0.2s"

  // Dynamic styles via style prop (no caching overhead)
  style={{
    transform: `translate(${x}px, ${y}px)`,
    opacity: progress
  }}
/>
```

---

## Performance Checklist

Before shipping, verify:

- [ ] Style objects are stable (not recreated every render) for frequently-rendered components
- [ ] High-frequency animations use `style` prop or CSS animations
- [ ] No components generate hundreds of unique style variations
- [ ] Media configuration is defined once at app root
- [ ] Large lists don't have unique styles per item (use `style` prop if needed)

---

## Measuring Performance

If you suspect Stylix is causing performance issues:

1. **Profile with React DevTools** — Look for components spending time in Stylix-related code during renders
2. **Check `<style>` tag size** — In DevTools, inspect `<head>` and look at the Stylix `<style>` elements. Thousands of rules might indicate over-generation
3. **Use React.memo** — Prevent unnecessary re-renders of styled components
4. **Profile with Chrome DevTools** — The Performance panel shows style recalculation time

---

## The Reality

For most applications, Stylix performance is not a concern. Problems typically only appear when:

- Rendering large lists (1000+ items) with unique styles per item
- Animating style props at 60fps
- Generating styles in tight loops

If you're building a typical UI with dozens or hundreds of elements, following basic React best practices (avoiding unnecessary re-renders) is usually sufficient.
