import { dotenv } from "../deps.ts";
let config = {};

// Set the database configuration
if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
}
else{
  config.database = {
    hostname: dotenv.config().HOSTNAME,
    database: dotenv.config().DATABASENAME,
    user: dotenv.config().DBUSER,
    password: dotenv.config().DBPASSWORD,
    port: 5432
  };
}

export { config }; 