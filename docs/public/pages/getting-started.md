# Getting Started

At its most basic, styling occurs by adding CSS properties directly to any Stylix element. Simply import Stylix and use the HTML tags 

```typescript jsx
// sandbox:config:{ "height": "180px", "ratio": 0.6 }
// sandbox:split:ignore:readOnly
import Stylix from 'stylix';
// sandbox:split:wrap-export-default
<Stylix.div color="green">Hello, world!</Stylix.div>
 
```

The `Stylix` object has properties corresponding to every HTML element (`Stylix.div`, `Stylix.span`, `Stylix.a`, `Stylix.p`, etc).

We recommend importing Stylix as `$`, to make elements shorter & easier to type. We use this
convention in other places throughout this documentation.

```typescript jsx
// sandbox:config:{ "height": "180px", "ratio": 0.6 }
// sandbox:split:ignore:readOnly
import $ from 'stylix';
// sandbox:split:wrap-export-default
<$.div color="green">Hello, world!</$.div>
 
```

Technically, you can import Stylix as any name you'd like.
