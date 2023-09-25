require("dotenv").config();

import express from "express";
import config from "config";
import Logger from "../config/logger";
import cors from "cors";
import {connect} from "../config/db";

//routes imports
import supplierRouter from "./routers/supplierRouter";


const environment = config.get<string>("env")
Logger.info("Server started on " + environment + " environment");

const app = express();
app.use(express.json());

if(environment === "development"){
    app.use(cors());
}


app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/supplier", supplierRouter);




const PORT = config.get<string>("port");
app.listen(PORT, async () => {
    Logger.info(`Server is running on port ${PORT}`);
    await connect();
});
