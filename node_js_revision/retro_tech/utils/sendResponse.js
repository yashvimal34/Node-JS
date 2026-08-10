export function sendResponse(res, statusCode, mimeType, payload) {
    res.statusCode = statusCode
    res.setHeader("Content-Type", mimeType)
    res.end(payload)
}