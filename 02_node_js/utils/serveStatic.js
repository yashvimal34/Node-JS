import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'

export async function baseDirectory(req, res, base){
    const filePath = path.join(base, 'public', 'index.html')
    
    try{
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, 'text/html', content)
    } catch (err) {
        console.log(err)
    }
}