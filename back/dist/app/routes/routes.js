"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
/**
 * Base route, return a 401
 */
router.get('/', async (ctx) => (ctx.status = 401));
/**
 * Basic healthcheck
 */
router.get('/healthcheck', async (ctx) => (ctx.body = 'OK'));
exports.routes = router.routes();
//# sourceMappingURL=routes.js.map