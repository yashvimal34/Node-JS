import { addNewData } from "../utils/addNewData.js"
import { getData } from "../utils/getData.js"
import { parseJSONbody } from "../utils/parseJSONbody.js"
import { sendResponse } from "../utils/sendResponse.js"

// handleGet() function
export async function handleGet(res){
    const data = await getData()
    const stringifyData = JSON.stringify(data)
    sendResponse(res, 200, 'application/json', stringifyData)
}

// handlePost() function
export async function handlePost(req, res) {
    try{
        const parsedBody = await parseJSONbody(req)
        await addNewData(parsedBody)
        sendResponse(res, 201, 'application/json', parsedBody)
    } catch(err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
    }
}