# Philosophy: Why Stylix?

## The Short Version

Stylix is a runtime CSS-in-JS library for React. If you know CSS and React, you already know how to use it—there's no new mental model to learn. You write CSS properties as JSX props, and Stylix handles generating class names and injecting styles.

If you're working in a codebase that uses Stylix, this document explains why it exists, what problems it solves, and how to think about it.

---

## A Bit of History

Stylix was created before the industry's shift away from runtime CSS-in-JS. At the time, libraries like styled-components and Emotion were dominant, and the idea of colocating styles with components was exciting and new.

Stylix took a different approach than most CSS-in-JS libraries: instead of template literals or `css()` functions, it used props. The idea was simple—if you're already passing props to React elements, why not pass CSS the same way?

```tsx
// Instead of this (styled-components):
const Box = styled.div`
  color: red;
  padding: 16px;
`;

// Or this (Emotion):
<div css={{ color: 'red', padding: 16 }} />

// Stylix does this:
<$.div color="red" padding={16} />
```

The props-based approach felt more natural in React. No new syntax to learn, no tagged template literals, no special `css` prop to remember. Just props.

---

## The Industry Moved On (And That's Okay)

Today, the prevailing wisdom favors zero-runtime solutions: Tailwind CSS, CSS Modules, vanilla-extract, and others that do their work at build time rather than runtime.

The arguments are valid:
- No runtime overhead for style generation
- Better performance for initial page load
- No style injection during hydration
- Smaller bundle sizes

If you're starting a new project today with performance as a top priority, a build-time solution is likely the better choice.

**But here's the thing:** for many applications, runtime CSS-in-JS works just fine. The performance overhead is negligible for apps that aren't rendering thousands of unique styled elements per second. The developer experience benefits—colocation, dynamic styles, type safety—are real and meaningful.

Stylix exists in production applications that serve real users without performance issues. If you're maintaining one of these codebases, you don't need to feel like you're working with "legacy" technology. You're working with a tool that made reasonable tradeoffs for its use case.

---

## What Stylix Is Good At

### 1. Low Learning Curve

If you know CSS, you know Stylix. There's no utility class vocabulary to memorize (like Tailwind), no new API to learn (like styled-components' template syntax), and no special build configuration required.

```tsx
// This is valid CSS knowledge directly applied:
<$.div
  display="flex"
  justify-content="space-between"
  padding={16}
  border-radius={8}
/>
```

### 2. Colocation

Styles live with the component that uses them. When you read a component, you see exactly how it's styled without jumping to another file or searching for class names.

### 3. Dynamic Styles Without Ceremony

React's rendering model makes dynamic styles natural:

```tsx
<$.div
  background={isActive ? 'blue' : 'gray'}
  opacity={isDisabled ? 0.5 : 1}
/>
```

No conditional class name logic, no ternary-heavy `className` strings, no separate "variant" definitions.

### 4. Responsive Design Made Simple

The media object pattern centralizes breakpoint definitions and makes responsive props readable:

```tsx
<$.div
  font-size={{ default: 16, tablet: 14, mobile: 12 }}
  flex-direction={{ default: 'row', mobile: 'column' }}
/>
```

### 5. Type Safety

TypeScript knows about CSS properties. You get autocomplete for valid properties and type errors for invalid values. This catches bugs that would otherwise only appear at runtime (or worse, silently fail).

### 6. Gradual Adoption

Stylix doesn't require you to style everything with it. You can use it alongside CSS Modules, Tailwind, or plain CSS. It's a tool, not a framework demanding total commitment.

---

## What Stylix Is Not

### Not a Design System

Stylix has no opinions about your design. No predefined colors, spacing scales, or component styles. You bring your own design decisions.

### Not Zero-Runtime

Stylix generates styles at runtime. For most applications, this is fine. For performance-critical applications with many unique style combinations, consider whether a build-time solution might be more appropriate.

### Not for Every Use Case

Some scenarios are genuinely better served by other approaches:

- **Component libraries** intended for wide reuse benefit from static CSS that consumers can easily customize and override
- **Highly dynamic UIs** with thousands of elements updating rapidly (think spreadsheets or data visualizations) may want to avoid runtime style generation
- **Frame-rate-sensitive animations** should use CSS transitions, keyframe animations, or the native `style` attribute

---

## How to Think About Stylix

Think of Stylix as the `style` prop, but better:

| Feature | Native `style` prop | Stylix |
|---------|---------------------|--------|
| Pseudo-classes (`:hover`, `:focus`) | No | Yes |
| Media queries | No | Yes |
| Keyframe animations | No | Yes |
| Selectors | No | Yes |
| Server-side rendering | Inline only | Full support |
| Deduplication | No | Yes |

Stylix bridges the gap between the simplicity of inline styles and the power of CSS, without requiring you to context-switch to a separate styling language or file.

---

## For Those Inheriting a Stylix Codebase

If you've joined a team that uses Stylix, here's what you need to know:

1. **It's just CSS.** The props are CSS properties. The values are CSS values. If you're unsure what a prop does, MDN has the answer.

2. **Look for the `$css` prop** when you see complex styles. That's where pseudo-classes, media queries, and nested selectors live.

3. **Check the `<StylixProvider>`** at the app root to see if media keywords (like `mobile` or `tablet`) are defined. These are shortcuts you can use in style props.

4. **Spreading `{...styles}` is intentional.** Components often accept style props and spread them onto an inner element. This is how parent components can customize children.

5. **Performance is rarely an issue** unless you're generating many unique styles in a tight loop. Normal component rendering is fine.

---

## The Bottom Line

Stylix is a straightforward tool: write CSS as props, get scoped styles. It made sense when it was built, and it continues to work well for the applications using it.

The web development landscape constantly evolves. Today's best practice becomes tomorrow's legacy. What matters is whether a tool solves real problems for real users—and Stylix does that.

If you're using Stylix, use it well. If you're evaluating it for a new project, understand the tradeoffs and choose what's right for your situation.

Either way, you're writing CSS. That skill isn't going anywhere.
