import * as passport from 'koa-passport';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SlackStrategy = require('passport-slack-oauth2').Strategy;

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;

const CALLBACK_URL = 'http://localhost:3000/auth/slack/callback';

const options = {
  clientID: SLACK_CLIENT_ID,
  clientSecret: SLACK_CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  skipUserProfile: false,
  scope: [
    'identity.basic',
    'identity.email',
    'identity.avatar',
    'identity.team'
  ]
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
  // return knex('users')
  //   .where({ id })
  //   .first()
  //   .then(user => {
  //     done(null, user);
  //   })
  //   .catch(err => {
  //     done(err, null);
  //   });
});

passport.use(
  new SlackStrategy(options, (accessToken, refreshToken, profile, done) => {
    // optionally persist user data into a database
    console.log(profile);
    done(null, profile);
  })
);
