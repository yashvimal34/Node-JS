export function sendResponse(res, statusCode, mimeType, payload) {
    res.setHeader('Content-Type', mimeType)
    res.statusCode = statusCode
    res.end(payload)
}