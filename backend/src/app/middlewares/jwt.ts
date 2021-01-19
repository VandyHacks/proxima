import * as jwt from 'koa-jwt';
import * as jwksRsa from 'jwks-rsa';

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-56ziprzw.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://proxima-auth/api',
  issuer: `https://dev-56ziprzw.us.auth0.com/`,
  algorithms: ['RS256']
});

export { checkJwt };
