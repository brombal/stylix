# Stylix

**Stylix** is a styling system that brings your CSS styles into the framework you already know and
love — **React**.

Stylix is completely based on React components and props:

```jsx
import $ from 'stylix';

<$.div />;
```

This might look scary and ill-advised. But after using it for a while, we can promise there's likely
no faster way to rapidly style your React components.

This means:

- No more **coming up with class names**.

  What should you name a single-use class that adds five pixels of margin that the designer wants?
  What naming scheme should you use?

- No more **switching gears into other languages**.

  Sure, any front end developer worth her salt should _know_ CSS, Sass, Less, and all the rest. But
  switching from JavaScript to another language adds milliseconds of mental delay _hundreds_ of
  times a day, and it adds up.
