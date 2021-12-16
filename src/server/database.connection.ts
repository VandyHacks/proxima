import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';

const connection: Promise<Connection> = createConnection();

export default connection;
