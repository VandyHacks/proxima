import * as Koa from "koa";
import * as HttpStatus from "http-status-codes";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";

import { routes } from "./routes/routes";

const app: Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status =
      error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
});

// Middleware
app.use(bodyParser());
app.use(cors());
app.use(routes);

// Application error logging.
app.on("error", console.error);

export default app;
