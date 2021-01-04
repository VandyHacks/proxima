import express, { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import User from '../sequelize/models/user.model';
import passport from 'passport';

const usersController = express.Router();

usersController.route('/')
    .get(async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    })
    .post(async (req, res) => {
        try {
            const body = req.body as User;

            // Encrypt password using bcrypt
            const hash = await bcrypt.hash(body.password, 10);

            const newUser = await User.create({
                username: body.username,
                password: hash
            });

            res.json(newUser);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

usersController.route('/:id')
    .get(async (req, res) => {
        try {
            const params = req.params as {
                id: string;
            };
            const id = Number(params.id);

            const user = await User.findOne({
                where: {
                    id
                }
            });

            res.json(user);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    })
    .patch(passport.authenticate('local') as RequestHandler, async (req, res) => {
        try {
            const params = req.params as {
                id: string;
            };
            const id = Number(params.id);

            const currentUser = await User.findOne({
                where: {
                    id
                }
            });

            const body = req.body as {
                username: string;
                password: string;
                newInfo: User;
            };
            const newInfo = body.newInfo;

            if (currentUser && (currentUser.username !== body.username) ) {
                return res.status(401).send('Unauthorized');
            }

            if (newInfo.password !== undefined) {
                // Encrypt password using bcrypt
                newInfo.password = await bcrypt.hash(newInfo.password, 10);
            }

            const result = await User.update(newInfo, {
                where: {
                    id
                },
                returning: true
            });

            if (result[0] > 0) {
                res.json(result[1][0]);
            } else {
                /* istanbul ignore next */
                res.status(400).json(result);
            }
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { usersController };