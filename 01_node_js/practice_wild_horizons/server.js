import http from 'node:http'
import { getDataFromDb } from './database/db.js'
import { sendJSON } from './utils/sendJSONdata.js'
import { filteringData } from './utils/filterData.js'
import { filterQueryParams } from './utils/filterWithQueryParams.js'

// Port where the HTTP server will listen.
const PORT = 8000

const server = http.createServer(async (req, res) => {
    // Gets all destination data before handling the request.
    const destinations = await getDataFromDb()

    // Converts the request URL into a URL object so pathname and query params are easy to read.
    const ObjUrl = new URL(req.url, `http://${req.headers.host}`)

    // Converts query params like ?name=value into a normal JavaScript object.
    const queryParams = Object.fromEntries(ObjUrl.searchParams)

    // GET /api - returns all data, or filtered data when query params are provided.
    if(ObjUrl.pathname === '/api' && req.method === 'GET'){
        const filterQuery = filterQueryParams(destinations, queryParams)
        sendJSON(res, 200, filterQuery)

    // GET /api/name/:name - finds destinations matching the name in the URL.
    } else if(req.url.startsWith('/api/name') && req.method === 'GET') {

        const name = decodeURIComponent(req.url.split('/').pop())
        // we use this "decodeURIComponent" because if your url name has space in between sentence so it helps to decode those spaces and it runs without bug

        const filterData = filteringData(destinations, 'name', name)
        sendJSON(res, 200, filterData)

    // GET /api/country/:country - finds destinations matching the country in the URL.
    } else if(req.url.startsWith('/api/country') && req.method === 'GET'){

        const country = req.url.split('/').pop()
        const filterData = filteringData(destinations, 'country', country)
        sendJSON(res, 200, filterData)
        
    // Runs when no route above matches the request.
    } else {
        sendJSON(res, 404, {
            error: 'not found',
            message: 'The route is not found'
        })
    }
})

// Starts the server.
server.listen(PORT, () => console.log('server connected'))
