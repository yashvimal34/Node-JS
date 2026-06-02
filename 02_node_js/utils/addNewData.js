import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from "./getData.js";

export async function addNewData(newData) {
    try{
        const alldata = await getData()
        alldata.push(newData)
        
        const pathJSON = path.join('data', 'data.json')

        const updatedJSON = JSON.stringify(alldata)

        await fs.writeFile(
            pathJSON, 
            updatedJSON, 'utf8'
        )

    } catch(err){
        console.log(err)
    }
}