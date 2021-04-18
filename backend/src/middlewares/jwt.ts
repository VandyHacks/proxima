import * as jwt from 'koa-jwt';

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set

const checkJwt = jwt({
  secret: process.env.JWT_TOKEN_KEY as string
});

export { checkJwt };
