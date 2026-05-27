# Wild Horizons Node.js API

Wild Horizons is a beginner-friendly Node.js project that builds a small HTTP API without Express. It uses Node's built-in `http` module to serve a collection of unusual travel destinations and lets users filter the data by route parameters and query parameters.

This project is useful because it shows how a backend server works at a lower level before using frameworks like Express.

## What We Have Built

We have created a simple API server that:

- Starts a Node.js HTTP server.
- Reads destination data from a local data file through a database-like function.
- Sends JSON responses to the client.
- Handles different API routes.
- Filters data by continent and country.
- Filters data using query parameters.
- Organizes logic into separate utility modules.
- Uses ES module syntax with `import` and `export`.

## Project Structure

```text
01_node_js/
|-- data/
|   `-- data.js
|-- database/
|   `-- db.js
|-- utils/
|   |-- filterData.js
|   |-- getDataByQueryParams.js
|   `-- sendJSONdata.js
|-- package.json
|-- server.js
`-- README.md
```

## File-by-File Explanation

### `server.js`

This is the main entry point of the application.

It does the following:

- Imports Node's built-in `http` module.
- Imports helper functions from other files.
- Creates an HTTP server using `http.createServer()`.
- Reads the request object `req` and response object `res`.
- Gets destination data from `getDataFromDB()`.
- Creates a URL object to read the pathname and query parameters.
- Checks which route the user requested.
- Sends the correct filtered data as JSON.
- Sends a `404` response when the route does not exist.
- Starts the server on port `8000`.

Important line:

```js
const server = http.createServer(async (req, res) => {
```

This creates a server. Every time a request comes in, this callback runs.

### `data/data.js`

This file stores the destination data.

The data is an array of objects. Each object represents one destination and contains fields like:

- `name`
- `location`
- `country`
- `continent`
- `is_open_to_public`
- `uuid`
- `details`

Example shape:

```js
{
  name: "Waitomo Glowworm Caves",
  location: "Waitomo",
  country: "New Zealand",
  continent: "Oceania",
  is_open_to_public: true,
  uuid: "550e8400-e29b-41d4-a716-446655440001",
  details: [
    {
      fun_fact: "The glowworms create a star-like effect on the cave ceiling using bioluminescence."
    },
    {
      description: "A subterranean network of limestone caverns famous for its magical boat rides under twinkling glowworm-lit ceilings."
    }
  ]
}
```

### `database/db.js`

This file acts like a simple database layer.

```js
export async function getDataFromDB() {
    return data;
}
```

Right now, it returns local data from `data.js`. We made it `async` because real database calls usually take time and return promises.

This teaches an important backend idea: the server should not care where the data comes from. Today it comes from a local file; later it could come from MongoDB, PostgreSQL, MySQL, or an external API.

### `utils/sendJSONdata.js`

This helper sends JSON responses.

```js
export const sendJSON = ((res, statusCode, payload) => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
})
```

It does three important things:

- Sets the response type to JSON.
- Sets the HTTP status code.
- Converts JavaScript data into a JSON string using `JSON.stringify()`.

Without `JSON.stringify()`, Node cannot directly send a JavaScript object as an HTTP response body.

### `utils/filterData.js`

This helper filters data by a specific property.

```js
export const filteringData = (data, locationType, locationName) => {
    return data.filter((destination) => {
      return destination[locationType].toLowerCase() === locationName.toLowerCase();
    });
}
```

Example usage:

```js
filteringData(destinations, 'continent', 'Asia')
filteringData(destinations, 'country', 'India')
```

Important concept:

```js
destination[locationType]
```

This is dynamic property access. It allows us to choose the object key using a variable.

For example, if `locationType` is `"continent"`, then:

```js
destination[locationType]
```

means:

```js
destination["continent"]
```

### `utils/getDataByQueryParams.js`

This helper filters data using query parameters.

It currently supports:

- `continent`
- `country`
- `is_open_to_public`

Example URL:

```text
http://localhost:8000/api?continent=Asia&country=India&is_open_to_public=true
```

The function checks which query parameters exist and applies filters one by one.

Important part:

```js
const {continent, country, is_open_to_public} = queryObj
```

This uses destructuring to extract values from an object.

Another important part:

```js
JSON.parse(is_open_to_public.toLowerCase())
```

Query parameters always arrive as strings. So `"true"` needs to become the boolean value `true`, and `"false"` needs to become the boolean value `false`.

## How To Run This Project

Make sure Node.js is installed.

Install dependencies if needed:

```bash
npm install
```

Start the server:

```bash
npm start
```

Or start in watch mode:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:8000
```

## Available Scripts

### `npm start`

Runs:

```bash
node server.js
```

Use this when you simply want to start the server.

### `npm run dev`

Runs:

```bash
node --watch server.js
```

Use this during development. The server restarts automatically when files change.

## API Endpoints

### Get All Destinations

```http
GET /api
```

Example:

```text
http://localhost:8000/api
```

Returns all destinations.

### Filter By Continent Route

```http
GET /api/continent/:continentName
```

Example:

```text
http://localhost:8000/api/continent/Asia
```

Returns all destinations where:

```js
destination.continent === "Asia"
```

This route is case-insensitive, so these also work:

```text
http://localhost:8000/api/continent/asia
http://localhost:8000/api/continent/ASIA
```

### Filter By Country Route

```http
GET /api/country/:countryName
```

Example:

```text
http://localhost:8000/api/country/India
```

Returns all destinations where:

```js
destination.country === "India"
```

### Filter With Query Parameters

```http
GET /api?continent=value&country=value&is_open_to_public=value
```

Examples:

```text
http://localhost:8000/api?continent=Asia
```

```text
http://localhost:8000/api?country=USA
```

```text
http://localhost:8000/api?is_open_to_public=true
```

```text
http://localhost:8000/api?continent=Asia&is_open_to_public=false
```

```text
http://localhost:8000/api?continent=North%20America&country=USA
```

`%20` means a space in a URL.

## Important Concepts Learned

## 1. Node.js Runtime

Node.js allows JavaScript to run outside the browser.

In the browser, JavaScript is used for frontend behavior. With Node.js, JavaScript can also:

- Create servers.
- Read files.
- Connect to databases.
- Build APIs.
- Run backend logic.

## 2. Built-In Modules

Node.js gives us built-in modules. In this project, we use:

```js
import http from "node:http";
```

The `node:` prefix clearly tells Node that this is a built-in module.

## 3. HTTP Server

An HTTP server listens for requests and sends responses.

Basic flow:

```text
Client sends request -> Server receives request -> Server processes logic -> Server sends response
```

In this project:

```js
http.createServer((req, res) => {
  // request and response logic
})
```

`req` contains information about the incoming request.

`res` is used to send data back to the client.

## 4. Request Object

The request object gives us information like:

- `req.url`
- `req.method`
- `req.headers`

Example:

```js
req.method === "GET"
```

This checks whether the incoming request is a GET request.

## 5. Response Object

The response object is used to send data back.

Examples:

```js
res.setHeader('Content-Type', 'application/json')
res.statusCode = 200
res.end(JSON.stringify(payload))
```

Once `res.end()` runs, the response is finished.

## 6. HTTP Methods

This project currently uses `GET`.

Common HTTP methods are:

- `GET`: Read data.
- `POST`: Create data.
- `PUT`: Replace data.
- `PATCH`: Update part of data.
- `DELETE`: Remove data.

## 7. HTTP Status Codes

Status codes tell the client what happened.

Common examples:

- `200`: Success.
- `201`: Created.
- `400`: Bad request.
- `404`: Not found.
- `500`: Server error.

In this project:

```js
sendJSON(res, 200, filteredDestination)
```

means the request was successful.

```js
sendJSON(res, 404, {
  error: "not found",
  message: "the route not found",
})
```

means the route does not exist.

## 8. JSON

JSON stands for JavaScript Object Notation.

APIs usually send data as JSON because it is easy for browsers, frontend apps, mobile apps, and other servers to read.

JavaScript object:

```js
{ name: "India" }
```

JSON string:

```json
{"name":"India"}
```

We convert JavaScript data into JSON using:

```js
JSON.stringify(data)
```

## 9. ES Modules

This project uses ES modules.

In `package.json`:

```json
"type": "module"
```

Because of this, we can use:

```js
import { sendJSON } from "./utils/sendJSONdata.js";
export const sendJSON = ...
```

Important: with ES modules in Node.js, local imports usually need the `.js` extension.

## 10. Named Exports

Example:

```js
export const sendJSON = ...
```

Then import it like:

```js
import { sendJSON } from "./utils/sendJSONdata.js";
```

Named exports are helpful when one file exports multiple values or functions.

## 11. Async and Await

In `server.js`:

```js
const destinations = await getDataFromDB();
```

`await` waits for an asynchronous function to complete.

Even though our current data is local, we use async style because real databases work asynchronously.

## 12. URL Parsing

This project uses:

```js
const ObjUrl = new URL(req.url, `http://${req.headers.host}`)
```

This creates a URL object so we can easily read:

- `ObjUrl.pathname`
- `ObjUrl.searchParams`

Example:

```text
/api?continent=Asia
```

The pathname is:

```text
/api
```

The query parameter is:

```text
continent=Asia
```

## 13. Query Parameters

Query parameters are extra values added after `?` in a URL.

Example:

```text
/api?continent=Asia&country=India
```

Here:

- `continent` is `Asia`
- `country` is `India`

In the project:

```js
const queryObj = Object.fromEntries(ObjUrl.searchParams)
```

This converts URL search parameters into a normal JavaScript object.

## 14. Route Parameters

Route parameters are values placed inside the path.

Example:

```text
/api/continent/Asia
```

Here, `Asia` is taken from the URL path.

In this project:

```js
const continent = req.url.split("/").pop();
```

This splits the URL into pieces and takes the last part.

## 15. Array Filtering

The `.filter()` method creates a new array containing only items that pass a condition.

Example:

```js
const asiaDestinations = destinations.filter(destination => {
  return destination.continent === "Asia"
})
```

This project uses filtering to return only matching destinations.

## 16. Case-Insensitive Matching

This project uses:

```js
.toLowerCase()
```

So users can search using:

```text
Asia
asia
ASIA
```

All of them can match the same data.

## 17. Utility Functions

Utility functions help keep the code clean.

Instead of writing all logic in `server.js`, we separated logic into:

- `sendJSON()`
- `filteringData()`
- `getDataQueryParams()`

This makes the code easier to read, reuse, and test.

## 18. Separation Of Concerns

Each file has a clear responsibility:

- `server.js`: handles routes and server logic.
- `data.js`: stores raw data.
- `db.js`: provides data to the app.
- `sendJSONdata.js`: sends JSON responses.
- `filterData.js`: filters by route values.
- `getDataByQueryParams.js`: filters by query parameters.

This is an important backend architecture habit.

## Request Flow

When the user opens:

```text
http://localhost:8000/api?continent=Asia&is_open_to_public=true
```

The flow is:

1. Browser sends a GET request to the server.
2. Server receives the request.
3. `getDataFromDB()` returns the destination data.
4. `new URL()` parses the request URL.
5. `Object.fromEntries()` converts search params into an object.
6. Server sees that pathname is `/api`.
7. `getDataQueryParams()` filters the data.
8. `sendJSON()` sends the filtered data as JSON.

## Things To Notice

- The API is built without Express.
- The data is local, but the structure prepares us for a real database.
- Query parameters are useful when filtering many optional values.
- Route parameters are useful for clean, readable URLs.
- Helper functions reduce repeated code.
- HTTP servers always work with requests and responses.

## Challenge Questions

Use these questions to check what you have learned so far.

### Basic Understanding

1. What is Node.js, and how is it different from JavaScript running in the browser?
2. What does the `http` module do?
3. Why do we use `node:http` instead of just `http`?
4. What is the purpose of `http.createServer()`?
5. What is the difference between `req` and `res`?
6. Why do we call `server.listen(PORT)`?
7. What happens when the server receives a request?
8. What is the role of `package.json`?
9. Why does this project use `"type": "module"`?
10. Why do local ES module imports include `.js` at the end?

### API And HTTP

11. What is an API?
12. What does a `GET` request mean?
13. What is the difference between a URL path and query parameters?
14. What is the difference between `/api/continent/Asia` and `/api?continent=Asia`?
15. What does status code `200` mean?
16. What does status code `404` mean?
17. Why should an API return JSON?
18. Why do we set `Content-Type` to `application/json`?
19. What happens if we forget to call `res.end()`?
20. Why should we return a helpful error message for unknown routes?

### JavaScript Concepts

21. What is an array of objects?
22. How does `.filter()` work?
23. Why does `.filter()` return a new array?
24. What is destructuring?
25. What does this line do?

```js
const {continent, country, is_open_to_public} = queryObj
```

26. What is dynamic property access?
27. What does this mean?

```js
destination[locationType]
```

28. Why do we use `.toLowerCase()` while comparing values?
29. What is the difference between `"true"` and `true`?
30. Why do we use `JSON.parse()` for `is_open_to_public`?

### Project Architecture

31. Why did we move JSON response logic into `sendJSON()`?
32. Why is `getDataFromDB()` placed inside a `database` folder?
33. Why is `getDataFromDB()` async?
34. What are utility functions?
35. Why should each file have a clear responsibility?
36. What would happen if all code stayed inside `server.js`?
37. What is separation of concerns?
38. How does this project prepare us for using a real database later?
39. Which file would you update if you wanted to add more destinations?
40. Which file would you update if you wanted to change response formatting?

### Practical Coding Challenges

1. Add a new route:

```http
GET /api/location/:locationName
```

It should return destinations by location.

2. Add a new query parameter:

```text
/api?name=The%20Wave
```

It should return destinations matching the name.

3. Add support for searching by UUID:

```http
GET /api/destination/:uuid
```

It should return only one destination object.

4. Return a `404` response when a continent exists in the route but no destinations are found.

5. Return a `400` response if `is_open_to_public` is not `true` or `false`.

6. Add a route that returns only public destinations:

```http
GET /api/public
```

7. Add a route that returns only restricted destinations:

```http
GET /api/restricted
```

8. Add a query parameter to filter by multiple values:

```text
/api?continent=Asia&country=India
```

This already works. Explain why it works.

9. Add a new field called `best_time_to_visit` to every destination.

10. Add a query parameter to filter by `best_time_to_visit`.

11. Create a helper called `sendError()` for error responses.

12. Create a helper called `notFound()` that sends a standard 404 response.

13. Refactor route matching so `server.js` becomes smaller.

14. Add comments explaining every route in `server.js`.

15. Create a simple HTML page that fetches data from `/api` and displays it in the browser.

## Mini Projects You Can Build Next

1. Destination Search API

Add searching by name, country, continent, and public access.

2. Travel Destination Frontend

Build a frontend page that consumes this API and displays destination cards.

3. Admin API

Add `POST`, `PUT`, `PATCH`, and `DELETE` routes to create, update, and remove destinations.

4. Real Database Version

Replace `data.js` with a real database like MongoDB or PostgreSQL.

5. Express Version

Rebuild the same API using Express and compare how much code changes.

## Common Mistakes To Watch For

- Forgetting to call `res.end()`.
- Sending an object without using `JSON.stringify()`.
- Forgetting the `.js` extension in local ES module imports.
- Comparing boolean strings like `"true"` with actual booleans like `true`.
- Not checking `req.method`, which can make routes behave incorrectly.
- Using `req.url` directly when query parameters are present.
- Forgetting that query parameters are always strings.
- Making all route logic too large inside one file.

## Quick Self-Test

Try to answer these without looking at the code:

1. Which file starts the server?
2. Which function sends JSON responses?
3. Which function gets data from the local data file?
4. Which route returns all destinations?
5. Which route filters by country?
6. Which route filters by continent?
7. Which query parameter filters public and restricted destinations?
8. What does `Object.fromEntries(ObjUrl.searchParams)` do?
9. Why is `getDataFromDB()` awaited?
10. What does the API return when a route does not exist?

## Summary

So far, this project has taught the foundation of backend development with Node.js:

- Creating a server.
- Handling requests and responses.
- Building API routes.
- Returning JSON.
- Using status codes.
- Parsing URLs.
- Reading query parameters.
- Filtering arrays of objects.
- Organizing code into modules.
- Preparing code for future database integration.

These are the same ideas used in larger backend frameworks. Once these fundamentals feel comfortable, learning Express, databases, authentication, and full-stack development becomes much easier.
