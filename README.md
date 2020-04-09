# Stylix ⚛ Fun React Styling!

Documentation in progress.

## Development

### Scripts

Many of the scripts present in package.json are atomic scripts that are composed together or run concurrently
by other scripts. The following scripts are the most useful:

- `build` - Builds all library modules (node and browser) to the `dist` folder for production.

- `docs` - Serves the documentation site at `http://localhost:3000/stylix`, and watches all library
  source files, running a development build on changes. The documentation site will pull the Stylix
  library from the local development code. The browser version of the Stylix library is served at
  `http://localhost:8080/stylix.js`.

- `docs:deploy` - Builds and deploys the documentation site to GitHub pages. Note that the
  documentation site will use the locally-built production version of Stylix for the site itself,
  and the code example sandboxes will use the public unpkg version of Stylix.
