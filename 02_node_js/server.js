import http from 'node:http'
import { baseDirectory } from './utils/serveStatic.js'

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    await baseDirectory(req, res, __dirname)
})

server.listen(PORT, () => console.log('server connected'))