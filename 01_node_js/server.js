/* ------- This the first way to import module. For smaller applications --------- */
// import http from 'http'

/* ------- Second way to import module. For larger scalable applications. -------- */
import http from "node:http"; // This is good practices to prevent bug from code.
import { getDataFromDB } from "./database/db.js";
import { sendJSON } from "./utils/sendJSONdata.js";
import { filteringData } from "./utils/filterData.js";
import { getDataQueryParams } from "./utils/getDataByQueryParams.js";

const PORT = 8000;
const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const ObjUrl = new URL(req.url, `http://${req.headers.host}`)
  const queryObj = Object.fromEntries(ObjUrl.searchParams)



  if (ObjUrl.pathname === "/api" && req.method === "GET") {
    let filteredDestination = getDataQueryParams(destinations, queryObj)
    sendJSON(res, 200, filteredDestination);

  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop();
    const filterContinent = filteringData(destinations, 'continent', continent)
    sendJSON(res, 200, filterContinent);

  } else if(req.url.startsWith('/api/country') && req.method === 'GET') {
    const country = req.url.split('/').pop();
    const filterCountry = filteringData(destinations, 'country', country)
    sendJSON(res, 200, filterCountry)

  } else {
    sendJSON(res, 404, {
      error: "not found",
      message: "the route not found",
    });
  }

  // if(req.method === 'GET' && req.url === '/api'){
  //     res.end('Get req fetched and also GET req is also fetched')
  // }
  // res.write("This is my data \n")
  // res.write("This is my friend data")
  // res.end()
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

/* ---------------- This example explains how to work with query parameter ------------------ */

/* 
import http from "node:http"
const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryParams = Object.fromEntries(urlObj.searchParams)
  console.log(queryParams)
})
server.listen(8000, () => console.log('conncted')) 
*/

/* ---------------- This example explains how to work with query parameter ------------------ */