import http from "node:http"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"

dotenv.config();

const PORT = process.env.PORT || 8001;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer((req, res) => {
      res.setHeader("Content-Type", "text/plain")
      res.statusCode = 200
      res.end("hello");
    });

    server.listen(PORT, () => console.log(`server started succesfully on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();