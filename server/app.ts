import { Application } from "./deps.ts";
import { router } from "./routes/routes.ts";
import db from "./database/database.ts";

import * as basicMiddleware from './middlewares/basicMiddleware.ts';

const app = new Application();

app.use(basicMiddleware.errorMiddleware);
app.use(basicMiddleware.requestTimingMiddleware);

app.use(router.routes());


await db.sync();

if (!Deno.env.get('TEST_ENVIRONMENT')) {
    app.listen({ port: 7777 });
}
  
export default app;