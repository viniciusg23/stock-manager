import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function connect(){
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

export default connect;