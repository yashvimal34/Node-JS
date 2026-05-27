// Sends a JSON response with the given status code and payload.
export const sendJSON = ((res, statusCode, payload) => {
    // Tells the client that the response body is JSON.
    res.setHeader('Content-Type', 'application/json')

    // Sets the HTTP status code, like 200 or 404.
    res.statusCode = statusCode

    // Converts JavaScript data into JSON text and ends the response.
    res.end(JSON.stringify(payload))
})
