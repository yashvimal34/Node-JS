import path from 'node:path'
import fs from 'node:fs/promises'
import { sendJSONdata } from './sendJSON.js'
import { getContentType } from './getContentType.js'

export async function baseDir(req, res, base) {
        const publicDir = path.join(base, 'public')
        const abPath = path.join(
            publicDir,
            req.url === '/' ? 'index.html' : req.url
        )
    
        const ext = path.extname(abPath)
        const contentType = getContentType(ext)
    
        try{
            const content = await fs.readFile(abPath)
            sendJSONdata(res, 200, contentType, content)
        } catch (err){
            if(err.code === 'ENOENT'){
                const erroType = await fs.readFile(path.join(publicDir, '404.html'))
                sendJSONdata(res, 404, contentType, erroType)
            }
        }
}