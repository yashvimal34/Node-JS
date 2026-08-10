export function getContentMimeType(ext) {
    const types = {
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp"
    }
    return types[ext.toLowerCase()] || "text/html"
}