# 02_node_js - Haunted Horizons Platform

## Project Overview

**Haunted Horizons** is a full-stack Node.js application that serves a ghost encounter sharing platform. It combines a static website frontend with a RESTful API backend for managing ghostly encounter data. The application handles HTTP requests, serves static files, and manages JSON data storage with add/read functionality.

**Project Name:** from-the-other-side  
**Version:** 1.0.0  
**Author:** Yash Vimal  
**Description:** A platform for sharing ghostly encounters  

---

## What Has Been Accomplished

### ✅ Core Features Implemented

1. **Dual-Purpose Server**
   - HTTP server on port 8000 using Node.js native `http` module
   - Routes requests to either API or static file handlers based on URL pattern

2. **RESTful API Endpoints**
   - `GET /api` — Retrieves all ghost encounter data from JSON file
   - `POST /api` — Accepts new ghost encounter records and saves them to database

3. **Static File Server**
   - Serves HTML, CSS, JavaScript, and image files from `public/` directory
   - Implements proper MIME type detection for different file extensions
   - Custom 404 error page for missing resources
   - Server error handling for unexpected issues

4. **Data Persistence**
   - JSON-based data storage (`data/data.json`)
   - Asynchronous file I/O operations using `fs.promises`
   - Data validation and error handling
   - Append-only operation for new encounter records

5. **Frontend Application**
   - Interactive haunted travel website with multiple pages
   - Dynamic content injection
   - Form handling for ghost encounter submissions
   - Responsive design with animations
   - Image galleries and themed UI

---

## Architecture & Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        HTTP REQUEST                              │
│                      (Client Browser)                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────────┐
                    │   server.js        │
                    │  (Port 8000)       │
                    │  HTTP Server       │
                    └────────┬───────────┘
                             │
                ─────────────┼──────────────
                │                          │
                ▼                          ▼
        ┌──────────────────┐     ┌──────────────────┐
        │  /api endpoint   │     │ Static files     │
        │  (GET/POST)      │     │ (Other URLs)     │
        └────────┬─────────┘     └─────────┬────────┘
                 │                         │
        ┌────────┴─────────┐               │
        │                  │               │
        ▼                  ▼               ▼
    ┌────────┐      ┌───────────┐   ┌──────────────┐
    │ GET    │      │   POST    │   │ baseDirectory│
    │ /api   │      │   /api    │   │ (serveStatic)│
    └────┬───┘      └─────┬─────┘   └──────┬───────┘
         │                │                │
         ▼                ▼                ▼
    ┌──────────┐  ┌──────────────┐  ┌──────────────┐
    │ getData()│  │parseJSONbody │  │ file path    │
    └────┬─────┘  └──────┬───────┘  │ resolution   │
         │               │          └──────┬───────┘
         ▼               ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌─────────────┐
    │data.json     │  │addNewData()  │  │getContentType│
    │(read)        │  │              │  │(mime type)  │
    │              │  └──────┬───────┘  └──────┬──────┘
    │              │         │                 │
    │              ▼         ▼                 │
    │         ┌──────────────────┐            │
    │         │ data.json        │            │
    │         │ (write/append)   │            │
    │         └──────────────────┘            │
    │                                         │
    ▼                                         ▼
┌──────────────────┐              ┌──────────────────────┐
│sendResponse()    │              │ file content from    │
│                  │              │ public/ directory    │
│JSON Response     │              │ (HTML/CSS/JS/Images) │
│(201/200/400)     │              └──────────────────────┘
└────────┬─────────┘                      │
         │                                ▼
         └───────────────┬────────────────┘
                         │
                    ┌────▼──────┐
                    │sendResponse│
                    │(200/404)   │
                    └────┬───────┘
                         │
                         ▼
                  ┌─────────────────┐
                  │  HTTP Response  │
                  │  (Client)       │
                  └─────────────────┘
```

---

## File Structure & Interconnections

```
02_node_js/
├── server.js                 [ENTRY POINT]
├── package.json
├── data/
│   └── data.json            [DATABASE - Ghost Encounter Records]
├── handlers/
│   └── routeHandlers.js     [API REQUEST HANDLERS]
├── utils/
│   ├── addNewData.js        [SAVE NEW DATA]
│   ├── getData.js           [READ DATA]
│   ├── getContentType.js    [MIME TYPE DETECTION]
│   ├── parseJSONbody.js     [PARSE REQUEST BODY]
│   ├── sendResponse.js      [SEND HTTP RESPONSE]
│   └── serveStatic.js       [SERVE STATIC FILES]
├── public/                  [FRONTEND ASSETS]
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── 404.html
│   ├── index.css
│   ├── index.js
│   └── images/
└── another_set_to_serve_files/  [ALTERNATIVE IMPLEMENTATION]
```

---

## Detailed File Interconnections

### 1. **server.js** (Main Entry Point)
   - **Role:** HTTP server initialization and request routing
   - **Imports:** 
     - `http` (Node.js native module)
     - `baseDirectory` from `utils/serveStatic.js`
     - `handleGet`, `handlePost` from `handlers/routeHandlers.js`
   - **Responsibilities:**
     - Creates HTTP server on port 8000
     - Routes `/api` requests to route handlers (GET/POST)
     - Routes non-API requests to static file handler
   - **Connected to:** `routeHandlers.js`, `serveStatic.js`

### 2. **handlers/routeHandlers.js** (API Logic)
   - **Role:** Handle API requests and coordinate data operations
   - **Exports:** `handleGet()`, `handlePost()`
   - **Imports:**
     - `getData` from `utils/getData.js`
     - `addNewData` from `utils/addNewData.js`
     - `parseJSONbody` from `utils/parseJSONbody.js`
     - `sendResponse` from `utils/sendResponse.js`
   
   **handleGet() Flow:**
   ```
   handleGet() 
     → getData() 
     → reads data.json 
     → JSON.stringify() 
     → sendResponse() (Status 200)
   ```
   
   **handlePost() Flow:**
   ```
   handlePost() 
     → parseJSONbody() (read request body)
     → JSON.parse() (validate)
     → addNewData() (save to database)
     → sendResponse() (Status 201 or 400)
   ```

### 3. **utils/getData.js** (Database Reader)
   - **Role:** Read all ghost encounter records
   - **Imports:** `path`, `fs/promises`
   - **Function:** Reads `data/data.json` asynchronously
   - **Returns:** Parsed JSON array of encounters
   - **Called by:** `routeHandlers.js` (handleGet), `addNewData.js`
   - **Reads:** `data/data.json`

### 4. **utils/addNewData.js** (Database Writer)
   - **Role:** Persist new encounter records to database
   - **Imports:** `path`, `fs/promises`, `getData`
   - **Function:** 
     - Calls `getData()` to get existing records
     - Appends new record to array
     - Writes updated array back to `data.json`
   - **Called by:** `routeHandlers.js` (handlePost)
   - **Updates:** `data/data.json`

### 5. **utils/parseJSONbody.js** (Request Parser)
   - **Role:** Extract and parse JSON from incoming request
   - **Function:** 
     - Iterates through request stream chunks
     - Concatenates chunks into complete body
     - Parses JSON with error handling
   - **Called by:** `routeHandlers.js` (handlePost)
   - **Returns:** Parsed JSON object or throws error

### 6. **utils/sendResponse.js** (Response Sender)
   - **Role:** Send HTTP responses with correct headers
   - **Function:** 
     - Sets HTTP status code
     - Sets Content-Type header
     - Ends response with payload
   - **Called by:** `routeHandlers.js`, `serveStatic.js`
   - **Parameters:** `res`, `statusCode`, `contentType`, `payload`

### 7. **utils/serveStatic.js** (Static File Handler)
   - **Role:** Serve frontend assets (HTML, CSS, JS, images)
   - **Imports:** `path`, `fs/promises`, `sendResponse`, `getContentType`
   - **Function:**
     - Resolves requested file path in `public/` directory
     - Determines file type using `getContentType()`
     - Reads and serves file with proper MIME type
     - Returns custom `404.html` if file not found
   - **Called by:** `server.js` for non-API requests
   - **Serves:** All files in `public/` directory

### 8. **utils/getContentType.js** (MIME Type Mapper)
   - **Role:** Map file extensions to MIME types
   - **Supported Types:**
     - `.js` → `text/javascript`
     - `.css` → `text/css`
     - `.json` → `application/json`
     - `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.ico` → image types
     - Default → `text/html`
   - **Called by:** `serveStatic.js`

### 9. **data/data.json** (Database)
   - **Role:** Persistent storage for ghost encounters
   - **Structure:** JSON array of encounter objects
   - **Fields per Record:**
     - `uuid` - Unique identifier
     - `location` - Where encounter occurred
     - `timeStamp` - Date and time
     - `title` - Encounter title
     - `text` - Detailed description
   - **Accessed by:** `getData()` (read), `addNewData()` (write)

### 10. **public/** (Frontend Assets)
   
   **public/index.html** (Homepage)
   - Shows hero section with haunted travel theme
   - Displays feature cards (Moonlit Routes, Ghostly Guides)
   - Navigation menu to other pages
   - Links to `index.css` and `index.js`
   - Displays images from `images/` folder
   
   **public/about.html** (About Page)
   - Information about the platform
   - How the service works
   - Benefits of ghostly tours
   - Links to other pages
   
   **public/contact.html** (Contact Page)
   - Form for submitting ghost encounters
   - Form submission handling via `index.js`
   - Communicates with `/api` (POST endpoint)
   
   **public/404.html** (Error Page)
   - Custom 404 error page styled to match theme
   - Shown when requested file doesn't exist
   
   **public/index.js** (Frontend Logic)
   - Initializes dynamic page content
   - Handles form submissions
   - API communication (POST to `/api`)
   - Client-side validation
   
   **public/index.css** (Styling)
   - Global styles for all pages
   - Animations and transitions
   - Responsive design
   - Theme-consistent colors and layouts
   
   **public/images/** (Image Assets)
   - 1.png, 2.jpg, 3.jpg, etc.
   - Used in hero section and feature cards

---

## Request/Response Flow Examples

### GET Request Flow (Fetch All Encounters)
```
1. User visits /api or makes GET request
2. server.js routes to handleGet()
3. handleGet() calls getData()
4. getData() reads data/data.json
5. JSON parsed and stringified
6. sendResponse() sends 200 status with JSON data
7. Client receives array of encounter records
```

### POST Request Flow (Submit New Encounter)
```
1. User submits form on contact.html
2. index.js sends POST request to /api with JSON body
3. server.js routes to handlePost()
4. parseJSONbody() extracts and validates JSON from request
5. addNewData() called with parsed data
6. addNewData() reads data.json via getData()
7. New record appended to array
8. Updated array written back to data.json
9. sendResponse() sends 201 status with submitted data
10. Client receives success confirmation
```

### Static File Request Flow (Load Page)
```
1. User visits / or clicks navigation link
2. server.js routes to baseDirectory()
3. serveStatic() resolves file in public/ directory
4. getContentType() determines MIME type from extension
5. fs.readFile() reads file asynchronously
6. sendResponse() sends 200 status with content
7. Browser renders HTML/CSS/JS or displays images
8. If file not found, returns 404.html instead
```

---

## Technology Stack

- **Runtime:** Node.js (ES Modules)
- **HTTP Server:** Node.js native `http` module
- **Filesystem:** `fs/promises` (async file operations)
- **Path Handling:** `path` module
- **Data Format:** JSON
- **Frontend:** HTML5, CSS3, Vanilla JavaScript

---

## How to Run

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server runs on `http://localhost:8000`

---

## API Endpoints Summary

| Method | Path | Purpose | Response |
|--------|------|---------|----------|
| GET | `/api` | Fetch all ghost encounters | 200 + JSON array |
| POST | `/api` | Submit new encounter | 201 + JSON object / 400 if error |
| GET | `/` | Serve homepage | 200 + index.html |
| GET | `/*` | Serve static files | 200 + file content / 404 |

---

## Key Accomplishments Summary

✅ Built a functional HTTP server with dual-purpose routing  
✅ Implemented RESTful API for data management  
✅ Created persistent JSON database with read/write operations  
✅ Developed modular utility functions for separation of concerns  
✅ Built complete static file serving system with MIME type detection  
✅ Implemented error handling and custom error pages  
✅ Created interactive frontend with form submission  
✅ Used async/await patterns throughout for non-blocking operations  
✅ Organized code with proper module imports/exports  
✅ Themed website with animations and responsive design

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
