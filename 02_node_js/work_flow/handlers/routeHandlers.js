import { sendResponse } from "../../utils/sendResponse.js";
import { getData } from "../utils/getData.js";
import { parseJSONbody } from '../utils/parseJSONBody.js';
import { addNewData } from '../../utils/addNewData.js';

// handel GET
export async function handleGet(res){
    const getAllData = await getData()
    const strigifyJSON = JSON.stringify(getAllData)
    sendResponse(res, 200, 'application/json', strigifyJSON)
}

export async function handlePost(req, res) {
    try{
        const parsedJSON = await parseJSONbody(req)
        await addNewData(parsedJSON)
        sendResponse(res, 200, 'application/json', parsedJSON)
    } catch(err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
    }
} 