import * as Router from "koa-router";

import * as applicationController from "../controllers/applicationController";
import * as notesController from "../controllers/notesController";

const router = new Router({
  prefix: '/api/v1/applications'
});

// Fetch all applications for the grid
router.get("/", applicationController.displayApplications);

// Fetch application responses and notes for a specific applicant
router.get(
  "/:applicationId",
  applicationController.getApplicantData
);

// Update status (PUT request)
router.put("/:applicationId", applicationController.updateStatus);

// Add interview notes to the application
router.post("/:applicationId/notes", notesController.addNotes);

// Add comments to the applicaiton
router.post(
  "/:applicationId/comments",
  notesController.addComments
);

// Fetch questions for a specific applicant
router.get(
  "/:applicationId/questions",
  notesController.getQuestionsForApplicant
);
export default router.routes();
