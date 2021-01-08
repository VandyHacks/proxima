"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koaBody = require("koa-body");
const cors = require("@koa/cors");
const serve = require("koa-static");
const koaBunyanLogger = require("koa-bunyan-logger");
const koaSwagger = require('koa2-swagger-ui');
const koaValidator = require('koa-async-validator');
const routes_1 = require("./routes/routes");
const logger_1 = require("./logger");
const dotenv = require("dotenv");
dotenv.config();
// TypeOrm imports
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// Server used in
let server;
exports.server = server;
// Database connection, using TypeOrm
typeorm_1.createConnection()
    .then(async (connection) => {
    const app = new Koa();
    app.use(koaBody());
    app.use(koaValidator());
    app.use(cors());
    app.use(koaBunyanLogger(logger_1.logger));
    app.use(koaBunyanLogger.requestLogger());
    app.use(koaBunyanLogger.timeContext());
    app.use(routes_1.routes);
    app.use(serve('public'));
    app.use(koaSwagger({
        routePrefix: '/swagger',
        swaggerOptions: {
            url: '/swagger.yml',
        },
    }));
    const port = parseInt(process.env.NODE_PORT, 10) || 3000;
    exports.server = server = app.listen(port);
    console.log(`Server running on port ${port}`);
})
    .catch((error) => console.log(error));
//# sourceMappingURL=app.js.map