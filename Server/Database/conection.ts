import postgres from "postgres";
import config from "../drizzle.config";

const connectionString = `postgres://${config.dbCredentials.user}:${config.dbCredentials.password}@${config.dbCredentials.host}/${config.dbCredentials.database}`;

const connection = postgres(connectionString);

export default connection;
