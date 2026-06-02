# 02_node_js

## Project Overview

This folder contains a small Node.js project that serves a haunted travel-themed static website from the `public` directory. It uses Node's native `http` module and a custom static file handler to deliver HTML, CSS, JavaScript, images, and a contact page.

## What is included

- `server.js`
  - Starts an HTTP server using `http.createServer()`.
  - Uses ES modules and `import.meta.dirname` to resolve the current directory.
  - Sends all requests to the static file handler in `utils/serveStatic.js`.

- `utils/serveStatic.js`
  - Resolves requested files inside the `public/` folder.
  - Reads files asynchronously with `fs.promises.readFile()`.
  - Returns the requested file or a custom `404.html` page when the file is missing.

- `utils/sendResponse.js`
  - Sends HTTP responses with the correct status code and content type.

- `public/`
  - `index.html` — Haunted Horizons homepage with animated sections.
  - `about.html` — About page describing haunted travel tours.
  - `contact.html` — Static contact page with a form and client-side confirmation.
  - `404.html` — Themed 404 page for missing paths.
  - `index.css` — Global styles and animations.
  - `index.js` — Page text initialization and form behavior.
  - `images/` — Visual assets used throughout the site.

## How to run

1. Open a terminal in `02_node_js`
2. Run:

```bash
npm install
npm start
```

3. Open your browser at `http://localhost:8000`

## What you learned

- How to build a Node.js static file server without Express
- How to serve HTML, CSS, JS, and image files from a `public/` folder
- How to use custom helper modules for response handling and content types
- How to build a multi-page static site with animated styling
- How to add a static contact form that shows a client-side confirmation message
- How to collect form values at submit time and send them as JSON in a POST request
- How to fix an empty POST payload by making the submit handler async and building the body from input values
- How to parse JSON request bodies in Node.js using stream chunks and `JSON.parse()`
- How to handle `/api` routes separately from static page requests in the server router
- How to resolve ESM import paths by including `.js` extensions in relative imports
- How to debug invalid `fs.writeFile()` arguments by verifying the path is a string, not an array or object
- How to render dynamic card content on the about page with images, preview text, and a read-more toggle

## Site features

- Haunted Horizons homepage with hero section and animated floating image
- About page with ghost tour details and gallery section
- Static contact page with a request form that does not save data
- Custom 404 page with haunted theme
- Responsive layout for smaller screens

## Project goals

- Practice Node.js server fundamentals using native modules
- Learn how to serve static assets from a single server endpoint
- Create a small themed website with static pages and interactive UI
- Keep the backend simple while the frontend is visually rich
