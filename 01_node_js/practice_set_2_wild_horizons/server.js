import http from "node:http"
import { getDataFromDb } from "./database/db.js"
import { sendJSON } from "./utils/sendJSONrespons.js"
import { filterDataByName } from "./utils/filterDataByName.js"
import { filterWithQueryParams } from "./utils/filterWithQueryParams.js"

const PORT = 8000

const server = http.createServer( async(req, res) => {
    const destinations = await getDataFromDb()

    const objUrl = new URL(
  req.url,
  `http://${req.headers.host || `localhost:${PORT}`}`
)
    const objParams = Object.fromEntries(objUrl.searchParams)

    if(objUrl.pathname === '/api' && req.method === 'GET'){
        const filterQueryParams = filterWithQueryParams(destinations, objParams)
        sendJSON(res, 200, filterQueryParams)
    } else if(req.url.startsWith('/api/country') && req.method === 'GET'){
        const countryName = req.url.split('/').pop()
        const filterData = filterDataByName(destinations, 'country', countryName)
            sendJSON(res, 200, filterData)
        
    } else if(req.url.startsWith('/api/price') && req.method === 'GET'){
        const priceUrl = req.url.split('/').pop()
        const filterData = destinations.filter((price) => {
            return price.price === Number(priceUrl)
        })
            sendJSON(res, 200, filterData)
    }
})

server.listen(PORT, () => console.log('server started'))