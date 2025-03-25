import express from "express";
import { fetchAndSaveData } from "./logic.js";

const app = express();
const PORT = 5000;

app.get('/fetch-tasks', async (req, res) => {
    await fetchAndSaveData();
    res.json({message: "Tasks successfully stored in json file!"})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
})