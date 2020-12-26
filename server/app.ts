import { Application } from "./deps.ts";
import { router } from "./routes/routes.ts";
import * as basicMiddleware from './middlewares/basicMiddleware.ts';

const app = new Application();

app.use(basicMiddleware.errorMiddleware);
app.use(basicMiddleware.requestTimingMiddleware);

app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
    app.listen({ port: 7777 });
}
  
export default app;