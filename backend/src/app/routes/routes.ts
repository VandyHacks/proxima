import * as Router from "koa-router";

import * as applicationController from "./controllers/applicationController";
import * as notesController from "./controllers/notesController";

const router = new Router();

/**
 * POST/PUT REQUESTS
 */

// Application submission
router.post("/typeform/submit", applicationController.parseTypeForm);

// Update status (PUT request)
router.put("/applications/:applicationId", applicationController.updateStatus);

// Add questions to interview question list
router.post("/questions", notesController.questionCreate);

// Add interview notes to the application
router.post("/applications/:applicationId/notes", notesController.addNotes);

// Add comments to the applicaiton
router.post(
  "/applications/:applicationId/comments",
  notesController.addComments
);

/**
 * GET REQUESTS
 */

// Fetch all applications for the grid
router.get("/applications", applicationController.displayApplications);

// Fetch application responses and notes for a specific applicant
router.get(
  "/applications/:applicationId",
  applicationController.getApplicantData
);

// Fetch all questions
router.get("/questions", notesController.getAllQuestions);

// Fetch questions for a specific applicant
router.get(
  "/applications/:applicationId/questions",
  notesController.getQuestionsForApplicant
);

export const routes = router.routes();
