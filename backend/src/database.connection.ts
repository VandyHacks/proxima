import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

// uses TYPEORM env variables to connect to database
const connection: Promise<Connection> = createConnection();

export default connection;
