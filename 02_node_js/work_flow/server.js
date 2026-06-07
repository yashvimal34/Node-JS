import http from "node:http"
import { serverStatic } from "./utils/serveStatic.js"
import { getData } from "./utils/getData.js"
import { handleGet, handlePost } from "./handlers/routeHandlers.js"

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async(req, res) => {
    if(req.url === '/api'){
        if(req.method === 'GET'){
          return await handleGet(res)
        } else if(req.method === 'POST'){
            return handlePost(req, res)
        }
    } else if(!req.url.startsWith('/api')){
       return await serverStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => console.log("done"))