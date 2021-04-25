# Stylix ⚛ React, with style.

Add styles to your React apps with props: the easy, natural, and low learning curve approach.

Stylix is a new library and methodology for styling your React apps. With Stylix, you add styles to
your components the same way you add any other information: with **props**.

No separate CSS files, quirky alternative JavaScript syntax, or build tool
configuration—**everything is React**, minimizing your learning curve and encouraging the same
patterns and organizational best practices that have made React so popular.

If you still aren't convinced, read the [Why Stylix?](https://stylix.dev) documentation page to see
why we created Stylix, and why we think you'll love it.

**[Ready the full documentation](https://stylix.dev)** for more guides and API reference.

## Installation

Stylix can be installed with **npm** or **yarn**:

```sh
$ npm install --save @stylix/core
# or
$ yard add @stylix/core
```

Stylix is compatible with React 16.8+.

## How to use Stylix

### Wrap your app with a `<StylixProvider>` element

Start by importing `StylixProvider` from `@stylix/core` and placing a `<StylixProvider>` element at
the root of your app:

```tsx
import { StylixProvider } from '@stylix/core';

function App() {
  return (
    <StylixProvider>
      {/* your app */}
    </StylixProvider>
  );
}
```

The `<StylixProvider>` element can provide themes, media queries, and plugins to descendent
elements. Each `<StylixProvider>` element outputs the CSS for its descendant elements to a `<style>`
element that it places in your page's `<head>`. This behavior, and a few other configuration
options, can be customized.

### Style your markup with Stylix HTML tags

Import the default `$` object from `@stylix/core` and use it to render stylable HTML elements in
place of the regular old tags:

```tsx
import $ from '@stylix/core';

<$.div
  color="SkyBlue"
  text-align="center"
  font-size={40}
  font-weight="bold"
  font-style="italic"
>
  Hello, Stylix!
</$.div>
```

## Want to contribute? Have bugs, issues, or questions?

Open an issue or submit a PR on our GitHub page:

https://github.com/brombal/stylix

We ascribe to the
[Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct).

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright 2020 Brombal, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
