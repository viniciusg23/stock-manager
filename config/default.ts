import dotenv from "dotenv"
dotenv.config();

const PORT = 3000;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const env = process.env.ENVIROMENT ? process.env.ENVIROMENT.replace(/\s/g, "") : "development";

const jwt = process.env.JWT_SECRET;

const systemPassword = process.env.SYSTEM_CONTROL_PASSWORD || "default";

export default {
    port: PORT,
    dbUri: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.p6dcaiz.mongodb.net/${env}?retryWrites=true&w=majority`,
    env: env,
    jwt: jwt,
    systemPassword: systemPassword
};
