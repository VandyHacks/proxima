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
    process.env.JWT_TOKEN_KEY,
    { expiresIn: '7d' }
  );

  const frontendURL = process.env.FRONTEND_URL;
  ctx.redirect(`${frontendURL}?accessToken=${token}`);
};
router.get('/auth/slack/callback', passport.authenticate('Slack'), generateJwt);

export default router.routes();