let config: {database?: any, smtp?: any} = {};

// Set the database configuration
if (!Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {
    hostname: Deno.env.get("DB_HOSTNAME"),
    database: Deno.env.get("DB_NAME"),
    username: Deno.env.get("DB_USER"),
    password: Deno.env.get("DB_PASSWORD"),
    port: 5432
  };

  config.smtp = {
    hostname: Deno.env.get("SMTP_HOSTNAME"),
    port: Deno.env.get("SMTP_PORT"),
    username: Deno.env.get("SMTP_USER"),
    password: Deno.env.get("SMTP_PASSWORD"),
  };

  config.smtp = Deno.env.get("EMAIL_ADDRESS")
}

export { config }; 