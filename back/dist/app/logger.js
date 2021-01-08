"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
exports.logger = bunyan.createLogger({
    name: process.env.npm_package_name,
    level: process.env.LOG_LEVEL || 'debug',
    serializers: bunyan.stdSerializers
});
//# sourceMappingURL=logger.js.map