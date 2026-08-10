// handle Get

import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handleGet(res) {
    try{
        const data = await getData()
        const strigifyData = JSON.stringify(data)
        sendResponse(res, 200, 'application/json', strigifyData)
    } catch(err) {
        console.log(err)
    }
}

// handle post

export async function handlePost(req, res) {
    // sendResponse(res, 200, 'text/plain', 'Post request received')
    console.log("post request received")
}