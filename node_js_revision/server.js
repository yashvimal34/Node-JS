import http from "node:http"
import {getDataFromDB} from "./db.js"
import sendJSONresponse from "./utility/sendJSONresponse.js"
import {getDataByPathParams} from "./utility/getDataByPathParams.js"
import { getDataByQueryParams } from "./utility/getDataByQueryParams.js"

const PORT = 8000

const server = http.createServer(async(req, res) => {
    const destinations = await getDataFromDB()
    
    // Query Parameters
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if(urlObj.pathname === "/api" && req.method === "GET"){
        let filteredDestinations = getDataByQueryParams(destinations, queryObj)
        console.log(queryObj)
        sendJSONresponse(res, 200, filteredDestinations)
    }
    else if(req.url.startsWith("/api/continent") && req.method === "GET"){
        const continent = req.url.split('/').pop()
        const filteredContinent = getDataByPathParams(destinations, "continent", continent)
        sendJSONresponse(res, 200, filteredContinent)
    }

    else if(req.url.startsWith("/api/country") && req.method === "GET"){
        const country = req.url.split('/').pop()
        console.log(country)
        const filteredCountry = getDataByPathParams(destinations, 'country', country)
        sendJSONresponse(res, 200, filteredCountry)
    }

    else{
        res.setHeader("Content-Type", "application/json")
        sendJSONresponse(res, 404, ({
            error: "Not Found", 
            message: "Route does not exists"
        }))
    }
})

server.listen(PORT, () => console.log("server started"))
