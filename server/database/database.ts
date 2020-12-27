import { Database } from "../deps.ts";
import { config } from "../config/config.ts";

const getClient = () => {
  return new Database(config.database);
}

const executeQuery = async(query, ...args) => {
  const client = getClient();
  try {
    await client.connect();
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

export { executeQuery };