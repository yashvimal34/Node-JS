import http from 'node:http'
import { baseDir } from './utils/serveStatic.js'

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async(req, res) => {
    await baseDir(req, res, __dirname)
})

server.listen(PORT, () => console.log('server connected'))