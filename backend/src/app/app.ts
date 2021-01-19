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

const app: Koa = new Koa();

app.use(errorHandlers.genericError);
app.use(bodyParser());
app.use(cors());

app.use(logger());
app.use(checkJwt);

app.use(applicationRoutes);
app.use(questionRoutes);
app.use(hookRoutes);

// Error logging.
app.on('error', err => {
  console.log(err);
});

export default app;
