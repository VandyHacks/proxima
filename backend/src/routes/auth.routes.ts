import * as Router from 'koa-router';
import * as passport from 'passport';

const router = new Router();

router.get('/auth/slack', async ctx => {
  return passport.authorize('Slack')(ctx);
});

router.get('/auth/slack/callback', async ctx => {
  return passport.authenticate('Slack', {
    successRedirect: '/app',
    failureRedirect: '/'
  })(ctx);
});
export default router;
