import * as Router from 'koa-router';
import * as passport from 'koa-passport';

import * as jwt from 'jsonwebtoken';

const router = new Router();

router.get('/auth/slack', async ctx => {
  return passport.authorize('Slack')(ctx);
});

const generateJwt = async ctx => {
  const token = jwt.sign(
    {
      data: ctx.req.user.id
    },
    process.env.JWT_TOKEN_KEY as string,
    { expiresIn: '7d' }
  );

  ctx.redirect(`/?accessToken=${token}`); // should redirect to frontend
};
router.get('/auth/slack/callback', passport.authenticate('Slack'), generateJwt);

export default router;
