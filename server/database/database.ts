import { Client } from "../deps.ts";
import { config } from "../config/config.ts";

const getClient = () => {
  return new Client(config.database);
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

export class Url extends Model {
  static table = 'urls';
  static timestamps = true;
  static fields = {
    UrlId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    UrlIdentifier: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    UrlDestination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
}

const db = new Database('postgres', {
  host: 'localhost',
  username: 'postgres',
  password: 'password',
  database: 'url-shortener',
  port: 5433,
});

db.link([Url]);
db.sync();

await Url.all();
//await Url.create({ UrlIdentifier: 'test', UrlDestination: 'test'}); has the same error

export { executeQuery };