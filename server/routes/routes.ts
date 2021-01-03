import { Router } from "../deps.ts";
import * as applicationController from "./controllers/applicationController.ts"
import * as notesController from "./controllers/notesController.ts"

const router = new Router();

/**
 * POST REQUESTS 
 */

// Application submission
router.post('/typeform/submit', applicationController.parseTypeForm);

// Update status
router.post('/application/status', applicationController.updateStatus);

// Add questions to interview question list
router.post('/interview/questions/add', notesController.questionCreate);

// Add interview notes to the application 
router.post('/interview/notes/add', notesController.addNotes);

/**
 * GET REQUESTS
 */
// Fetch all applications for the grid
router.get('/applications', applicationController.displayApplications);

// Fetch application responses for a specific applicant
router.get('/applications/responses', applicationController.getApplicationResponses);

// Fetch all interview notes for an applicant
router.get('/applications/notes', notesController.getNotes);

// Fetch all questions 
router.get('/interview/questions/list', notesController.getAllQuestions);

// Fetch questions for a specific applicant
router.get('/interview/questions', notesController.getQuestionsForApplicant);

export { router };