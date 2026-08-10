import path from 'node:path'
import fs from "node:fs/promises"

export async function getData() {
    try{
        const pathJson = path.join('data', 'data.json')
        const data = await fs.readFile(pathJson, 'utf8')
        const parseJson = JSON.parse(data)
        return parseJson
    } catch(err) {
        console.log(err)
        return []
    }
}