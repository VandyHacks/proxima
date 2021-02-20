import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';

// Routes
import applicationRoutes from './routes/application.routes';
import hookRoutes from './routes/hook.routes';
import questionRoutes from './routes/question.routes';

// Middleware
import * as errorHandlers from './middlewares/error';
// import { checkJwt } from './middlewares/jwt';
import authRoutes from './routes/auth.routes';
import * as passport from 'koa-passport';
import './auth';

const app: Koa = new Koa();

app.use(errorHandlers.genericError);
app.use(bodyParser());
app.use(
  cors({
    credentials: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger());

// Exposed for a TypeForm webhook
app.use(hookRoutes);

app.use(authRoutes.routes());

// Authenticate all non-webhook routes
// app.use(checkJwt);

app.use(applicationRoutes);
app.use(questionRoutes);

// Error logging.
app.on('error', err => {
  console.log(err);
});

export default app;
