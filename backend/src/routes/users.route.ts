import * as Router from 'koa-router';

import * as usersController from '../controllers/usersController';

const router = new Router({
  prefix: '/api/v1/users'
});

router.get('/', usersController.verifyUserToken);

export default router.routes();
