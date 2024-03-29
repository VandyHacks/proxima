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
import { checkJwt } from './middlewares/jwt';
import authRoutes from './routes/auth.routes';
import usersRoute from './routes/users.route';
import * as passport from 'koa-passport';
import './auth';
import * as dotenv from 'dotenv';

const app: Koa = new Koa();

dotenv.config();

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
app.use(usersRoute);
app.use(authRoutes);

// Authenticate all non-webhook routes
app.use(checkJwt);

app.use(applicationRoutes);
app.use(questionRoutes);

// Error logging.
app.on('error', err => {
  console.log(err);
});

export default app;
