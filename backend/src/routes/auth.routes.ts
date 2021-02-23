import * as Router from 'koa-router';
import * as passport from 'koa-passport';

const router = new Router();

router.get('/auth/slack', async ctx => {
  return passport.authorize('Slack')(ctx);
});

const generateJwt = async ctx => {
  console.log(ctx.req.user);
  // generate jwt token here like in tutorial
  // redirect
  // set cookie
  ctx.redirect('/');
};

router.get('/auth/slack/callback', passport.authenticate('Slack'), generateJwt);

export default router;
