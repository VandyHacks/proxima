## Deno Back-end

List of tech used:

1. Oak
2. PostgreSQL
3. DenoDB

Run:
`deno run --allow-net --allow-env --allow-read app.ts`

Create `.env` in root folder, following this template:

```
DB_HOSTNAME = localhost
DB_NAME = postgres
DB_USER = postgres
DB_PASSWORD = somepass

SMTP_HOSTNAME = smtp.gmail.com
SMTP_PORT = 465
SMTP_USER = myname
SMTP_PASSWORD = mypassword
EMAIL_ADDRESS = info@vandyhacks.org
```

## Deno version

It is important to use Deno version before 1.6 because of this [issue](https://github.com/denodrivers/postgres/issues/188) in Postgres dependency.
