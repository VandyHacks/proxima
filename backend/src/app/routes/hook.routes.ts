import * as Router from "koa-router";

import * as applicationController from "../controllers/applicationController";

const router = new Router({
  prefix: '/api/v1'
});

// Application submission
router.post("/typeform/submit", applicationController.parseTypeForm);

export default router.routes();
