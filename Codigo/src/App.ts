require("dotenv").config();

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
import { authMiddleware } from "./middleware/authMiddleware";


const environment = config.get<string>("env")
Logger.info("Server started on " + environment + " environment");

const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, 'client')));
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

if(environment === "development"){
    app.use(cors());
}

app.use("/supplier", authMiddleware, supplierRouter);

app.use("/product", authMiddleware,  productRouter);

app.use("/user", userRouter);

app.use("/employee", authMiddleware, employeeRouter);

app.use("/sell", authMiddleware, sellRouter);



const PORT = config.get<string>("port");
app.listen(PORT, async () => {
    Logger.info(`Server is running on port ${PORT}`);
    await connect();
});
