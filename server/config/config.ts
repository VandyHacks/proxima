let config: {database: any, smtp: any, email: string} = {

  // Set up the database configuration
  database: {
    hostname: Deno.env.get("DB_HOSTNAME"),
    database: Deno.env.get("DB_NAME"),
    username: Deno.env.get("DB_USER"),
    password: Deno.env.get("DB_PASSWORD"),
    port: 5432
  },

  // Set up the email confiduration
  smtp: {
    hostname: Deno.env.get("SMTP_HOSTNAME"),
    port: parseInt(<string> Deno.env.get("SMTP_PORT"), 10),
    username: Deno.env.get("SMTP_USER"),
    password: Deno.env.get("SMTP_PASSWORD"),
  },
  email: Deno.env.get("EMAIL_ADDRESS") as string
}

export { config }; 