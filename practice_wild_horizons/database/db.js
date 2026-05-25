// Accessing a database is an async process.
import { data } from "../data/data.js";

// Returns destination data like a database call would.
export async function getDataFromDb() {
    return data
}
