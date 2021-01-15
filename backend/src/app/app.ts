import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';
import * as dotenv from 'dotenv';

import applicationRoutes from './routes/application.routes';
import hookRoutes from './routes/hook.routes';
import questionRoutes from './routes/question.routes';

dotenv.config();

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
    ctx.app.emit('error', error, ctx);
  }
});

// Middleware
app.use(bodyParser());
app.use(
  cors({
    credentials: true
  })
);

app.use(logger());

app.use(applicationRoutes);
app.use(questionRoutes);
app.use(hookRoutes);

// Application error logging.
app.on('error', err => {
  console.log(err);
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
   */
});

export default app;
