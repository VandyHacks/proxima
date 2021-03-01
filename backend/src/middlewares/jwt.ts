import * as jwt from 'koa-jwt';
const checkJwt = jwt({
  secret: process.env.JWT_TOKEN_KEY as string
});

export { checkJwt };
