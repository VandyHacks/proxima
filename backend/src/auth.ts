import * as passport from 'koa-passport';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SlackStrategy = require('passport-slack-oauth2').Strategy;

import { getRepository, Repository } from 'typeorm';
import { User } from './entity/User';
import * as dotenv from 'dotenv';

dotenv.config();

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;

const CALLBACK_URL = '/auth/slack/callback';

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
});

passport.use(
  new SlackStrategy(
    options,
    async (accessToken, refreshToken, profile, done) => {
      const userRepo: Repository<User> = getRepository(User);
      const existingUser = await userRepo.findOne({
        email: profile.user.email
      });

      if (!existingUser) {
        if (profile.team.domain === 'vandyhacks') {
          const user: User = userRepo.create({
            id: profile.user.id,
            name: profile.user.name,
            email: profile.user.email,
            displayName: profile.displayName,
            avatar: profile.user.image_24
          });

          await userRepo.save(user);
          done(null, user);
        } else {
          done(null, null);
        }
      }
      done(null, existingUser); // will go back to route
    }
  )
);
