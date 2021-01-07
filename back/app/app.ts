import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as serve from 'koa-static';
import * as koaBunyanLogger from 'koa-bunyan-logger';

const koaSwagger = require('koa2-swagger-ui');
const koaValidator = require('koa-async-validator');

import { routes } from './routes/routes';
import { logger } from './logger';
import * as dotenv from 'dotenv';
dotenv.config();

// Database connection, using TypeOrm

const app = new Koa();

app.use(bodyparser());
app.use(koaValidator());
app.use(cors());
app.use(koaBunyanLogger(logger));
app.use(koaBunyanLogger.requestLogger());
app.use(koaBunyanLogger.timeContext());
app.use(routes);
app.use(serve('public'));
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/swagger.yml',
    },
  })
);

const port = parseInt(process.env.NODE_PORT, 10) || 3000;

export const server = app.listen(port);
console.log(`Server running on port ${port}`);
