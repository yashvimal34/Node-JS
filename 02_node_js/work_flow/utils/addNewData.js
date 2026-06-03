import path from "node:path";
import fs from 'node:fs/promises'
import { getData } from "./getData.js";

export async function addNewData(newData) {
    try{
        const fetchAllData = await getData()
        newData.push(fetchAllData)
    
        const pathJSON = path.join('data', 'data.json')
        const updatedData = JSON.stringify(fetchAllData, null, 2)

        await fs.writeFile(
            pathJSON,
            updatedData, 'utf8'
        )
    } catch(err) {
        console.log(err)
    }
}