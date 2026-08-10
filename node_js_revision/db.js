import {data} from "./data/data.js"

// Accessing database is an async process.

export async function getDataFromDB() {
    return data;
}