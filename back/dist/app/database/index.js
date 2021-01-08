"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
typeorm_1.createConnection()
    .then(async (connection) => {
    console.log('Inserting a new user into the database...');
    const user = new User_1.User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await connection.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);
    console.log('Loading users from the database...');
    const users = await connection.manager.find(User_1.User);
    console.log('Loaded users: ', users);
    console.log('Here you can setup and run express/koa/any other framework.');
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map