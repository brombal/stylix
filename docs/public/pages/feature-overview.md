# Feature Overview

Stylix has a wide array of features for styling your app, and many of them are simply the result of
a few core features combined with React concepts you are already familiar with.

- Basic element styles
- Dynamic styles based on state or props
- Theming
- Custom selectors
- Media queries
- Global styles
- Server-side rendering

## Basic element styles

The Stylix core consists of a set of replacement elements for HTML tags: `<$.div>`, `<$.span>`,
`<$.a>`, etc. which support their standard HTML tag properties, as well as any CSS property. The CSS
properties combine to create a unique CSS class name that is applied to the element.

You can also style your own components just as easily, using the `$el` prop:

```typescript jsx
// sandbox
function MyComponent({ className, children }) {
  return <div className={className}>{children}</div>;
}

export default (
  <$ $el={MyComponent} color="skyblue">
    This is my own styled component!
  </$>
);
```

Just as with HTMl tags, CSS props will be combine into a `className` prop that is passed to your
component, along with all other non-CSS props

```typescript jsx
const Link = (props) => <$.a color="purple" text-decoration="underline" {...props} />;

const Label = ({ title, linkProps }) => (
  <label>
    <Icon icon="bullet" />
    <Link {...linkProps}>{title}</Link>
  </label>
);

const GreenLabel = () => <Label linkProps={{ color: 'green' }} />;
```
