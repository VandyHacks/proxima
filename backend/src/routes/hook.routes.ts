import * as Router from 'koa-router';

import * as applicationController from '../controllers/applicationController';

const router = new Router({
  prefix: '/api/v1'
});

// Application submission TypeForm WebHook
router.post('/typeform/submit', applicationController.parseTypeFormWebHook);

// Populate existing responses to the TypeForm if application wasn't running
router.post(
  '/typeform/responses',
  applicationController.parseTypeFormResponses
);

export default router.routes();
