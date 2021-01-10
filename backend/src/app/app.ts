import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';
import * as passport from 'passport';

import applicationRoutes from './routes/application.routes';
import hookRoutes from './routes/hook.routes';
import questionRoutes from './routes/question.routes';
import authRoutes from './routes/auth.routes';
import './auth';

const app: Koa = new Koa();

app.use(passport.initialize());
app.use(passport.session());

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
app.use(cors());

app.use(logger());

app.use(authRoutes.routes());
app.use(applicationRoutes.routes());
app.use(questionRoutes.routes());
app.use(hookRoutes.routes());

// Application error logging.
app.on('error', (err, ctx) => {
  console.log(err);
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
   */
});

export default app;
