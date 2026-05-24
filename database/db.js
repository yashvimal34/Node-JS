// Accessing a database is an async process.
import { data } from "../data/data.js";

export async function getDataFromDB() {
    return data;
}