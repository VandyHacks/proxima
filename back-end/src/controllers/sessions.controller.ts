import express, { RequestHandler } from 'express';
import passport from 'passport';
const sessionsController = express.Router();

sessionsController.route('/')
    .post(passport.authenticate('local') as RequestHandler, (req, res) => {
        res.json(req.user);
    });

export { sessionsController };