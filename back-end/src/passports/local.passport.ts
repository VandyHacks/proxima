import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../sequelize/models/user.model';

const localStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                username
            }
        });

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Verify password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }
    
        done(null, user);
    } catch (err) {
        /* istanbul ignore next */
        done(err);
    }
});

export { localStrategy };