# 02_node_js

## Project Overview

This project demonstrates a basic Node.js HTTP server built with the native `http` module and modular utility code. It serves a simple static HTML page from the `public` folder using custom helper functions.

### What is included

- `server.js`
  - Creates an HTTP server with `http.createServer()`.
  - Uses ES module syntax (`import/export`) and `import.meta.dirname` to access the project directory.
  - Forwards incoming requests to the static file handler in `utils/serveStatic.js`.

- `utils/serveStatic.js`
  - Builds the path to `public/index.html` using `path.join()`.
  - Reads the file asynchronously with `fs.promises.readFile()`.
  - Sends the HTML response using `sendResponse()`.

- `utils/sendResponse.js`
  - A reusable response helper that sets status code and headers, then sends the payload.

- `public/index.html`
  - A static HTML page containing a personal introduction.

- `package.json`
  - Defines project metadata, module type, and npm scripts for starting the server.

## How to run

1. Open a terminal in `02_node_js`
2. Run:

```bash
npm install
npm start
```

3. Open your browser at `http://localhost:8000`

Alternatively, use the development watcher:

```bash
npm run dev
```

## What you learned

- How to create a simple Node.js web server without Express.
- How to structure server logic into reusable utility modules.
- How to serve a static HTML file from a `public` directory.
- How to use ES modules and `import.meta.dirname` in Node.
- How to send HTTP responses with status code and content type.

## Challenge Questions

1. Add a full static file server:
   - Serve any file in `public/` (HTML, CSS, JS, images) based on the requested URL.
   - Return the correct `Content-Type` header for each file type.

2. Add routing support:
   - If the request path is `/about`, serve `public/about.html`.
   - If the request path is `/`, serve `public/index.html`.
   - Return a custom 404 page for unknown paths.

3. Add a JSON API endpoint:
   - Create `/api/info` that returns JSON with project name, author, and port.
   - Use `Content-Type: application/json`.

4. Improve error handling:
   - Return a `500` status when a file cannot be read.
   - Log a helpful error message to the console.

5. Add query parameter handling:
   - Support `/greet?name=YourName` and respond with a custom greeting.
   - Use only Node’s native `URL` or `url` module.

6. Make the port configurable:
   - Read the port number from `process.env.PORT`.
   - Fall back to `8000` when no environment variable is set.

7. Separate static file helpers:
   - Add a separate module for MIME type lookup.
   - Use it to make `Content-Type` selection modular and easy to extend.
