import "reflect-metadata";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const connectionOpts: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [`${__dirname}/entities/*.ts`],
  // migrations: [`${__dirname}/migrations/*.ts`],
  synchronize: true,
  logging: false,
};

const connection: Promise<Connection> = createConnection(connectionOpts);

export default connection;