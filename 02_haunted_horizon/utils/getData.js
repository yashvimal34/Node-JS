import path from 'node:path'
import fs from 'node:fs/promises'

export async function getData() {
    try{
        const abPath = path.join('data', 'data.json')
        const data = await fs.readFile(abPath, 'utf8', 'data.json')
        const parseData = JSON.parse(data)
        return parseData

    } catch(err) {
        console.log(err)
        return []
    }
}