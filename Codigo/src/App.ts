require("dotenv").config();

import express from "express";
import config from "config";
import Logger from "../config/logger";
import db from "../config/db";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello word");
});


const PORT = config.get<string>("port");
app.listen(PORT, async () => {
    Logger.info(`Server is running on port ${PORT}`);
    await db();
});
