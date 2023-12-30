// require("dotenv").config();

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import config from "config";
import Logger from "../config/logger";
import cors from "cors";
import path from "path";
import {connect} from "../config/db";

//routes imports
import supplierRouter from "./routers/supplierRouter";
import productRouter from "./routers/productRouter";
import userRouter from "./routers/userRouter";
import employeeRouter from "./routers/employeeRouter";
import sellRouter from "./routers/sellRouter";
import categoryRouter from "./routers/categoryRouter";
import etlRouter from "./routers/etlRouter";


const environment = config.get<string>("env");
Logger.info("Server started on " + environment + " environment");

const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, "client")));

if(environment === "development"){
    app.use(cors());
}

app.use("/supplier", supplierRouter);

app.use("/product",  productRouter);

app.use("/user", userRouter);

app.use("/employee", employeeRouter);

app.use("/sale", sellRouter);

app.use("/category", categoryRouter);

app.use("/etl", etlRouter);



app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "client", "index.html"));
});

const PORT = config.get<string>("port");
app.listen(PORT, async () => {
    Logger.info(`Server is running on port ${PORT}`);
    await connect();
});
