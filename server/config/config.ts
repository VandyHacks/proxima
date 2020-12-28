let config: any = {};

// Set the database configuration
if (!Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {
    hostname: Deno.env.get("HOSTNAME"),
    database: Deno.env.get("DATABASENAME"),
    username: Deno.env.get("DBUSER"),
    password: Deno.env.get("DBPASSWORD"),
    port: 5432
  };
}

export { config }; 