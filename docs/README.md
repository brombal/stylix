# Stylix documentation site

Normally I would think building a documentation site from scratch is a really terrible idea. But
because of the nature of the type of library that Stylix is, I figured it would be a good
opportunity to dog-food the library in order to demonstrate it and uncover potential issues (both in
the code and the API design).

This site has the following goals:

- Obviously, to convey documentation about the Stylix library.
- Have as simple of a setup as possible.
- Use markdown to easily write documentation.
- Allow for runnable code examples within the markdown pages, and be able to develop Stylix and load
  the development version on this site.
- Be able to host it on GitHub pages.

The site is built with a basic create-react-app setup. The `public/markdown` directory contains all
the markdown files. The `_menu.md` is the sidebar menu. The rest of the app code is in `src`, which
is basically just the shell styles and the component that loads and renders the markdown files using
XHR.

## How the sandbox works

I couldn't seem to find a simple way to get markdown code snippets to be demo-able (i.e. run them in
an iframe within the doc page), so I had to roll my own.

There is a custom markdown plugin located in `rc/react-markdown-sandbox.ts`. This basically looks
for jsx code snippets in the markdown, and instead of just outputting as a `<code>` element, it also
adds an `<iframe>` that points to `public/sandbox.html`. The plugin then injects the code snippet
and the path to the Stylix library into the iframe using `window.postMessage`. The sandbox html file
then uses the "standalone" version of Babel to parse the code snippet (along with the basic wrapper
code necessary to render the React element into the DOM).

The parent Stylix library has a special npm script to watch and build a UMD version of the library
directly into the `docs/public/stylix` directory. This build file is .gitignore'd and should only be
used to do development on Stylix and update the documentation site simultaneously. This is a great
way to test for bugs in the features you are working on.

The sandbox file loads React, ReactDOM, and Babel from CDNs. Stylix is loaded based on the
REACT_APP_SANDBOX_LIB environment variable. You can find this in the `.env.local` file which you
should copy to `.env`. The production version is set by the docs site's npm build script (in
package.json), which should be set to the CDN url for the production UMD module file.

# Developing

To develop, there are two useful commands:

- `npm start` (in the docs directory) - This will watch the docs site for changes and launch the
  development site in a browser.

- `npm run watch:docs` (in the parent directory) - This will watch for updates to the library code
  and recompile the UMD module for the docs site. You only need to use this if you are also going to
  be making changes to the Stylix library code.

# Deploying

- `npm run build` - This will build the site to the `docs/build` directory.

- `npm run deploy` - This will both build the docs site and deploy it to GitHub pages.
