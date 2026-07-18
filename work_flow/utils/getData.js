import path from 'node:path'
import fs from 'node:fs/promises'

export async function getData() {
    try{
        const relPath = path.join('data', 'data.json')
        const data = await fs.readFile(relPath, 'utf8', 'data.json')
        const parsedJSON = JSON.parse(data)
        return parsedJSON
    } catch(err) {
        console.log(err)
        return []
    }
}