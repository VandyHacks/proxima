let config = {};

// Set the database configuration
if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
}
else{
  config.database = {
    hostname: "hostname-possibly-at-elephantsql.com",
    database: "database-name",
    user: "user-name-typically-same-as-database-name",
    password: "password",
    port: 5432
  };
}

export { config }; 