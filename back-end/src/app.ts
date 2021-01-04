import express, { RequestHandler } from 'express';
import session from 'express-session';
import ConnectSessionSequelize from 'connect-session-sequelize';
import { sequelize } from './sequelize/db';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import { localStrategy } from './passports/local.passport';
import User from './sequelize/models/user.model';
import { indexController } from './controllers/index.controller';
import { usersController } from './controllers/users.controller';
import { sessionsController } from './controllers/sessions.controller';

const app = express();

// CORS middleware
app.use(cors({
    origin: process.env.NODE_ENV !== 'production' ? true : false // reflects request origin if not production
}));

// Cookie middleware
app.use(cookieParser());

// Session middleware
const SequelizeStore = ConnectSessionSequelize<session.Store>(session.Store);
const storeInstance = new SequelizeStore({
    db: sequelize,
    table: 'Session'
});
app.use(session({
    secret: process.env.COOKIE_SECRET || 'keyboard cat',
    store: storeInstance,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));
// Parse application/json
app.use(bodyParser.json({
    limit: '50mb'
}));

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session() as RequestHandler);
passport.serializeUser((user: User, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({
            where: {
                id
            }
        });
        if (user) {
            done(null, user);
        } else {
            /* istanbul ignore next */
            throw new Error('No user found');
        }
    } catch (err) {
        /* istanbul ignore next */
        done(err);
    }
});
passport.use(localStrategy);

// Routes and Controllers
app.use('/', indexController);
app.use('/sessions', sessionsController);
app.use('/users', usersController);

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        // tslint:disable-next-line no-console
        console.log(`Listening on port ${port}`);
    });
}

export { app };