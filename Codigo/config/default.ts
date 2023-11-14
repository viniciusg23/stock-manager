require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const env = process.env.ENV
  ? process.env.ENV.replace(/\s/g, "")
  : "development";
const jwt = process.env.JWT_SECRET;

export default {
  port: 3000,
  dbUri: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.p6dcaiz.mongodb.net/${env}?retryWrites=true&w=majority`,
  env: env,
  jwt: jwt,
};
