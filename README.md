# Proxima 🚀 🌌

Proxima is an application that makes viewing, interviewing, and deliberating potential candidates easier. 

### Use case
We, at VandyHacks, use Proxima to centralize board application materials. The goal for us was to make the board recruitment process easier and more pleasant. Proxima receives applications from the [TypeForm webhook](https://developer.typeform.com/webhooks/), which we configured to have certain fields (names for application inputs) in the [payload](https://github.com/VandyHacks/proxima/blob/09e49829175548eaf7f1fef8bef2f0d87851b066/backend/src/app/controllers/applicationController.ts#L94).


## Back-end

This is the second version of back-end, written in Node. The first version was in [Deno](https://deno.land/), but due to issues with important Deno dependancies, we had to re-write the codebase in Node. Deno version is still available in [`deno` branch](https://github.com/VandyHacks/proxima/tree/deno).

### Technologies:

1. Node
2. Koa
3. TypeORM
4. PostgreSQL
5. Docker

### Running:

Install and run [Docker](https://docs.docker.com/get-docker/).

Start:
`docker-compose build` and `docker-compose up`

To clear up the database:
`docker-compose down`

### Seeding the database:

Once you run the application, the database is initially empty. Since the production database is populated through a TypeForm WebHook, one could emulate it (e.g. in Postman). Example of a WebHook Payload is in './backend/examples/typeform_payload.json', which would be a body of a POST request to `http://localhost:3000/api/v1/typeform/submit`.

## Front-end
### Technologies:
1. Svelte (with TypeScript)
2. [CarbonUI](https://github.com/IBM/carbon-components-svelte) ([docs](https://carbon-svelte.vercel.app/))

Running in the development environment:
`npm run dev`
