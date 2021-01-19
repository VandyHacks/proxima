# Back-end for Proxima

This is the second version of back-end, written in Node. The first version was in [Deno](https://deno.land/), but due to issues with important Deno dependancies, we had to re-write the codebase in Node.

### Technologies:

1. Node
2. Koa
3. TypeORM
4. PostgreSQL
5. Docker

### Running:

Install and run (Docker)[https://docs.docker.com/get-docker/].

Start:
`docker-compose build` and `docker-compose up`

To clear up the database:
`docker-compose down`

### Seeding the database:

Once you run the application, the database is initially empty. Since the production database is populated through a TypeForm WebHook, one could emulate it (e.g. in Postman). Example of a WebHook Payload is in './examples/typeform_payload.json', which would be a body of a POST request to 'http://localhost:3000/api/v1/typeform/submit'.
