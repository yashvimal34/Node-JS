import path from "node:path"
import fs from "node:fs/promises"
import { sendResponse } from "./sendResponse.js"
import { getContentMimeType } from "./getContentMimeType.js"

export async function serveStatic(req, res, baseDir) {
    try{
        const publicDir = path.join(baseDir, "public")
        const filePath = path.join(
            publicDir, 
            req.url === "/" ? "index.html" : req.url)
        const content = await fs.readFile(filePath)
        const ext = path.extname(filePath)
        const ContentType = getContentMimeType(ext)

        sendResponse(res, 200, ContentType, content)
    } catch {
        const publicDir = path.join(baseDir, 'public')
        const filePath = path.join(
            publicDir, 
            req.url === '/' ? "index.html" : "404.html")
        const content = await fs.readFile(filePath)
        const ext = path.extname(filePath)
        const contentType = getContentMimeType(ext)
        sendResponse(res, 500, contentType, content)
    }
}