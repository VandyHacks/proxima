"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: Number.parseInt(process.env.POSTGRES_PORT || '5432', 10),
    define: {
        freezeTableName: true,
        timestamps: true,
    },
});
exports.sequelize = sequelize;
//# sourceMappingURL=database.js.map