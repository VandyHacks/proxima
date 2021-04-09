import * as Koa from 'koa';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import jwt = require('jsonwebtoken');

/**
 * Return:
 */
const verifyUserToken = async ({ params, request, response }: Koa.Context) => {
  const token = request.headers['authorization'].split(" ")[1];

  const decoded = jwt.decode(token);
  if (!decoded) {
    response.status = 403;
    response.message = "Auth header can't be decoded";
  } else {
    const userId = decoded['data'];

    const userRepo: Repository<User> = getRepository(User);
    const user = await userRepo.findOne({
      select: ['id', 'name'],
      where: {id: userId}
    });
  
    if (user) response.body = user;
    else {
      response.status = 403;
      response.message = "No user with given ID in JW token";
    }  
  }
};

export {
  verifyUserToken
};
