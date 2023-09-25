import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

export async function connect(){
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        Logger.info("db connected!");
    } catch (error) {
        Logger.error("db did not connect!");
        Logger.error(`${error}`);
        process.exit(0);
    }
}

export async function disconnect(){
    try {
        await mongoose.disconnect();
    } catch (error) {
        Logger.error("db did not connect!");
        Logger.error(`${error}`);
        process.exit(0);
    }
}
